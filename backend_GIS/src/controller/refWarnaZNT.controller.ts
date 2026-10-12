import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { RefWarnaZnt } from "../entity/entities/RefWarnaZnt";

export const getRefWarnaZNT = async (req: Request, res: Response) => {
  try {
    const refWarnaRepo = AppDataSource.getRepository(RefWarnaZnt);
    const dataRefWarna = await refWarnaRepo.find();

    return res.status(200).json({
      code: 200,
      data: dataRefWarna,
      message: "Data warna ZNT berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data warna ZNT:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
