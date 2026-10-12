import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { PbjtPoint } from "../entity/entities/PbjtPoint";

export const getPbjtPoints = async (req: Request, res: Response) => {
  try {
    const pbjtRepo = AppDataSource.getRepository(PbjtPoint);

    const pbjtPoints = await pbjtRepo.find({
      where: {},
      select: ["npwpd", "tipeOp", "namaWp", "koordinat", "keterangan", "geom"],
    });

    const validPoints = pbjtPoints.filter((point) => point.geom !== null);

    return res.status(200).json({
      code: 200,
      data: validPoints,
      message: "Data PBJT berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data PBJT:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const checkPbjtByNpwpd = async (req: Request, res: Response) => {
  try {
    const { npwpd } = req.query;

    if (!npwpd) {
      return res.status(400).json({
        code: 400,
        message: "NPWPD wajib diisi",
      });
    }

    const pbjtRepo = AppDataSource.getRepository(PbjtPoint);

    const existingPoint = await pbjtRepo.findOne({
      where: { npwpd: npwpd as string },
      select: ["npwpd", "tipeOp", "namaWp", "koordinat", "keterangan", "geom"],
    });

    if (!existingPoint) {
      return res.status(404).json({
        code: 404,
        message: "NPWPD tidak ditemukan",
      });
    }

    // Extract lat/lng from koordinat string or geom
    let lat = null;
    let lng = null;
    if (existingPoint.koordinat) {
      const coords = existingPoint.koordinat.split(",");
      if (coords.length === 2) {
        lat = parseFloat(coords[0].trim());
        lng = parseFloat(coords[1].trim());
      }
    }

    return res.status(200).json({
      code: 200,
      data: {
        npwpd: existingPoint.npwpd,
        tipeOp: existingPoint.tipeOp,
        namaWp: existingPoint.namaWp,
        koordinat: existingPoint.koordinat,
        keterangan: existingPoint.keterangan,
        lat,
        lng,
      },
      message: "NPWPD ditemukan",
    });
  } catch (error) {
    console.error("Error checking NPWPD:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const createPbjtPoint = async (req: Request, res: Response) => {
  try {
    const { npwpd, tipeOp, namaWp, koordinat, keterangan, lat, lng } = req.body;

    // Validate required fields
    if (!npwpd || !tipeOp || !namaWp || !lat || !lng) {
      return res.status(400).json({
        code: 400,
        message: "NPWPD, Tipe OP, Nama WP, Latitude, dan Longitude wajib diisi",
      });
    }

    const pbjtRepo = AppDataSource.getRepository(PbjtPoint);

    // Check if NPWPD already exists
    const existingPoint = await pbjtRepo.findOne({
      where: { npwpd },
    });

    if (existingPoint) {
      return res.status(409).json({
        code: 409,
        message: "NPWPD sudah terdaftar",
      });
    }

    // Create geometry point (PostGIS format)
    // ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
    const geomQuery = `ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;

    // Coordinate string format
    const koordinatString = koordinat || `${lat}, ${lng}`;

    // Insert using raw query to handle PostGIS geometry
    await AppDataSource.query(
      `INSERT INTO "GIS_BONEBOL"."pbjt" (npwpd, tipe_op, nama_wp, koordinat, keterangan, geom)
       VALUES ($1, $2, $3, $4, $5, ${geomQuery})`,
      [npwpd, tipeOp.toUpperCase(), namaWp, koordinatString, keterangan || null]
    );

    return res.status(201).json({
      code: 201,
      message: "Titik PBJT berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error menambahkan titik PBJT:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const updatePbjtPoint = async (req: Request, res: Response) => {
  try {
    const { npwpd, tipeOp, namaWp, koordinat, keterangan, lat, lng } = req.body;

    // Validate required fields
    if (!npwpd || !tipeOp || !namaWp || !lat || !lng) {
      return res.status(400).json({
        code: 400,
        message: "NPWPD, Tipe OP, Nama WP, Latitude, dan Longitude wajib diisi",
      });
    }

    const pbjtRepo = AppDataSource.getRepository(PbjtPoint);

    // Check if NPWPD exists
    const existingPoint = await pbjtRepo.findOne({
      where: { npwpd },
    });

    if (!existingPoint) {
      return res.status(404).json({
        code: 404,
        message: "NPWPD tidak ditemukan",
      });
    }

    // Create geometry point (PostGIS format)
    const geomQuery = `ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;

    // Coordinate string format
    const koordinatString = koordinat || `${lat}, ${lng}`;

    // Update using raw query to handle PostGIS geometry
    await AppDataSource.query(
      `UPDATE "GIS_BONEBOL"."pbjt"
       SET tipe_op = $1, nama_wp = $2, koordinat = $3, keterangan = $4, geom = ${geomQuery}
       WHERE npwpd = $5`,
      [tipeOp.toUpperCase(), namaWp, koordinatString, keterangan || null, npwpd]
    );

    return res.status(200).json({
      code: 200,
      message: "Data PBJT berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating PBJT point:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
