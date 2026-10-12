import { Zoom } from "../entity/entities/Zoom";
import { AppDataSource } from "../data-resource";
import { Request, Response } from "express";

export const retrieveZoom = async (req: Request, res: Response) => {
  try {
    const zoomRepo = AppDataSource.getRepository(Zoom);
    const zoomValue = await zoomRepo.findOne({ where: {} });

    if (zoomValue === null) {
      return res.status(404).json({
        code: 404,
        message: "zoom value kosong!!!",
      });
    }

    return res.status(200).json({
      code: 200,
      data: zoomValue,
      message: "zoomValue berhasil diambil",
    });
  } catch (error) {
    console.error("Error merubah zoom:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const updateZoom = async (req: Request, res: Response) => {
  try {
    const { zoomValue } = req.body;
    if (!zoomValue) {
      return res.status(400).json({
        code: 400,
        message: "Zoom value harus diisi",
      });
    }

    const zoomRepo = AppDataSource.getRepository(Zoom);
    // Cari data center point yang ada (asumsi hanya ada 1 record)
    const existingZoom = await zoomRepo.findOne({ where: {} });

    if (existingZoom) {
      // Update data yang ada
      existingZoom.zoom = zoomValue;
      await zoomRepo.save(existingZoom);
    } else {
      // Buat baru jika tidak ada data
      const newZoomValue = zoomRepo.create({
        zoom: zoomValue,
      });
      await zoomRepo.save(newZoomValue);
    }

    return res.status(200).json({
      code: 200,
      data: zoomValue,
      message: "Zoom Value berhasil diupdate",
    });
  } catch (error) {
    console.error("Error mendapatkan zoom value:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};
