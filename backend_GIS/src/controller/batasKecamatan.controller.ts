import { Request, Response } from "express";
import { BatasKecamatanRepository } from "../repositories/BatasKecamatanRepository";

// Initialize repository
const batasKecamatanRepo = new BatasKecamatanRepository();

/**
 * Get all kecamatan boundaries as GeoJSON FeatureCollection
 */
export const getBatasKecamatan = async (req: Request, res: Response) => {
  try {
    const features = await batasKecamatanRepo.findAllWithGeometry();

    const featureCollection = {
      type: "FeatureCollection",
      features,
    };

    return res.status(200).json({
      code: 200,
      data: featureCollection,
      message: "Data batas kecamatan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

/**
 * Get kecamatan boundary by kecamatan code
 */
export const getBatasKecamatanByCode = async (req: Request, res: Response) => {
  try {
    const { kdKec } = req.query;

    if (!kdKec) {
      return res.status(400).json({
        code: 400,
        message: "Parameter kdKec diperlukan",
      });
    }

    const feature = await batasKecamatanRepo.findByKecamatanCode(kdKec as string);

    if (!feature) {
      return res.status(404).json({
        code: 404,
        message: "Data batas kecamatan tidak ditemukan",
      });
    }

    return res.status(200).json({
      code: 200,
      data: feature,
      message: "Data batas kecamatan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
