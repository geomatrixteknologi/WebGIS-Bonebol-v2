import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PbbSppt } from "../entity_mataram/entities/PbbSppt";

export const getNOPbyNPWPD = async (req: Request, res: Response) => {
  try {
    const { npwpd } = req.query;

    if (!npwpd) {
      return res.status(400).json({
        code: 400,
        message: "NPWPD tidak diberikan",
      });
    }

    const spptRepo = AppDataSource.getRepository(PbbSppt);

    // Query mencari NOP berdasarkan NPWPD di tabel SPPT
    const dataSppt = await spptRepo.findOne({
      where: {
        wpNpwpd: npwpd as string,
      },
      select: ["nop", "wpNama", "wpNpwpd"],
    });

    if (!dataSppt) {
      return res.status(404).json({
        code: 404,
        message: "NPWPD tidak ditemukan di database",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Sukses",
      data: {
        nop: dataSppt.nop,
        wpNama: dataSppt.wpNama,
        wpNpwpd: dataSppt.wpNpwpd,
      },
    });
  } catch (error) {
    console.error("Error mengambil NOP dari NPWPD:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
