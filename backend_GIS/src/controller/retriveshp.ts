import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { BatasKelurahan } from "../entity/entities/BatasKelurahan";
import { BatasPersil } from "../entity/entities/BatasPersil";
import { BatasZnt } from "../entity/entities/BatasZnt";
import { BatasBlok } from "../entity/entities/BatasBlok";
import { getCachedTile, setCachedTile, tileCacheKey } from "../utils/tileCache";
import { RefWarnaKelurahan } from "../entity/entities/RefWarnaKelurahan";

export const getBatasKelurahan = async (req: Request, res: Response) => {
  try {
    const kelurahanRepo = AppDataSource.getRepository(BatasKelurahan);

    // Cek apakah ada data di dalam tabel
    const count = await kelurahanRepo.count();
    console.log(`[getBatasKelurahan] Total records in table: ${count}`);

    if (count === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak tersedia",
      });
    }

    // Ambil semua data dari tabel batas_kelurahan
    const batasData = await kelurahanRepo
      .createQueryBuilder("batas")
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry", // Ambil geometri dalam format GeoJSON
        'batas."KD_PROV"',
        'batas."KD_KAB"',
        'batas."KD_KEC"',
        'batas."KD_KEL"',
        'batas."NM_KEL"',
      ])
      .where("batas.geom IS NOT NULL")
      .getRawMany();

    console.log(`[getBatasKelurahan] Query returned ${batasData.length} features`);
    if (batasData.length > 0) {
      console.log("[getBatasKelurahan] Sample data keys:", Object.keys(batasData[0]));
      console.log("[getBatasKelurahan] Sample data:", batasData[0]);
    }

    // Konversi hasil query ke format GeoJSON
    const geojson = {
      data: batasData.map((data: any) => ({
        type: "Feature",
        properties: {
          KD_PROV: data.KD_PROV,
          KD_KAB: data.KD_KAB,
          KD_KEC: data.KD_KEC,
          KD_KEL: data.KD_KEL,
          NM_KEL: data.NM_KEL,
        },
        geometry: JSON.parse(data.geometry), // Parsing string GeoJSON menjadi objek
      })),
    };

    return res.status(200).json({
      code: 200,
      data: geojson.data,
      message: "Data batas kelurahan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas kelurahan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getBatasPersil = async (req: Request, res: Response) => {
  try {
    const persilRepo = AppDataSource.getRepository(BatasPersil);

    // Cek apakah ada data di dalam tabel
    const count = await persilRepo.count();
    if (count === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak tersedia",
      });
    }

    // Ambil semua data dari tabel batas_persil
    const batasData = await persilRepo
      .createQueryBuilder("batas")
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry", // Ambil geometri dalam format GeoJSON
        "batas.KD_PROV",
        "batas.KD_KAB",
        "batas.KD_KEC",
        "batas.KD_KEL",
        "batas.KD_BLOK",
        "batas.NO_URUT",
        "batas.KD_JNS_OP",
        "batas.FOTO_PERSIL",
      ])
      .getRawMany();

    // Konversi hasil query ke format GeoJSON
    const geojson = {
      data: batasData.map((data: any) => ({
        type: "Feature",
        properties: {
          KD_PROV: data.batas_KD_PROV,
          KD_KAB: data.batas_KD_KAB,
          KD_KEC: data.batas_KD_KEC,
          KD_KEL: data.batas_KD_KEL,
          KD_BLOK: data.batas_KD_BLOK,
          NO_URUT: data.batas_NO_URUT,
          KD_JNS_OP: data.batas_KD_JNS_OP,
          FOTO_PERSIL: data.batas_FOTO_PERSIL,
        },
        geometry: JSON.parse(data.geometry), // Parsing string GeoJSON menjadi objek
      })),
    };

    return res.status(200).json({
      code: 200,
      data: geojson.data,
      message: "Data batas persil berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas persil:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getBatasZNT = async (req: Request, res: Response) => {
  try {
    const zntRepo = AppDataSource.getRepository(BatasZnt);

    // Cek apakah ada data di dalam tabel
    const count = await zntRepo.count();
    if (count === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak tersedia",
      });
    }

    // Ambil semua data dari tabel batas_persil
    const batasData = await zntRepo
      .createQueryBuilder("batas")
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry", // Ambil geometri dalam format GeoJSON
        "batas.KD_PROV",
        "batas.KD_KAB",
        "batas.KD_KEC",
        "batas.KD_KEL",
        "batas.KD_ZNT",
        "batas.TAHUN",
        "batas.NIR_EKS",
        "batas.NIR_ANAL",
        "batas.KLS_EKS",
        "batas.KLS_ANAL",
        "batas.LABEL_EKS",
        "batas.LABEL_ANAL",
        "batas.WARNA_ANAL",
      ])
      .getRawMany();

    // Konversi hasil query ke format GeoJSON
    const geojson = {
      data: batasData.map((data: any) => ({
        type: "Feature",
        properties: {
          KD_PROV: data.batas_KD_PROV,
          KD_KAB: data.batas_KD_KAB,
          KD_KEC: data.batas_KD_KEC,
          KD_KEL: data.batas_KD_KEL,
          KD_ZNT: data.batas_KD_ZNT,
          TAHUN: data.batas_TAHUN,
          NIR_EKS: data.batas_NIR_EKS,
          NIR_ANAL: data.batas_NIR_ANAL,
          KLS_EKS: data.batas_KLS_EKS,
          KLS_ANAL: data.batas_KLS_ANAL,
          LABEL_EKS: data.batas_LABEL_EKS,
          LABEL_ANAL: data.batas_LABEL_ANAL,
          WARNA_ANAL: data.batas_WARNA_ANAL,
        },
        geometry: JSON.parse(data.geometry), // Parsing string GeoJSON menjadi objek
      })),
    };

    return res.status(200).json({
      code: 200,
      data: geojson.data,
      message: "Data batas ZNT berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas ZNT:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getBatasBlok = async (req: Request, res: Response) => {
  try {
    const blokRepo = AppDataSource.getRepository(BatasBlok);
    const warnaRepo = AppDataSource.getRepository(RefWarnaKelurahan);

    const warna = await warnaRepo.find();

    // Cek apakah ada data di dalam tabel
    const count = await blokRepo.count();
    if (count === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak tersedia",
      });
    }

    // Ambil semua data dari tabel batas_blok
    const batasData = await blokRepo
      .createQueryBuilder("batas")
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry", // Ambil geometri dalam format GeoJSON
        "batas.KD_PROV",
        "batas.KD_KAB",
        "batas.KD_KEC",
        "batas.KD_KEL",
        "batas.KD_BLOK",
      ])
      .getRawMany();

    const geojson = {
      data: batasData.map((data: any) => {
        // Cari warna yang sesuai
        const warnaMatch = warna.find((w) => w.KD_KEC === data.batas_KD_KEC && w.KD_KEL === data.batas_KD_KEL);

        return {
          type: "Feature",
          properties: {
            KD_PROV: data.batas_KD_PROV,
            KD_KAB: data.batas_KD_KAB,
            KD_KEC: data.batas_KD_KEC,
            KD_KEL: data.batas_KD_KEL,
            KD_BLOK: data.batas_KD_BLOK,
            WARNA_BLOK: warnaMatch ? warnaMatch.WARNA : "#CCCCCC", // default abu-abu kalau tidak ada
          },
          geometry: JSON.parse(data.geometry),
        };
      }),
    };

    return res.status(200).json({
      code: 200,
      data: geojson.data,
      message: "Data batas Blok berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas Blok:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getPersilTile = async (req: Request, res: Response) => {
  const { z, x, y } = req.params;

  try {
    // Validasi parameter URL
    const zoom = parseInt(z as string);
    const tileX = parseInt(x as string);
    const tileY = parseInt(y as string);

    if (isNaN(zoom) || isNaN(tileX) || isNaN(tileY)) {
      return res.status(400).json({
        code: 400,
        message: "Parameter Z, X, Y tidak valid. Harap berikan angka.",
      });
    }

    const layer = `persil-${process.env.PROJECT_NAME}`;
    const cacheKey = tileCacheKey(layer, zoom, tileX, tileY);

    const cached = await getCachedTile(cacheKey);
    if (cached && cached.length > 0) {
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.send(cached);
    }

    const result = await AppDataSource.query(
      `SELECT ST_AsMVT(q, 'persil_layer', 4096, 'geom') AS mvt_tile
             FROM (
                 SELECT
                     ST_AsMVTGeom(
                         batas.geom, 
                         ST_TileEnvelope($1, $2, $3),    
                         4096,                           
                         64,                             
                         true                            
                     ) AS geom,
                     batas."KD_PROV", batas."KD_KAB", batas."KD_KEC",
                     batas."KD_KEL", batas."KD_BLOK", batas."NO_URUT",
                     batas."KD_JNS_OP", batas."FOTO_PERSIL"
                 FROM "GIS_BONEBOL".batas_persil batas
                 WHERE batas.geom && ST_TileEnvelope($1, $2, $3)
                   AND ST_IsValid(batas.geom) -- Opsional: Pastikan geometri valid
             ) q
             WHERE q.geom IS NOT NULL`,
      [zoom, tileX, tileY],
    );

    const mvtBuffer = result[0]?.mvt_tile;

    if (!mvtBuffer || mvtBuffer.length === 0) {
      return res.status(204).send();
    }

    setCachedTile(cacheKey, mvtBuffer).catch(() => { });

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(mvtBuffer);
  } catch (error) {
    console.error("Error fetching tile:", error);
    return res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};
export const getBlokTile = async (req: Request, res: Response) => {
  const { z, x, y } = req.params;

  try {
    // Validasi parameter URL
    const zoom = parseInt(z as string);
    const tileX = parseInt(x as string);
    const tileY = parseInt(y as string);

    if (isNaN(zoom) || isNaN(tileX) || isNaN(tileY)) {
      return res.status(400).json({
        code: 400,
        message: "Parameter Z, X, Y tidak valid. Harap berikan angka.",
      });
    }

    const layer = `blok-${process.env.PROJECT_NAME}`;
    const cacheKey = tileCacheKey(layer, zoom, tileX, tileY);

    const cached = await getCachedTile(cacheKey);
    if (cached && cached.length > 0) {
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.send(cached);
    }

    const result = await AppDataSource.query(
      `SELECT ST_AsMVT(q, 'blok_layer', 4096, 'geom') AS mvt_tile
             FROM (
                 SELECT
                     ST_AsMVTGeom(
                         batas.geom, 
                         ST_TileEnvelope($1, $2, $3),    
                         4096,                           
                         64,                             
                         true                            
                     ) AS geom,
                     batas."KD_PROV", batas."KD_KAB", batas."KD_KEC",
                     batas."KD_KEL", batas."KD_BLOK"
                 FROM "GIS_BONEBOL".batas_blok batas
                 WHERE batas.geom && ST_TileEnvelope($1, $2, $3)
                   AND ST_IsValid(batas.geom) -- Opsional: Pastikan geometri valid
             ) q
             WHERE q.geom IS NOT NULL`,
      [zoom, tileX, tileY],
    );

    const mvtBuffer = result[0]?.mvt_tile;

    if (!mvtBuffer || mvtBuffer.length === 0) {
      return res.status(204).send();
    }

    setCachedTile(cacheKey, mvtBuffer).catch(() => { });

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(mvtBuffer);
  } catch (error) {
    console.error("Error fetching tile:", error);
    return res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};
export const getKelurahanTile = async (req: Request, res: Response) => {
  const { z, x, y } = req.params;

  try {
    // Validasi parameter URL
    const zoom = parseInt(z as string);
    const tileX = parseInt(x as string);
    const tileY = parseInt(y as string);

    if (isNaN(zoom) || isNaN(tileX) || isNaN(tileY)) {
      return res.status(400).json({
        code: 400,
        message: "Parameter Z, X, Y tidak valid. Harap berikan angka.",
      });
    }

    const layer = `kelurahan-${process.env.PROJECT_NAME}`;
    const cacheKey = tileCacheKey(layer, zoom, tileX, tileY);

    const cached = await getCachedTile(cacheKey);
    if (cached && cached.length > 0) {
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.send(cached);
    }

    const result = await AppDataSource.query(
      `SELECT ST_AsMVT(q, 'kelurahan_layer', 4096, 'geom') AS mvt_tile
             FROM (
                 SELECT
                     ST_AsMVTGeom(
                         batas.geom, 
                         ST_TileEnvelope($1, $2, $3),    
                         4096,                           
                         64,                             
                         true                            
                     ) AS geom,
                     batas."KD_PROV", batas."KD_KAB", batas."KD_KEC",
                     batas."KD_KEL", batas."NM_KEL"
                 FROM "GIS_BONEBOL".batas_kelurahan batas
                 WHERE batas.geom && ST_TileEnvelope($1, $2, $3)
                   AND ST_IsValid(batas.geom) -- Opsional: Pastikan geometri valid
             ) q
             WHERE q.geom IS NOT NULL`,
      [zoom, tileX, tileY],
    );

    const mvtBuffer = result[0]?.mvt_tile;

    if (!mvtBuffer || mvtBuffer.length === 0) {
      return res.status(204).send();
    }

    setCachedTile(cacheKey, mvtBuffer).catch(() => { });

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(mvtBuffer);
  } catch (error) {
    console.error("Error fetching tile:", error);
    return res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};
export const getKecamatanTile = async (req: Request, res: Response) => {
  const { z, x, y } = req.params;

  try {
    // Validasi parameter URL
    const zoom = parseInt(z as string);
    const tileX = parseInt(x as string);
    const tileY = parseInt(y as string);

    if (isNaN(zoom) || isNaN(tileX) || isNaN(tileY)) {
      return res.status(400).json({
        code: 400,
        message: "Parameter Z, X, Y tidak valid. Harap berikan angka.",
      });
    }

    const layer = `kecamatan-${process.env.PROJECT_NAME}`;
    const cacheKey = tileCacheKey(layer, zoom, tileX, tileY);

    const cached = await getCachedTile(cacheKey);
    if (cached && cached.length > 0) {
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.send(cached);
    }

    const result = await AppDataSource.query(
      `SELECT ST_AsMVT(q, 'kecamatan_layer', 4096, 'geom') AS mvt_tile
             FROM (
                 SELECT
                     ST_AsMVTGeom(
                         batas.geom, 
                         ST_TileEnvelope($1, $2, $3),    
                         4096,                           
                         64,                             
                         true                            
                     ) AS geom,
                     batas."KD_PROV", batas."KD_KAB", batas."KD_KEC",
                     batas."NM_KEC"
                 FROM "GIS_BONEBOL".batas_kecamatan batas
                 WHERE batas.geom && ST_TileEnvelope($1, $2, $3)
                   AND ST_IsValid(batas.geom) -- Opsional: Pastikan geometri valid
             ) q
             WHERE q.geom IS NOT NULL`,
      [zoom, tileX, tileY],
    );

    const mvtBuffer = result[0]?.mvt_tile;

    if (!mvtBuffer || mvtBuffer.length === 0) {
      return res.status(204).send();
    }

    setCachedTile(cacheKey, mvtBuffer).catch(() => { });

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(mvtBuffer);
  } catch (error) {
    console.error("Error fetching tile:", error);
    return res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};
export const getZNTTile = async (req: Request, res: Response) => {
  const { z, x, y } = req.params;

  try {
    // Validasi parameter URL
    const zoom = parseInt(z as string);
    const tileX = parseInt(x as string);
    const tileY = parseInt(y as string);

    if (isNaN(zoom) || isNaN(tileX) || isNaN(tileY)) {
      return res.status(400).json({
        code: 400,
        message: "Parameter Z, X, Y tidak valid. Harap berikan angka.",
      });
    }

    const layer = `znt-${process.env.PROJECT_NAME}`;
    const cacheKey = tileCacheKey(layer, zoom, tileX, tileY);

    const cached = await getCachedTile(cacheKey);
    if (cached && cached.length > 0) {
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.send(cached);
    }

    const result = await AppDataSource.query(
      `SELECT ST_AsMVT(q, 'ZNT_layer', 4096, 'geom') AS mvt_tile
             FROM (
                 SELECT
                     ST_AsMVTGeom(
                         batas.geom, 
                         ST_TileEnvelope($1, $2, $3),    
                         4096,                           
                         64,                             
                         true                            
                     ) AS geom,
                     batas."KD_PROV", batas."KD_KAB", batas."KD_KEC",
                     batas."NM_KEC"
                 FROM "GIS_BONEBOL".batas_znt batas
                 WHERE batas.geom && ST_TileEnvelope($1, $2, $3)
                   AND ST_IsValid(batas.geom) -- Opsional: Pastikan geometri valid
             ) q
             WHERE q.geom IS NOT NULL`,
      [zoom, tileX, tileY],
    );

    const mvtBuffer = result[0]?.mvt_tile;

    if (!mvtBuffer || mvtBuffer.length === 0) {
      return res.status(204).send();
    }

    setCachedTile(cacheKey, mvtBuffer).catch(() => { });

    res.setHeader("Content-Type", "application/x-protobuf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(mvtBuffer);
  } catch (error) {
    console.error("Error fetching tile:", error);
    return res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
};
