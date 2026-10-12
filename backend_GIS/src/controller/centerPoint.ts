import { AppDataSource } from "../data-resource";
import { CenterPoint } from "../entity/entities/CenterPoint";
import { Request, Response } from "express";
import { GeometryService } from "../services/GeometryService";

export const retrieveCenterPoint = async (req: Request, res: Response) => {
  try {
    const centerPointRepo = AppDataSource.getRepository(CenterPoint);
    const latlong = await centerPointRepo.findOne({ where: {} });

    if (latlong === null) {
      return res.status(404).json({
        code: 404,
        message: "Center Point kosong!!!",
      });
    }

    return res.status(200).json({
      code: 200,
      data: latlong,
      message: "titik center point berhasil diambil",
    });
  } catch (error) {
    console.error("Error merubah titik center point:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const updateCenterPoint = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({
        code: 400,
        message: "Latitude dan longitude harus diisi",
      });
    }

    // Parse strings to numbers for validation
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Check if parsing was successful
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        code: 400,
        message: "Latitude dan longitude harus berupa angka yang valid",
      });
    }

    // Use service layer for coordinate validation
    const validation = GeometryService.validateCoordinatePair(lat, lng);
    if (!validation.valid) {
      return res.status(400).json({
        code: 400,
        message: validation.error,
      });
    }

    const centerPointRepo = AppDataSource.getRepository(CenterPoint);
    // Cari data center point yang ada (asumsi hanya ada 1 record)
    const existingCenterPoint = await centerPointRepo.findOne({ where: {} });

    if (existingCenterPoint) {
      // Update data yang ada
      existingCenterPoint.LATITUDE = latitude;
      existingCenterPoint.LONGITUDE = longitude;
      await centerPointRepo.save(existingCenterPoint);
    } else {
      // Buat baru jika tidak ada data
      const newCenterPoint = centerPointRepo.create({
        LATITUDE: latitude,
        LONGITUDE: longitude,
      });
      await centerPointRepo.save(newCenterPoint);
    }

    return res.status(200).json({
      code: 200,
      data: { latitude, longitude },
      message: "Center point berhasil diupdate",
    });
  } catch (error) {
    console.error("Error mendapatkan titik center point:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};
