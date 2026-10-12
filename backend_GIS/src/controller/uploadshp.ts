import { Request, Response } from "express";
import { open } from "shapefile";
import { AppDataSource } from "../data-resource";
import { BatasKelurahan } from "../entity/entities/BatasKelurahan";
import { BatasKecamatan } from "../entity/entities/BatasKecamatan";
import { BatasPersil } from "../entity/entities/BatasPersil";
import { BatasZnt } from "../entity/entities/BatasZnt";
import { BatasBlok } from "../entity/entities/BatasBlok";
import { ShapefileService } from "../services/ShapefileService";
import { GeometryService } from "../services/GeometryService";
import { ColorInterpolationService } from "../services/ColorInterpolationService";

export const PostShpKelurahan = async (req: Request, res: Response) => {
  try {
    const { kecamatan, jenis } = req.body;

    // Validate inputs
    if (typeof kecamatan !== "string" || !kecamatan.trim()) {
      return res.status(400).json(ShapefileService.createErrorResponse("Parameter 'kecamatan' tidak boleh kosong", 400));
    }
    if (typeof jenis !== "string" || !jenis.trim()) {
      return res.status(400).json(ShapefileService.createErrorResponse("Parameter 'jenis' tidak boleh kosong", 400));
    }

    // Basic filename sanitization to avoid invalid paths
    const safeKecamatan = kecamatan.trim();
    const safeJenis = jenis.trim();
    if (!GeometryService.isValidFilename(safeKecamatan) || !GeometryService.isValidFilename(safeJenis)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Format nama file tidak valid", 400));
    }

    // Use service layer for path resolution
    const resolution = ShapefileService.resolveShapefilePath({
      baseDir: ShapefileService.getShapefileDirectory("kelurahan"),
      kecamatan: safeKecamatan,
      jenis: safeJenis,
    });

    if (!resolution.found || !resolution.filePath) {
      return res.status(404).json({
        code: 404,
        message: "File SHP tidak ditemukan",
        detail: {
          tried: resolution.triedPaths,
        },
      });
    }

    const source = await open(resolution.filePath);
    const kecamatanNew = GeometryService.extractLocationCode(String(kecamatan));

    const kelurahanRepo = AppDataSource.getRepository(BatasKelurahan);

    // pastikan KD_PROV dan KD_KAB sesuai dengan project yang dijalankan
    const refData: Record<string, string> = {
      KD_PROV: "64",
      KD_KAB: "07",
      KD_KEC: kecamatanNew,
    };

    const geojsonFeatures: any[] = [];

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        if (!properties) {
          return res.status(400).json(ShapefileService.createErrorResponse("Data properties tidak ditemukan dalam file SHP", 400));
        }

        const requiredFields = [
          { key: "KD_PROV", label: "Kode Provinsi" },
          { key: "KD_KAB", label: "Kode Kabupaten" },
          { key: "KD_KEC", label: "Kode Kecamatan" },
          { key: "KD_KEL", label: "Kode Kelurahan" },
          { key: "NM_KEL", label: "Nama Kelurahan" },
        ];

        // Use service layer for field validation
        const fieldValidation = GeometryService.validateRequiredFields(properties, requiredFields);
        if (!fieldValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${fieldValidation.missingLabel} tidak boleh kosong`, 400));
        }

        // Use service layer for property value validation
        const valueValidation = GeometryService.validatePropertyValues(properties, refData, ["KD_PROV", "KD_KAB", "KD_KEC"]);
        if (!valueValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${valueValidation.invalidField} di poligon tidak sesuai`, 400));
        }

        // Use service layer for geometry conversion
        let convertedCoordinates;
        try {
          convertedCoordinates = GeometryService.convertGeometry(geometry.type as any, (geometry as any).coordinates);
        } catch (error) {
          ShapefileService.logWarning(`Geometry type ${geometry.type} is not supported`);
          continue;
        }

        if (!ShapefileService.hasValidCoordinates(convertedCoordinates)) {
          ShapefileService.logWarning(`Geometri tidak valid untuk ${properties?.NM_KEL}`);
          continue;
        }

        const geoJsonData = GeometryService.createGeoJSON(geometry.type as any, convertedCoordinates, false);

        geojsonFeatures.push({
          type: "Feature",
          properties: {
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            KD_KEL: properties?.KD_KEL,
            NM_KEL: properties?.NM_KEL,
          },
          geometry: geoJsonData,
        });
      }
    } while (!result.done);

    // Use service layer to check if no valid features
    if (ShapefileService.hasNoValidFeatures(geojsonFeatures)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Tidak ada data valid yang bisa disimpan", 400));
    }

    // Setelah validasi selesai, hapus data lama untuk seluruh kelurahan di kecamatan ini
    const existingData = await kelurahanRepo.find({
      where: { KD_KEC: kecamatanNew },
    });

    if (existingData.length > 0) {
      ShapefileService.logProgress(`Deleting existing records for Kecamatan: ${kecamatanNew}`);
      await kelurahanRepo.delete({ KD_KEC: kecamatanNew });
    }

    // Simpan data yang sudah valid ke dalam database
    for (const feature of geojsonFeatures) {
      const { properties, geometry } = feature;

      await kelurahanRepo
        .createQueryBuilder()
        .insert()
        .into(BatasKelurahan)
        .values({
          KD_PROV: properties.KD_PROV,
          KD_KAB: properties.KD_KAB,
          KD_KEC: properties.KD_KEC,
          KD_KEL: properties.KD_KEL,
          NM_KEL: properties.NM_KEL,
        })
        .execute();

      await kelurahanRepo
        .createQueryBuilder()
        .update(BatasKelurahan)
        .set({
          geom: () => `ST_GeomFromGeoJSON('${JSON.stringify(geometry)}')`,
        })
        .where("KD_KEC = :KD_KEC", { KD_KEC: properties.KD_KEC })
        .andWhere("KD_KEL = :KD_KEL", { KD_KEL: properties.KD_KEL })
        .execute();
    }

    return res.status(200).json(ShapefileService.createSuccessResponse("File SHP berhasil dikonversi dan disimpan ke database"));
  } catch (error) {
    ShapefileService.logWarning("Error membaca file SHP:", error);
    return res.status(500).json(ShapefileService.createErrorResponse("Internal server error", 500));
  }
};

export const PostShpPersil = async (req: Request, res: Response) => {
  try {
    const { kecamatan, kelurahan, jenis } = req.body;

    // Use service layer for path resolution
    const resolution = ShapefileService.resolveShapefilePath({
      baseDir: ShapefileService.getShapefileDirectory("persil"),
      kecamatan,
      kelurahan: kelurahan || "XX",
      jenis,
    });

    if (!resolution.found || !resolution.filePath) {
      return res.status(404).json(ShapefileService.createErrorResponse("File SHP tidak ditemukan", 404));
    }

    const source = await open(resolution.filePath);
    const persilRepo = AppDataSource.getRepository(BatasPersil);

    const kecamatanNew = GeometryService.extractLocationCode(kecamatan);
    const kelurahanNew = GeometryService.extractLocationCode(kelurahan);

    // pastikan KD_PROV dan KD_KAB sesuai dengan project yang dijalankan
    const refData: Record<string, string> = {
      KD_PROV: "64",
      KD_KAB: "07",
      KD_KEC: kecamatanNew,
      KD_KEL: kelurahanNew,
    };

    const geojsonFeatures: any[] = [];
    const batchInsertData: any[] = [];
    const batchUpdateData: { id?: number; geoJsonData: string }[] = [];
    const uniqueSet = new Set<string>();

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        if (!properties) {
          return res.status(400).json(ShapefileService.createErrorResponse("Data properties tidak ditemukan dalam file SHP", 400));
        }

        // Use service layer for required fields validation
        const requiredFields = ["KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL", "KD_BLOK", "KD_JNS_OP"];
        if (!ShapefileService.validateRequiredFields(properties, requiredFields)) {
          ShapefileService.logWarning(`Skipping record due to missing required fields`);
          continue;
        }

        // Use service layer for property value validation
        const valueValidation = ShapefileService.validateAgainstReference(properties, refData, ["KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL"]);
        if (!valueValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${valueValidation.invalidField} di poligon tidak sesuai dengan input yaitu ${valueValidation.expected} dan ${valueValidation.actual}`, 400));
        }

        // Use service layer for duplicate detection
        const { KD_KEL, KD_BLOK, NO_URUT } = properties;
        if (NO_URUT !== null) {
          const uniqueKey = ShapefileService.generateDuplicateKey([KD_KEL, KD_BLOK, NO_URUT]);

          if (ShapefileService.isDuplicate(uniqueSet, uniqueKey)) {
            ShapefileService.logWarning(`Duplicate record found, skipping: KD_KEL ${KD_KEL}, KD_BLOK ${KD_BLOK}, NO_URUT ${NO_URUT}`);
            continue;
          }

          ShapefileService.addToUniqueSet(uniqueSet, uniqueKey);
        }

        // Use service layer for geometry conversion
        let convertedCoordinates;
        try {
          convertedCoordinates = GeometryService.convertGeometry(geometry.type as any, (geometry as any).coordinates);
        } catch (error) {
          ShapefileService.logWarning(`Geometry type ${geometry.type} is not supported`);
          continue;
        }

        if (!ShapefileService.hasValidCoordinates(convertedCoordinates)) {
          ShapefileService.logWarning(`Geometri tidak valid untuk ${properties?.NM_KEL}`);
          continue;
        }

        // Create GeoJSON with MultiPolygon conversion for Polygon types
        const geoJsonData = GeometryService.createGeoJSON(
          geometry.type as any,
          convertedCoordinates,
          true // Force MultiPolygon conversion for Polygon
        );

        geojsonFeatures.push({ properties, geometry: geoJsonData });
        batchInsertData.push({ ...properties, FOTO_PERSIL: null });
        batchUpdateData.push({ geoJsonData: JSON.stringify(geoJsonData) });
      }
    } while (!result.done);

    // Use service layer to check if no valid features
    if (ShapefileService.hasNoValidFeatures(geojsonFeatures)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Tidak ada data valid yang bisa disimpan", 400));
    }

    const existingData = await persilRepo.find({
      where: { KD_KEC: kecamatanNew, KD_KEL: kelurahanNew },
    });

    if (existingData.length > 0) {
      await persilRepo.delete({ KD_KEC: kecamatanNew, KD_KEL: kelurahanNew });
    }

    // Use service layer for batch creation
    const insertedIds: number[] = [];
    const insertBatches = ShapefileService.createBatches(batchInsertData);

    for (const batch of insertBatches) {
      const insertResult = await persilRepo.createQueryBuilder().insert().into(BatasPersil).values(batch).returning("id").execute();
      insertResult.identifiers.forEach((identifier) => insertedIds.push(identifier.id));
    }

    batchUpdateData.forEach((update, index) => {
      update.id = insertedIds[index];
    });

    // Use service layer for batch geometry updates
    const updateBatches = ShapefileService.createBatches(batchUpdateData);

    for (const batch of updateBatches) {
      const { sql, parameters } = ShapefileService.createBatchGeometryUpdateSQL(batch, true);
      await persilRepo.manager.query(sql, parameters);
    }

    return res.status(200).json(ShapefileService.createSuccessResponse("File SHP berhasil dikonversi dan disimpan ke database"));
  } catch (error) {
    ShapefileService.logWarning("Error membaca file SHP:", error);
    return res.status(500).json(ShapefileService.createErrorResponse("Internal server error", 500));
  }
};

export const PostShpZNT = async (req: Request, res: Response) => {
  try {
    const { kecamatan, kelurahan, jenis } = req.body;

    // Use service layer for path resolution
    const resolution = ShapefileService.resolveShapefilePath({
      baseDir: ShapefileService.getShapefileDirectory("znt"),
      kecamatan,
      kelurahan: kelurahan || "XX",
      jenis,
    });

    if (!resolution.found || !resolution.filePath) {
      return res.status(404).json(ShapefileService.createErrorResponse("File SHP tidak ditemukan", 404));
    }

    const source = await open(resolution.filePath);
    const kecamatanNew = GeometryService.extractLocationCode(kecamatan);
    const kelurahanNew = GeometryService.extractLocationCode(kelurahan);

    const zntRepo = AppDataSource.getRepository(BatasZnt);

    // pastikan KD_PROV dan KD_KAB sesuai dengan project yang dijalankan
    const refData: Record<string, string> = {
      KD_PROV: "64",
      KD_KAB: "07",
      KD_KEC: kecamatanNew,
      KD_KEL: kelurahanNew,
    };

    const geojsonFeatures: any[] = [];
    let result;

    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        if (!properties) {
          return res.status(400).json(ShapefileService.createErrorResponse("Data properties tidak ditemukan dalam file SHP", 400));
        }

        // Use service layer for required fields validation
        const requiredFields = ["KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL", "KD_ZNT", "TAHUN", "NIR_EKS", "NIR_ANAL", "KLS_EKS", "KLS_ANAL", "LABEL_EKS", "LABEL_ANAL"];

        if (!ShapefileService.validateRequiredFields(properties, requiredFields)) {
          return res.status(400).json(ShapefileService.createErrorResponse("Field wajib tidak boleh kosong", 400));
        }

        // Use service layer for property value validation
        const valueValidation = ShapefileService.validateAgainstReference(properties, refData, ["KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL"]);
        if (!valueValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${valueValidation.invalidField} di poligon tidak sesuai`, 400));
        }

        // Use service layer for geometry conversion
        let convertedCoordinates;
        try {
          convertedCoordinates = GeometryService.convertGeometry(geometry.type as any, (geometry as any).coordinates);
        } catch (error) {
          ShapefileService.logWarning(`Geometry type ${geometry.type} is not supported`);
          continue;
        }

        if (!ShapefileService.hasValidCoordinates(convertedCoordinates)) {
          ShapefileService.logWarning(`Geometri tidak valid untuk ${properties?.KD_ZNT}`);
          continue;
        }

        // Create GeoJSON with MultiPolygon conversion for Polygon types
        const geoJsonData = GeometryService.createGeoJSON(
          geometry.type as any,
          convertedCoordinates,
          true // Force MultiPolygon conversion for Polygon
        );

        geojsonFeatures.push({
          type: "Feature",
          properties,
          geometry: geoJsonData,
        });
      }
    } while (!result.done);

    // Use service layer to check if no valid features
    if (ShapefileService.hasNoValidFeatures(geojsonFeatures)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Tidak ada data valid yang bisa disimpan", 400));
    }

    // hapus data lama
    await zntRepo.delete({ KD_KEC: kecamatanNew, KD_KEL: kelurahanNew });

    // insert baru
    for (const feature of geojsonFeatures) {
      const { properties, geometry } = feature;

      await zntRepo
        .createQueryBuilder()
        .insert()
        .into(BatasZnt)
        .values({
          ...properties,
        })
        .execute();

      await zntRepo
        .createQueryBuilder()
        .update(BatasZnt)
        .set({
          geom: () => `ST_Multi(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))`,
        })
        .where("KD_KEC = :KD_KEC", { KD_KEC: properties.KD_KEC })
        .andWhere("KD_KEL = :KD_KEL", { KD_KEL: properties.KD_KEL })
        .andWhere("KD_ZNT = :KD_ZNT", { KD_ZNT: properties.KD_ZNT })
        .andWhere("TAHUN = :TAHUN", { TAHUN: properties.TAHUN })
        .execute();
    }

    // === UPDATE WARNA using ColorInterpolationService ===
    const dataKel = await zntRepo.find({
      where: { KD_KEC: kecamatanNew, KD_KEL: kelurahanNew },
      order: { NIR_ANAL: "ASC" },
    });

    if (dataKel.length > 0) {
      const nirValues = ColorInterpolationService.parseNumericValues(dataKel.map((row) => String(row.NIR_ANAL)));
      const { min: minVal, max: maxVal } = ColorInterpolationService.findMinMax(nirValues);

      for (const row of dataKel) {
        const color = ColorInterpolationService.interpolateColor(row.NIR_ANAL, minVal, maxVal);

        await zntRepo
          .createQueryBuilder()
          .update(BatasZnt)
          .set({ WARNA_ANAL: color })
          .where("KD_KEC = :KD_KEC", { KD_KEC: row.KD_KEC })
          .andWhere("KD_KEL = :KD_KEL", { KD_KEL: row.KD_KEL })
          .andWhere("KD_ZNT = :KD_ZNT", { KD_ZNT: row.KD_ZNT })
          .andWhere("TAHUN = :TAHUN", { TAHUN: row.TAHUN })
          .execute();
      }
    }

    return res.status(200).json(ShapefileService.createSuccessResponse("File SHP berhasil dikonversi, disimpan, dan warna ditambahkan"));
  } catch (error) {
    ShapefileService.logWarning("Error membaca file SHP:", error);
    return res.status(500).json(ShapefileService.createErrorResponse("Internal server error", 500));
  }
};

export const PostShpBlok = async (req: Request, res: Response) => {
  try {
    const { kecamatan, kelurahan, jenis } = req.body;

    // Use service layer for path resolution
    const resolution = ShapefileService.resolveShapefilePath({
      baseDir: ShapefileService.getShapefileDirectory("blok"),
      kecamatan,
      kelurahan: kelurahan || "XX",
      jenis,
    });

    if (!resolution.found || !resolution.filePath) {
      return res.status(404).json(ShapefileService.createErrorResponse("File SHP tidak ditemukan", 404));
    }

    const source = await open(resolution.filePath);
    const kecamatanNew = GeometryService.extractLocationCode(kecamatan);
    const kelurahanNew = GeometryService.extractLocationCode(kelurahan);

    const blokRepo = AppDataSource.getRepository(BatasBlok);

    // pastikan KD_PROV dan KD_KAB sesuai dengan project yang dijalankan
    const refData: Record<string, string> = {
      KD_PROV: "64",
      KD_KAB: "07",
      KD_KEC: kecamatanNew,
      KD_KEL: kelurahanNew,
    };

    const geojsonFeatures: any[] = [];

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        if (!properties) {
          return res.status(400).json(ShapefileService.createErrorResponse("Data properties tidak ditemukan dalam file SHP", 400));
        }

        const requiredFields = [
          { key: "KD_PROV", label: "Kode Provinsi" },
          { key: "KD_KAB", label: "Kode Kabupaten" },
          { key: "KD_KEC", label: "Kode Kecamatan" },
          { key: "KD_KEL", label: "Kode Kelurahan" },
          { key: "KD_BLOK", label: "Kode Blok" },
        ];

        // Use service layer for field validation
        const fieldValidation = GeometryService.validateRequiredFields(properties, requiredFields);
        if (!fieldValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${fieldValidation.missingLabel} tidak boleh kosong`, 400));
        }

        // Use service layer for property value validation
        const valueValidation = GeometryService.validatePropertyValues(properties, refData, ["KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL"]);
        if (!valueValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${valueValidation.invalidField} di poligon tidak sesuai`, 400));
        }

        // Use service layer for geometry conversion
        let convertedCoordinates;
        try {
          convertedCoordinates = GeometryService.convertGeometry(geometry.type as any, (geometry as any).coordinates);
        } catch (error) {
          ShapefileService.logWarning(`Geometry type ${geometry.type} is not supported`);
          continue;
        }

        if (!ShapefileService.hasValidCoordinates(convertedCoordinates)) {
          ShapefileService.logWarning(`Geometri tidak valid untuk kelurahan ${properties?.KD_KEL} & blok ${properties?.KD_BLOK}`);
          continue;
        }

        const geoJsonData = GeometryService.createGeoJSON(geometry.type as any, convertedCoordinates, false);

        geojsonFeatures.push({
          type: "Feature",
          properties: {
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            KD_KEL: properties?.KD_KEL,
            KD_BLOK: properties?.KD_BLOK,
          },
          geometry: geoJsonData,
        });
      }
    } while (!result.done);

    // Use service layer to check if no valid features
    if (ShapefileService.hasNoValidFeatures(geojsonFeatures)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Tidak ada data valid yang bisa disimpan", 400));
    }

    // Setelah validasi selesai, hapus data lama
    const existingData = await blokRepo.find({
      where: { KD_KEC: kecamatanNew, KD_KEL: kelurahanNew },
    });

    if (existingData.length > 0) {
      ShapefileService.logProgress(`Deleting existing records for Kecamatan: ${kecamatanNew} and Kelurahan: ${kelurahanNew}`);
      await blokRepo.delete({ KD_KEC: kecamatanNew, KD_KEL: kelurahanNew });
    }

    // Simpan data yang sudah valid ke dalam database
    for (const feature of geojsonFeatures) {
      const { properties, geometry } = feature;

      await blokRepo
        .createQueryBuilder()
        .insert()
        .into(BatasBlok)
        .values({
          KD_PROV: properties.KD_PROV,
          KD_KAB: properties.KD_KAB,
          KD_KEC: properties.KD_KEC,
          KD_KEL: properties.KD_KEL,
          KD_BLOK: properties.KD_BLOK,
        })
        .execute();

      await blokRepo
        .createQueryBuilder()
        .update(BatasBlok)
        .set({
          geom: () => `ST_GeomFromGeoJSON('${JSON.stringify(geometry)}')`,
        })
        .where("KD_KEC = :KD_KEC", { KD_KEC: properties.KD_KEC })
        .andWhere("KD_KEL = :KD_KEL", { KD_KEL: properties.KD_KEL })
        .andWhere("KD_BLOK = :KD_BLOK", { KD_BLOK: properties.KD_BLOK })
        .execute();
    }

    return res.status(200).json(ShapefileService.createSuccessResponse("File SHP berhasil dikonversi dan disimpan ke database"));
  } catch (error) {
    ShapefileService.logWarning("Error membaca file SHP:", error);
    return res.status(500).json(ShapefileService.createErrorResponse("Internal server error", 500));
  }
};

export const PostShpKecamatan = async (req: Request, res: Response) => {
  try {
    const { jenis } = req.body;

    // Validate inputs
    if (typeof jenis !== "string" || !jenis.trim()) {
      return res.status(400).json(ShapefileService.createErrorResponse("Parameter 'jenis' tidak boleh kosong", 400));
    }

    // Basic filename sanitization to avoid invalid paths
    const safeJenis = jenis.trim();
    if (!GeometryService.isValidFilename(safeJenis)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Format nama file tidak valid", 400));
    }

    // Use service layer for path resolution (no kecamatan parameter needed)
    const resolution = ShapefileService.resolveShapefilePath({
      baseDir: ShapefileService.getShapefileDirectory("kecamatan"),
      jenis: safeJenis,
    });

    if (!resolution.found || !resolution.filePath) {
      return res.status(404).json({
        code: 404,
        message: "File SHP tidak ditemukan",
        detail: {
          tried: resolution.triedPaths,
        },
      });
    }

    const source = await open(resolution.filePath);
    const kecamatanRepo = AppDataSource.getRepository(BatasKecamatan);

    // pastikan KD_PROV dan KD_KAB sesuai dengan project yang dijalankan
    const refData: Record<string, string> = {
      KD_PROV: "64",
      KD_KAB: "07",
    };

    const geojsonFeatures: any[] = [];

    let result;
    do {
      result = await source.read();
      if (!result.done) {
        const { properties, geometry } = result.value;
        if (!geometry) continue;

        if (!properties) {
          return res.status(400).json(ShapefileService.createErrorResponse("Data properties tidak ditemukan dalam file SHP", 400));
        }

        const requiredFields = [
          { key: "KD_PROV", label: "Kode Provinsi" },
          { key: "KD_KAB", label: "Kode Kabupaten" },
          { key: "KD_KEC", label: "Kode Kecamatan" },
          { key: "NM_KEC", label: "Nama Kecamatan" },
        ];

        // Use service layer for field validation
        const fieldValidation = GeometryService.validateRequiredFields(properties, requiredFields);
        if (!fieldValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${fieldValidation.missingLabel} tidak boleh kosong`, 400));
        }

        // Use service layer for property value validation
        const valueValidation = GeometryService.validatePropertyValues(properties, refData, ["KD_PROV", "KD_KAB"]);
        if (!valueValidation.valid) {
          return res.status(400).json(ShapefileService.createErrorResponse(`${valueValidation.invalidField} di poligon tidak sesuai`, 400));
        }

        // Use service layer for geometry conversion
        let convertedCoordinates;
        try {
          convertedCoordinates = GeometryService.convertGeometry(geometry.type as any, (geometry as any).coordinates);
        } catch (error) {
          ShapefileService.logWarning(`Geometry type ${geometry.type} is not supported`);
          continue;
        }

        if (!ShapefileService.hasValidCoordinates(convertedCoordinates)) {
          ShapefileService.logWarning(`Geometri tidak valid untuk ${properties?.NM_KEC}`);
          continue;
        }

        const geoJsonData = GeometryService.createGeoJSON(geometry.type as any, convertedCoordinates, false);

        geojsonFeatures.push({
          type: "Feature",
          properties: {
            KD_PROV: properties?.KD_PROV,
            KD_KAB: properties?.KD_KAB,
            KD_KEC: properties?.KD_KEC,
            NM_KEC: properties?.NM_KEC,
          },
          geometry: geoJsonData,
        });
      }
    } while (!result.done);

    // Use service layer to check if no valid features
    if (ShapefileService.hasNoValidFeatures(geojsonFeatures)) {
      return res.status(400).json(ShapefileService.createErrorResponse("Tidak ada data valid yang bisa disimpan", 400));
    }

    // Delete all existing kecamatan data before inserting new data
    const existingData = await kecamatanRepo.find();
    if (existingData.length > 0) {
      ShapefileService.logProgress(`Deleting all existing kecamatan records`);
      await kecamatanRepo.clear();
    }

    // Simpan data yang sudah valid ke dalam database
    for (const feature of geojsonFeatures) {
      const { properties, geometry } = feature;

      await kecamatanRepo
        .createQueryBuilder()
        .insert()
        .into(BatasKecamatan)
        .values({
          KD_PROV: properties.KD_PROV,
          KD_KAB: properties.KD_KAB,
          KD_KEC: properties.KD_KEC,
          NM_KEC: properties.NM_KEC,
        })
        .execute();

      await kecamatanRepo
        .createQueryBuilder()
        .update(BatasKecamatan)
        .set({
          geom: () => `ST_GeomFromGeoJSON('${JSON.stringify(geometry)}')`,
        })
        .where("KD_KEC = :KD_KEC", { KD_KEC: properties.KD_KEC })
        .execute();
    }

    return res.status(200).json(ShapefileService.createSuccessResponse("File SHP batas kecamatan berhasil dikonversi dan disimpan ke database"));
  } catch (error) {
    ShapefileService.logWarning("Error membaca file SHP:", error);
    return res.status(500).json(ShapefileService.createErrorResponse("Internal server error", 500));
  }
};
