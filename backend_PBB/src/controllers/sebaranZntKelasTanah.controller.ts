import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Sppt } from "../entity_prod/Sppt";
import { KelasTanah } from "../entity_prod/KelasTanah";

export const getSebaranZntKelasTanah = async (req: Request, res: Response) => {
  try {
    const tahun = req.query.tahun ? Number(req.query.tahun) : new Date().getFullYear();

    const spptRepository = AppDataSource.getRepository(Sppt);
    const kelasTanahRepository = AppDataSource.getRepository(KelasTanah);

    // Get all kelas tanah data for reference
    const allKelasTanah = await kelasTanahRepository.find({
      order: {
        kdKlsTanah: "ASC",
      },
    });

    // Create map of kode -> kelas tanah details
    const kelasTanahMap: Record<
      string,
      {
        kode: string;
        nilaiPerM2: number | null;
        nilaiPerM2BatasBawah: number | null;
        nilaiPerM2BatasAtas: number | null;
      }
    > = {};

    allKelasTanah.forEach((kt) => {
      kelasTanahMap[kt.kdKlsTanah] = {
        kode: kt.kdKlsTanah,
        nilaiPerM2: Number(kt.nilaiPerM2Tanah),
        nilaiPerM2BatasBawah: Number(kt.nilaiMinTanah),
        nilaiPerM2BatasAtas: Number(kt.nilaiMaxTanah),
      };
    });

    // Get NOP -> kelas_bumi mapping
    const nopKelasBumi = await spptRepository
      .createQueryBuilder("sppt")
      .where("sppt.thnPajakSppt = :tahun", { tahun: tahun.toString() })
      .select([
        `
        (sppt.kdPropinsi || sppt.kdDati2 || sppt.kdKecamatan || 
         sppt.kdKelurahan || sppt.kdBlok || sppt.noUrut || sppt.kdJnsOp)
        AS "nop"
        `,
        `sppt.kdKlsTanah AS "kelas_bumi"`,
      ])
      .getRawMany();

    // Create NOP -> kelas_bumi map
    const nopKelasMap: Record<string, string> = {};
    nopKelasBumi.forEach((item: any) => {
      if (item.kelas_bumi) {
        nopKelasMap[item.nop] = item.kelas_bumi;
      }
    });

    return res.status(200).json({
      code: 200,
      data: {
        nopKelasMap, // NOP -> kelas_bumi code mapping
        kelasTanahData: allKelasTanah, // All kelas tanah reference data
      },
      message: "Sebaran ZNT berdasarkan kelas tanah berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil sebaran ZNT kelas tanah:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
