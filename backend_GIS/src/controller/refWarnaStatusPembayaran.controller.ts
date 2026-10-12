import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { RefWarnaStatusPembayaran } from "../entity/entities/RefWarnaStatusPembayaran";

export const getRefWarnaStatusPembayaran = async (req: Request, res: Response) => {
  try {
    const refWarnaRepo = AppDataSource.getRepository(RefWarnaStatusPembayaran);
    const dataRefWarna = await refWarnaRepo.find();

    return res.status(200).json({
      code: 200,
      data: dataRefWarna,
      message: "Data warna status pembayaran berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data warna status pembayaran:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
