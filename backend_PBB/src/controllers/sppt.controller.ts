import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Sppt } from "../entity_prod/Sppt";

export const getSpptbyTahun = async (req: Request, res: Response) => {
  try {
    const tahun = String(req.query.tahun);

    const spptRepo = AppDataSource.getRepository(Sppt);
    const dataSppt = await spptRepo.find({
      where: {
        thnPajakSppt: tahun,
      },
    });

    return res.status(200).json({
      code: 200,
      data: dataSppt,
      message: "Data sppt berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data sppt:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
