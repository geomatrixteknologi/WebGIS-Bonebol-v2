import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Sppt } from "../entity_prod/Sppt";

export const getSebaranZntDatObjekPajak = async (req: Request, res: Response) => {
  try {
    const tahun = Number(req.query.tahun);
    const { kdkec, kdkel } = req.query;
    const spptRepository = AppDataSource.getRepository(Sppt);

    const datObjekPajaks = await spptRepository
      .createQueryBuilder("sppt")
      .where("sppt.thnPajakSppt = :tahun", { tahun: tahun.toString() })
      .andWhere("sppt.kdKecamatan = :kdkec", { kdkec })
      .andWhere("sppt.kdKelurahan = :kdkel", { kdkel })
      .select([
        `
        (sppt.kdPropinsi || sppt.kdDati2 || sppt.kdKecamatan || 
         sppt.kdKelurahan || sppt.kdBlok || sppt.noUrut || sppt.kdJnsOp)
        AS nop
        `,
        "sppt.nmWpSppt AS namaWp",
        // "sppt.opAlamat AS alamatOp",
        "sppt.luasBumiSppt AS luasBumi",
        "sppt.luasBngSppt AS luasBangunan",
        "sppt.njopBumiSppt AS njopBumi",
        "sppt.njopBngSppt AS njopBangunan",
        "sppt.pbbTerhutangSppt AS pbbTerhutang",
      ])
      .getRawMany();
    return res.status(200).json({
      data: datObjekPajaks,
    });
  } catch (error) {
    console.error("Error mengambil data kode kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
