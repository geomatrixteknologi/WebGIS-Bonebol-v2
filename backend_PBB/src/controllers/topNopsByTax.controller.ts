import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";

const refWilayahRepository = new RefWilayahRepository();

const fullNopExpression = (alias: string): string => {
  return `${alias}."KD_PROPINSI" || ${alias}."KD_DATI2" || ${alias}."KD_KECAMATAN" || ${alias}."KD_KELURAHAN" || ${alias}."KD_BLOK" || ${alias}."NO_URUT" || ${alias}."KD_JNS_OP"`;
};

/**
 * GET /api/retrieve/top-nops-by-tax
 *
 * Returns top-N NOPs ranked by tax value (PBB or NJOP), regardless of
 * payment status. Used by AI Copilot for "top NOP nilai pajak terbesar"
 * queries that should NOT be filtered to overdue records only.
 *
 * Query params:
 * - year (required): tax year, e.g. "2024"
 * - kecamatan (optional): kecamatan name; resolved to code internally
 * - kelurahan (optional): kelurahan name; resolved to code internally
 * - limit (optional, default 10): max records to return
 * - sortBy (optional, default "pbb"): "pbb" | "njop"
 * - paymentStatus (optional, default "all"): "all" | "paid" | "unpaid"
 */
export const getTopNopsByTax = async (req: Request, res: Response) => {
  try {
    const {
      year,
      kecamatan,
      kelurahan,
      limit = "10",
      sortBy = "pbb",
      paymentStatus = "all",
    } = req.query;

    if (!year || year === "all") {
      return res.status(400).json({
        code: 400,
        message: "Parameter 'year' wajib diisi (tidak menerima 'all').",
      });
    }

    const hasKecFilter = kecamatan && kecamatan !== "all";
    const hasKelFilter = kelurahan && kelurahan !== "all";

    const transform_kode_kecamatan = hasKecFilter
      ? await refWilayahRepository.findKecamatanByName(kecamatan as string)
      : null;
    let transform_kode_kelurahan = null;
    if (hasKelFilter) {
      if (transform_kode_kecamatan) {
        transform_kode_kelurahan = await refWilayahRepository.findKdKelurahan(
          transform_kode_kecamatan.KDKECAMATAN,
          kelurahan as string
        );
      } else {
        transform_kode_kelurahan = await refWilayahRepository.findKelurahanByName(
          kelurahan as string
        );
      }
    }

    const kode_kecamatan =
      transform_kode_kecamatan?.KDKECAMATAN ?? transform_kode_kelurahan?.KDKECAMATAN;
    const kode_kelurahan = transform_kode_kelurahan?.KDKELURAHAN;

    const sortField =
      sortBy === "njop" ? `SPPT."NJOP_SPPT"` : `SPPT."PBB_YG_HARUS_DIBAYAR_SPPT"`;

    const spptRepository = new SpptRepository();
    let query = spptRepository
      .createQueryBuilder("SPPT")
      .select([
        `${fullNopExpression("SPPT")} AS nop`,
        `SPPT."NM_WP_SPPT" AS "nmWpSppt"`,
        `SPPT."KD_KECAMATAN" AS "kdKecamatan"`,
        `SPPT."KD_KELURAHAN" AS "kdKelurahan"`,
        `SPPT."THN_PAJAK_SPPT" AS "thnPajakSppt"`,
        `SPPT."NJOP_BUMI_SPPT" AS "njopBumi"`,
        `SPPT."NJOP_BNG_SPPT" AS "njopBangunan"`,
        `SPPT."NJOP_SPPT" AS "njopTotal"`,
        `SPPT."PBB_TERHUTANG_SPPT" AS "pbbTerhutang"`,
        `SPPT."PBB_YG_HARUS_DIBAYAR_SPPT" AS "pbbYgHarusDibayar"`,
        `SPPT."STATUS_PEMBAYARAN_SPPT" AS "statusPembayaran"`,
        `SPPT."TGL_JATUH_TEMPO_SPPT" AS "tglJatuhTempo"`,
      ])
      .where(`SPPT."THN_PAJAK_SPPT" = :year`, { year: String(year) });

    if (kode_kecamatan) {
      query = query.andWhere(`SPPT."KD_KECAMATAN" = :kode_kecamatan`, {
        kode_kecamatan,
      });
    }
    if (kode_kelurahan) {
      query = query.andWhere(`SPPT."KD_KELURAHAN" = :kode_kelurahan`, {
        kode_kelurahan,
      });
    }
    if (paymentStatus === "paid") {
      query = query.andWhere(`SPPT."STATUS_PEMBAYARAN_SPPT" = '1'`);
    } else if (paymentStatus === "unpaid") {
      query = query.andWhere(
        `(SPPT."STATUS_PEMBAYARAN_SPPT" != '1' OR SPPT."STATUS_PEMBAYARAN_SPPT" IS NULL)`
      );
    }

    const limitNum = Math.max(1, Math.min(parseInt(limit as string, 10) || 10, 500));
    /// postgresql
    // query = query
    //   .andWhere(`${sortField} IS NOT NULL`)
    //   .orderBy(sortField, "DESC")
    //   .andWhere(`ROW_NUMBER() OVER (ORDER BY ${sortField} DESC) <= ${limitNum}`);

    // const records = await query.getRawMany();

    /// After (Oracle 11g compatible):
    query = query
      .andWhere(`${sortField} IS NOT NULL`)
      .orderBy(sortField, "DESC");

    const [sql, params] = query.getQueryAndParameters();
    params.push(limitNum);

    const records = await spptRepository.query(
      `SELECT * FROM (${sql}) WHERE ROWNUM <= :${params.length}`,
      params
    );

    return res.status(200).json({
      code: 200,
      data: {
        records,
        count: records.length,
        sortBy,
        paymentStatus,
      },
      message: "Data top NOP by tax berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data top NOP by tax:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
