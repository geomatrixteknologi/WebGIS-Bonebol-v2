import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { RefWarnaKelurahan } from "../entity/entities/RefWarnaKelurahan";

export const getRefWarnaKelurahan = async (req: Request, res: Response) => {
  try {
    const refWarnaRepo = AppDataSource.getRepository(RefWarnaKelurahan);
    const dataRefWarna = await refWarnaRepo.find();

    return res.status(200).json({
      code: 200,
      data: dataRefWarna,
      message: "Data warna Kelurahan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data warna kelurahan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
