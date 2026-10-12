import { Request, Response } from "express";
import { BatasKelurahanRepository } from "../repositories/BatasKelurahanRepository";

// Initialize repository
const batasKelurahanRepo = new BatasKelurahanRepository();

/**
 * Get all kelurahan boundaries as GeoJSON FeatureCollection
 */
export const getBatasKelurahan = async (req: Request, res: Response) => {
  try {
    const features = await batasKelurahanRepo.findAllWithGeometry();

    const featureCollection = {
      type: "FeatureCollection",
      features,
    };

    return res.status(200).json({
      code: 200,
      data: featureCollection,
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

/**
 * Get kelurahan boundary by kelurahan code
 */
export const getBatasKelurahanByCode = async (req: Request, res: Response) => {
  try {
    const { kdKel } = req.query;

    if (!kdKel) {
      return res.status(400).json({
        code: 400,
        message: "Parameter kdKel diperlukan",
      });
    }

    const feature = await batasKelurahanRepo.findByKelurahanCode(kdKel as string);

    if (!feature) {
      return res.status(404).json({
        code: 404,
        message: "Data batas kelurahan tidak ditemukan",
      });
    }

    return res.status(200).json({
      code: 200,
      data: feature,
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

/**
 * Get kelurahan boundaries by kecamatan code
 */
export const getBatasKelurahanByKecamatan = async (req: Request, res: Response) => {
  try {
    const { kdKec } = req.query;

    if (!kdKec) {
      return res.status(400).json({
        code: 400,
        message: "Parameter kdKec diperlukan",
      });
    }

    const features = await batasKelurahanRepo.findByKecamatanCode(kdKec as string);

    const featureCollection = {
      type: "FeatureCollection",
      features,
    };

    return res.status(200).json({
      code: 200,
      data: featureCollection,
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
