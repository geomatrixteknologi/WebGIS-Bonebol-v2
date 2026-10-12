import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { BatasZnt } from "../entity/entities/BatasZnt";

// export const getBatasZNTbyKecKelTahun = async (req: Request, res: Response) => {
//   try {
//     const kdkec = String(req.query.kdkec);
//     const kdkel = String(req.query.kdkel);
//     const tahun = String(req.query.tahun);

//     const batasZntRepo = AppDataSource.getRepository(BatasZnt);
//     const dataBatasZnt = await batasZntRepo.find({
//       where: {
//         KD_KEC: kdkec,
//         KD_KEL: kdkel,
//         TAHUN: tahun,
//       },
//       order: {
//         NIR_ANAL: "DESC", // This line sorts the results by NIR_ANAL in descending order
//       },
//     });

//     if (!dataBatasZnt) {
//       return res.status(404).json({ message: "Tahun tidak ditemukan di database" });
//     }

//     if (dataBatasZnt.length === 0) {
//       return res.status(404).json({ message: "data tidak ditemukan di database" });
//     }

//     return res.status(200).json({
//       code: 200,
//       data: dataBatasZnt,
//       message: "Data batas ZNT dari tahun berhasil diambil",
//     });
//   } catch (error) {
//     console.error("Error mengambil data batas ZNT dari tahun:", error);
//     return res.status(500).json({
//       code: 500,
//       message: "Internal server error",
//     });
//   }
// };

export const getBatasZNTbyKecKelTahun = async (req: Request, res: Response) => {
  try {
    const { kdkec, kdkel, tahun } = req.query;

    if (!kdkec || !kdkel || !tahun) {
      return res.status(400).json({
        code: 400,
        message: "Parameter kdkec, kdkel, dan tahun wajib diisi",
      });
    }

    const zntRepo = AppDataSource.getRepository(BatasZnt);

    const batasData = await zntRepo
      .createQueryBuilder("batas")
      .where("TRIM(batas.KD_KEC) = :kdkec", { kdkec: String(kdkec) })
      .andWhere("TRIM(batas.KD_KEL) = :kdkel", { kdkel: String(kdkel) })
      .andWhere("TRIM(batas.TAHUN) = :tahun", { tahun: String(tahun) })
      .select([
        "ST_AsGeoJSON(batas.geom) as geometry",
        "batas.KD_PROV",
        "batas.KD_KAB",
        "batas.KD_KEC",
        "batas.KD_KEL",
        "batas.KD_ZNT",
        "batas.TAHUN",
        "batas.NIR_EKS",
        "batas.NIR_ANAL",
        "batas.KLS_EKS",
        "batas.KLS_ANAL",
        "batas.LABEL_EKS",
        "batas.LABEL_ANAL",
        "batas.WARNA_ANAL",
      ])
      .orderBy("batas.NIR_ANAL", "DESC")
      .getRawMany();

    if (!batasData || batasData.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "Data tidak ditemukan di database",
      });
    }

    const geojson = batasData.map((data: any) => ({
      type: "Feature",
      properties: {
        KD_PROV: data.batas_KD_PROV,
        KD_KAB: data.batas_KD_KAB,
        KD_KEC: data.batas_KD_KEC,
        KD_KEL: data.batas_KD_KEL,
        KD_ZNT: data.batas_KD_ZNT,
        TAHUN: data.batas_TAHUN,
        NIR_EKS: data.batas_NIR_EKS,
        NIR_ANAL: data.batas_NIR_ANAL,
        KLS_EKS: data.batas_KLS_EKS,
        KLS_ANAL: data.batas_KLS_ANAL,
        LABEL_EKS: data.batas_LABEL_EKS,
        LABEL_ANAL: data.batas_LABEL_ANAL,
        WARNA_ANAL: data.batas_WARNA_ANAL,
      },
      geometry: JSON.parse(data.geometry),
    }));

    return res.status(200).json({
      code: 200,
      data: geojson,
      message: "Data batas ZNT berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas ZNT:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
