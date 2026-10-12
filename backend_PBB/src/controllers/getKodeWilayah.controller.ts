import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RefKecamatan } from "../entity_prod/RefKecamatan";
import { RefKelurahan } from "../entity_prod/RefKelurahan";

export const getKodeKecamatan = async (req: Request, res: Response) => {
  try {
    const kodeKecamatanRepo = AppDataSource.getRepository(RefKecamatan);
    const dataKodeKecamatan = await kodeKecamatanRepo.find();

    // Transform data to match frontend expectations
    const transformedData = dataKodeKecamatan.map((item) => ({
      kdKecamatan: item.kdKecamatan,
      nmKecamatan: item.nmKecamatan,
    }));

    return res.status(200).json({
      code: 200,
      data: transformedData,
      message: "Data kode kecamatan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data kode kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getKodeKelurahan = async (req: Request, res: Response) => {
  try {
    const kodeKelurahanRepo = AppDataSource.getRepository(RefKelurahan);
    const dataKodeKelurahan = await kodeKelurahanRepo.find();

    // Transform data using the id_kecamatan as the district code
    const transformedData = dataKodeKelurahan.map((item) => ({
      kdKecamatan: item.kdKecamatan,
      kdKelurahan: item.kdKelurahan,
      nmKelurahan: item.nmKelurahan,
    }));

    return res.status(200).json({
      code: 200,
      data: transformedData,
      message: "Data kode kelurahan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data kode kelurahan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
