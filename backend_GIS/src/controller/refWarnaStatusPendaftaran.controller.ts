import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { RefWarnaStatusPendaftaran } from "../entity/entities/RefWarnaStatusPendaftaran";

export const getRefWarnaStatusPendaftaran = async (req: Request, res: Response) => {
  try {
    const refWarnaRepo = AppDataSource.getRepository(RefWarnaStatusPendaftaran);
    const dataRefWarna = await refWarnaRepo.find();

    return res.status(200).json({
      code: 200,
      data: dataRefWarna,
      message: "Data warna status pendaftaran berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data warna status pendaftaran:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
