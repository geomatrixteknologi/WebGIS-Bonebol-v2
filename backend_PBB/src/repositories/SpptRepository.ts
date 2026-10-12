import { NOP } from "../constants";
import { AppDataSource } from "../data-source";
import { Sppt } from "../entity_prod/Sppt";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

/**
 * SpptRepository
 *
 * Repository for SPPT (Surat Pemberitahuan Pajak Terutang) entities.
 * Provides tax notice-specific database operations.
 *
 * Common Query Patterns:
 * - Find by NOP (Nomor Objek Pajak)
 * - Filter by payment status (paid/unpaid)
 * - Filter by tax year
 * - Aggregate payment summaries by region
 * - Calculate tax collection statistics
 *
 * @extends BaseRepository<Sppt>
 *
 */

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * Payment summary aggregation result
 */
export interface PaymentSummary {
  year: string;
  target: number;
  realization: number;
  totalNop: number;
  paidNop: number;
  unpaidNop: number;
  collectionRate: number;
}

/**
 * Regional summary aggregation result
 */
export interface RegionalSummary {
  kecamatan?: string;
  kelurahan?: string;
  target: number;
  realization: number;
  totalNop: number;
  paidNop: number;
  collectionRate: number;
}

/**
 * Year summary result
 */
export interface YearSummary {
  year: string;
  target: string | number;
  realization: string | number;
  paidCount: string | number;
  unpaidCount: string | number;
}

/**
 * SPPT filter options
 */
export interface SpptFilterOptions {
  year?: number;
  kecamatan?: string;
  kelurahan?: string;
  statusPembayaranSppt?: number | null;
  nop?: string;
}

// ============================================================================
// SPPT REPOSITORY
// ============================================================================

export class SpptRepository extends BaseRepository<Sppt> {
  constructor() {
    super(AppDataSource.getRepository(Sppt));
  }

  // ============================================================================
  // NOP-BASED QUERIES
  // ============================================================================

  /**
   * Finds SPPT records by NOP
   *
   * @param nop - Nomor Objek Pajak
   * @param year - Optional tax year filter
   * @returns Array of SPPT records
   *
   * @example
   * const sppts = await spptRepo.findByNOP("527172001001001", 2024);
   */
  async findByNOP(nop: string, year?: number): Promise<Sppt[]> {
    // const query = this.createQueryBuilder("sppt").where("sppt.nop = :nop", { nop });
    const query = this.createQueryBuilder("sppt")
      .where("sppt.kdPropinsi = :kdPropinsi", { kdPropinsi: nop.substring(NOP.POSITIONS.KD_PROV.start, NOP.POSITIONS.KD_PROV.end) })
      .andWhere("sppt.kdDati2 = :kdDati2", { kdDati2: nop.substring(NOP.POSITIONS.KD_KAB.start, NOP.POSITIONS.KD_KAB.end) })
      .andWhere("sppt.kdKecamatan = :kdKecamatan", { kdKecamatan: nop.substring(NOP.POSITIONS.KD_KEC.start, NOP.POSITIONS.KD_KEC.end) })
      .andWhere("sppt.kdKelurahan = :kdKelurahan", { kdKelurahan: nop.substring(NOP.POSITIONS.KD_KEL.start, NOP.POSITIONS.KD_KEL.end) })
      .andWhere("sppt.kdBlok = :kdBlok", { kdBlok: nop.substring(NOP.POSITIONS.KD_BLOK.start, NOP.POSITIONS.KD_BLOK.end) })
      .andWhere("sppt.noUrut = :noUrut", { noUrut: nop.substring(NOP.POSITIONS.NO_URUT.start, NOP.POSITIONS.NO_URUT.end) })
      .andWhere("sppt.kdJnsOp = :kdJnsOp", { kdJnsOp: nop.substring(NOP.POSITIONS.KD_JNS_OP.start, NOP.POSITIONS.KD_JNS_OP.end) });

    if (year) {
      query.andWhere("sppt.thnPajakSppt = :year", { year: year.toString() });
    }

    return query.getMany();
  }

  /**
   * Finds a single SPPT record by NOP and year
   *
   * @param nop - Nomor Objek Pajak
   * @param year - Tax year
   * @returns SPPT record or null
   *
   * @example
   * const sppt = await spptRepo.findOneByNOP("527172001001001", 2024);
   */
  async findOneByNOP(nop: string, year: number): Promise<Sppt | null> {
    const results = await this.findAll({
      where: {
        kdPropinsi: nop.substring(NOP.POSITIONS.KD_PROV.start, NOP.POSITIONS.KD_PROV.end),
        kdDati2: nop.substring(NOP.POSITIONS.KD_KAB.start, NOP.POSITIONS.KD_KAB.end),
        kdKecamatan: nop.substring(NOP.POSITIONS.KD_KEC.start, NOP.POSITIONS.KD_KEC.end),
        kdKelurahan: nop.substring(NOP.POSITIONS.KD_KEL.start, NOP.POSITIONS.KD_KEL.end),
        kdBlok: nop.substring(NOP.POSITIONS.KD_BLOK.start, NOP.POSITIONS.KD_BLOK.end),
        noUrut: nop.substring(NOP.POSITIONS.NO_URUT.start, NOP.POSITIONS.NO_URUT.end),
        kdJnsOp: nop.substring(NOP.POSITIONS.KD_JNS_OP.start, NOP.POSITIONS.KD_JNS_OP.end),
        thnPajakSppt: year.toString(),
      },
    });
    return results.length > 0 ? results[0] : null;
  }

  // ============================================================================
  // PAYMENT STATUS QUERIES
  // ============================================================================

  /**
   * Finds all paid SPPT records for a given year
   *
   * @param year - Tax year
   * @param kecamatan - Optional kecamatan filter
   * @returns Array of paid SPPT records
   *
   * @example
   * const paid = await spptRepo.findPaidByYear(2024, "720");
   */
  async findPaidByYear(year: number, kecamatan?: string): Promise<Sppt[]> {
    const query = this.createQueryBuilder("sppt").where("sppt.thnPajakSppt = :year", { year: year.toString() }).andWhere("sppt.statusPembayaranSppt = 1");

    if (kecamatan) {
      query.andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan });
    }

    return query.getMany();
  }

  /**
   * Finds all unpaid SPPT records for a given year
   *
   * @param year - Tax year
   * @param kecamatan - Optional kecamatan filter
   * @returns Array of unpaid SPPT records
   *
   * @example
   * const unpaid = await spptRepo.findUnpaidByYear(2024);
   */
  async findUnpaidByYear(year: number, kecamatan?: string): Promise<Sppt[]> {
    const query = this.createQueryBuilder("sppt").where("sppt.thnPajakSppt = :year", { year: year.toString() }).andWhere("(sppt.statusPembayaranSppt != 1 OR sppt.statusPembayaranSppt IS NULL)");

    if (kecamatan) {
      query.andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan });
    }

    return query.getMany();
  }

  /**
   * Finds unpaid SPPT records with pagination
   *
   * @param year - Tax year
   * @param pagination - Pagination options
   * @param filters - Additional filters
   * @returns Paginated unpaid records
   *
   * @example
   * const result = await spptRepo.findUnpaidPaginated(2024, { page: 1, limit: 20 });
   */
  async findUnpaidPaginated(year: number, pagination: PaginationOptions, filters?: Omit<SpptFilterOptions, "year" | "statusPembayaranSppt">): Promise<PaginatedResult<Sppt>> {
    const query = this.createQueryBuilder("sppt").where("sppt.thnPajakSppt = :year", { year: year.toString() }).andWhere("(sppt.statusPembayaranSppt != 1 OR sppt.statusPembayaranSppt IS NULL)");

    if (filters?.kecamatan) {
      query.andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan: filters.kecamatan });
    }

    if (filters?.kelurahan) {
      query.andWhere("sppt.kdKelurahan = :kelurahan", { kelurahan: filters.kelurahan });
    }

    if (filters?.nop) {
      query
        .andWhere("sppt.kdPropinsi = :kdPropinsi", { kdPropinsi: filters.nop.substring(NOP.POSITIONS.KD_PROV.start, NOP.POSITIONS.KD_PROV.end) })
        .andWhere("sppt.kdDati2 = :kdDati2", { kdDati2: filters.nop.substring(NOP.POSITIONS.KD_KAB.start, NOP.POSITIONS.KD_KAB.end) })
        .andWhere("sppt.kdKecamatan = :kdKecamatan", { kdKecamatan: filters.nop.substring(NOP.POSITIONS.KD_KEC.start, NOP.POSITIONS.KD_KEC.end) })
        .andWhere("sppt.kdKelurahan = :kdKelurahan", { kdKelurahan: filters.nop.substring(NOP.POSITIONS.KD_KEL.start, NOP.POSITIONS.KD_KEL.end) })
        .andWhere("sppt.kdBlok = :kdBlok", { kdBlok: filters.nop.substring(NOP.POSITIONS.KD_BLOK.start, NOP.POSITIONS.KD_BLOK.end) })
        .andWhere("sppt.noUrut = :noUrut", { noUrut: filters.nop.substring(NOP.POSITIONS.NO_URUT.start, NOP.POSITIONS.NO_URUT.end) })
        .andWhere("sppt.kdJnsOP = :kdJnsOP", { kdJnsOP: filters.nop.substring(NOP.POSITIONS.KD_JNS_OP.start, NOP.POSITIONS.KD_JNS_OP.end) });
    }

    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  // ============================================================================
  // AGGREGATION QUERIES
  // ============================================================================

  /**
   * Gets payment summary for a specific year
   *
   * @param year - Tax year
   * @param kecamatan - Optional kecamatan filter
   * @returns Payment summary with aggregated data
   *
   * @example
   * const summary = await spptRepo.getPaymentSummary(2024, "720");
   */
  async getPaymentSummary(year: number, kecamatan?: string): Promise<PaymentSummary | null> {
    let query = this.createQueryBuilder("sppt")
      .select("sppt.thnPajakSppt", "year")
      .addSelect("SUM(sppt.pbbYgHarusDibayarSppt)", "target")
      .addSelect("SUM(CASE WHEN sppt.statusPembayaranSppt = 1 THEN sppt.pbbYgHarusDibayarSppt ELSE 0 END)", "realization")
      .addSelect("COUNT(*)", "totalNop")
      .addSelect("COUNT(CASE WHEN sppt.statusPembayaranSppt = 1 THEN 1 END)", "paidNop")
      .addSelect("COUNT(CASE WHEN sppt.statusPembayaranSppt != 1 OR sppt.statusPembayaranSppt IS NULL THEN 1 END)", "unpaidNop")
      .where("sppt.thnPajakSppt = :year", { year: year.toString() });

    if (kecamatan && kecamatan !== "all") {
      query = query.andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan });
    }

    const rawResult = await query.groupBy("sppt.thnPajakSppt").getRawOne();

    if (!rawResult) {
      return null;
    }

    const target = parseFloat(rawResult.target || "0");
    const realization = parseFloat(rawResult.realization || "0");
    const collectionRate = target > 0 ? (realization / target) * 100 : 0;

    return {
      year: rawResult.year,
      target,
      realization,
      totalNop: parseInt(rawResult.totalNop || "0", 10),
      paidNop: parseInt(rawResult.paidNop || "0", 10),
      unpaidNop: parseInt(rawResult.unpaidNop || "0", 10),
      collectionRate: parseFloat(collectionRate.toFixed(2)),
    };
  }

  /**
   * Gets payment summary grouped by year
   *
   * @param kecamatan - Optional kecamatan filter
   * @returns Array of year summaries
   *
   * @example
   * const summaries = await spptRepo.getYearSummaries("720");
   */
  async getYearSummaries(kecamatan?: string): Promise<YearSummary[]> {
    /// query postgresql
    //   let query = this.createQueryBuilder("sppt")
    //     .select('sppt."THN_PAJAK_SPPT"', "year")
    //     .addSelect('SUM("sppt"."PBB_YG_HARUS_DIBAYAR_SPPT")', "target")
    //     .addSelect(
    //       `SUM(CASE WHEN "sppt"."STATUS_PEMBAYARAN_SPPT" = '1' 
    //     THEN "sppt"."PBB_YG_HARUS_DIBAYAR_SPPT" 
    //     ELSE '0' END)`,
    //       "realization"
    //     )
    //     .addSelect(`COUNT(CASE WHEN "sppt"."STATUS_PEMBAYARAN_SPPT" = '1' THEN '1' END)`, "paidCount")
    //     .addSelect(`COUNT(CASE WHEN "sppt"."STATUS_PEMBAYARAN_SPPT" <> '1' OR "sppt"."STATUS_PEMBAYARAN_SPPT" IS NULL THEN '1' END)`, "unpaidCount");

    //   if (kecamatan && kecamatan !== "all") {
    //     query = query.where('sppt."KD_KECAMATAN" = :kecamatan', { kecamatan });
    //   }

    //   return query.groupBy('sppt."THN_PAJAK_SPPT"').orderBy('sppt."THN_PAJAK_SPPT"', "ASC").getRawMany();
    // }

    /// query oracle
    let query = this.createQueryBuilder("sppt")
      .select('sppt.thnPajakSppt', "year")
      .addSelect('SUM(sppt.pbbYgHarusDibayarSppt)', "target")
      .addSelect(
        `SUM(CASE WHEN sppt.statusPembayaranSppt = 1 
      THEN sppt.pbbYgHarusDibayarSppt 
      ELSE 0 END)`,
        "realization"
      )
      .addSelect(`COUNT(CASE WHEN sppt.statusPembayaranSppt = 1 THEN 1 END)`, "paidCount")
      .addSelect(`COUNT(CASE WHEN sppt.statusPembayaranSppt <> 1 OR sppt.statusPembayaranSppt IS NULL THEN 1 END)`, "unpaidCount");

    if (kecamatan && kecamatan !== "all") {
      query = query.where('sppt.kdKecamatan = :kecamatan', { kecamatan });
    }

    return query.groupBy('sppt.thnPajakSppt').orderBy('sppt.thnPajakSppt', "ASC").getRawMany();
  }

  /**
   * Gets regional breakdown by kecamatan
   *
   * @param year - Tax year
   * @returns Array of regional summaries
   *
   * @example
   * const breakdown = await spptRepo.getRegionalBreakdown(2024);
   */
  async getRegionalBreakdown(year: number): Promise<RegionalSummary[]> {
    // const rawResults = await this.createQueryBuilder("sppt")
    //   .select("sppt.kdKecamatan", "kecamatan")
    //   .addSelect("SUM(sppt.pbbYgHarusDibayarSppt)", "target")
    //   .addSelect("SUM(CASE WHEN sppt.statusPembayaranSppt = '1' THEN sppt.pbbYgHarusDibayarSppt ELSE '0' END)", "realization")
    //   .addSelect("COUNT(*)", "totalNop")
    //   .addSelect("COUNT(CASE WHEN sppt.statusPembayaranSppt = '1' THEN '1' END)", "paidNop")
    //   .where("sppt.thnPajakSppt = :year", { year: year.toString() })
    //   .groupBy("sppt.kdKecamatan")
    //   .orderBy("sppt.kdKecamatan", "ASC")
    //   .getRawMany();

    const rawResults = await this.createQueryBuilder("sppt")
      .select("sppt.kdKecamatan", "kdKecamatan")
      .addSelect("rk.nmKecamatan", "kecamatan")
      .addSelect("SUM(sppt.pbbYgHarusDibayarSppt)", "target")
      .addSelect(
        `
      SUM(
        CASE 
          WHEN sppt.statusPembayaranSppt = '1' 
          THEN sppt.pbbYgHarusDibayarSppt 
          ELSE 0 
        END
      )
  `,
        "realization"
      )
      .addSelect("COUNT(*)", "totalNop")
      .addSelect(
        `
      COUNT(
        CASE 
          WHEN sppt.statusPembayaranSppt = '1' 
          THEN 1 
        END
      )
  `,
        "paidNop"
      )
      .innerJoin("REF_KECAMATAN", "rk", "rk.kdKecamatan = sppt.kdKecamatan")
      .where("sppt.thnPajakSppt = :year", { year: year.toString() })
      .groupBy("sppt.kdKecamatan")
      .addGroupBy("rk.nmKecamatan")
      .orderBy("sppt.kdKecamatan", "ASC")
      .getRawMany();

    return rawResults.map((row) => {
      const target = parseFloat(row.target || "0");
      const realization = parseFloat(row.realization || "0");
      const collectionRate = target > 0 ? (realization / target) * 100 : 0;

      return {
        kecamatan: row.kecamatan,
        target,
        realization,
        totalNop: parseInt(row.totalNop || "0", 10),
        paidNop: parseInt(row.paidNop || "0", 10),
        collectionRate: parseFloat(collectionRate.toFixed(2)),
      };
    });
  }

  /**
   * Gets kelurahan breakdown for a specific kecamatan
   *
   * @param year - Tax year
   * @param kecamatan - Kecamatan code
   * @returns Array of kelurahan summaries
   *
   * @example
   * const breakdown = await spptRepo.getKelurahanBreakdown(2024, "720");
   */
  async getKelurahanBreakdown(year: number, kecamatan: string): Promise<RegionalSummary[]> {
    // const rawResults = await this.createQueryBuilder("sppt")
    //   .select("sppt.kdKelurahan", "kelurahan")
    //   .addSelect("SUM(sppt.pbbYgHarusDibayarSppt)", "target")
    //   .addSelect("SUM(CASE WHEN sppt.statusPembayaranSppt = '1' THEN sppt.pbbYgHarusDibayarSppt ELSE '0' END)", "realization")
    //   .addSelect("COUNT(*)", "totalNop")
    //   .addSelect("COUNT(CASE WHEN sppt.statusPembayaranSppt = '1' THEN '1' END)", "paidNop")
    //   .where("sppt.thnPajakSppt = :year", { year: year.toString() })
    //   .andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan })
    //   .groupBy("sppt.kdKelurahan")
    //   .orderBy("sppt.kdKelurahan", "ASC")
    //   .getRawMany();

    /// query postgresql
    // const rawResults = await this.createQueryBuilder("sppt")
    // 1. SELECT dan Aggregation
    //   .select(`rk."NM_KELURAHAN"`, "kelurahan")
    //   .addSelect(`SUM(sppt."PBB_YG_HARUS_DIBAYAR_SPPT")`, "target")
    //   .addSelect(
    //     `SUM(
    //     CASE WHEN sppt."STATUS_PEMBAYARAN_SPPT" = '1'
    //          THEN sppt."PBB_YG_HARUS_DIBAYAR_SPPT"
    //          ELSE 0
    //     END
    //   )`,
    //     "realization"
    //   )
    //   .addSelect("COUNT(*)", "totalNop")
    //   .addSelect(
    //     `COUNT(
    //     CASE WHEN sppt."STATUS_PEMBAYARAN_SPPT" = '1'
    //          THEN 1 
    //          -- Mengganti '1' (string) menjadi 1 (numerik) untuk COUNT yang lebih aman
    //     END
    //   )`,
    //     "paidNop"
    //   )

    //   // 2. INNER JOIN (Sudah dikoreksi)
    //   .innerJoin("REF_KELURAHAN", "rk", `rk."KD_KECAMATAN" = sppt."KD_KECAMATAN" AND rk."KD_KELURAHAN" = sppt."KD_KELURAHAN"`)

    //   // 3. WHERE Tahun
    //   .where(`sppt."THN_PAJAK_SPPT" = :year`, { year: year.toString() })

    //   // 4. WHERE Kecamatan (Menggunakan Subquery)
    //   .andWhere(
    //     `
    //   sppt."KD_KECAMATAN" = (
    //     SELECT "KD_KECAMATAN"
    //     FROM "PBB_KUTAI-BARAT"."REF_KECAMATAN"
    //     WHERE "NM_KECAMATAN" = :kecamatan
    //     LIMIT 1
    //   )
    // `,
    //     { kecamatan }
    //   )

    //   // 5. GROUP BY dan ORDER BY
    //   .groupBy(`rk."NM_KELURAHAN"`)
    //   .orderBy(`rk."NM_KELURAHAN"`, "ASC")
    //   .getRawMany();

    //query oracle
    const rawResults = await this.createQueryBuilder("sppt")
      .select(`rk.nmKelurahan`, "kelurahan")
      .addSelect(`SUM(sppt.pbbYgHarusDibayarSppt)`, "target")
      .addSelect(
        `SUM(
        CASE WHEN sppt.statusPembayaranSppt = '1'
             THEN "sppt"."PBB_YG_HARUS_DIBAYAR_SPPT"
             ELSE 0
        END
      )`,
        "realization"
      )
      .addSelect("COUNT(*)", "totalNop")
      .addSelect(
        `COUNT(
        CASE WHEN sppt.statusPembayaranSppt = 1
             THEN 1 
             -- Mengganti '1' (string) menjadi 1 (numerik) untuk COUNT yang lebih aman
        END
      )`,
        "paidNop"
      )

      // 2. INNER JOIN (Sudah dikoreksi)
      .innerJoin("REF_KELURAHAN", "rk", `rk.kdKecamatan = sppt.kdKecamatan AND rk.kdKelurahan = sppt.kdKelurahan`)

      // 3. WHERE Tahun
      .where(`sppt.thnPajakSppt = :year`, { year: year.toString() })

      // 4. WHERE Kecamatan (Menggunakan Subquery)
      .andWhere(
        `
      sppt.kdKecamatan = (
        SELECT "KD_KECAMATAN"
        FROM ${process.env.DB_SCHEMA}."REF_KECAMATAN"
        WHERE "NM_KECAMATAN" = :kecamatan
        AND ROWNUM = 1
      )
    `,
        { kecamatan }
      )

      // 5. GROUP BY dan ORDER BY
      .groupBy(`rk.nmKelurahan`)
      .orderBy(`rk.nmKelurahan`, "ASC")
      .getRawMany();

    return rawResults.map((row) => {
      const target = parseFloat(row.target || "0");
      const realization = parseFloat(row.realization || "0");
      const collectionRate = target > 0 ? (realization / target) * 100 : 0;

      return {
        kelurahan: row.kelurahan,
        target,
        realization,
        totalNop: parseInt(row.totalNop || "0", 10),
        paidNop: parseInt(row.paidNop || "0", 10),
        collectionRate: parseFloat(collectionRate.toFixed(2)),
      };
    });
  }

  // ============================================================================
  // UTILITY QUERIES
  // ============================================================================

  /**
   * Gets all available tax years
   *
   * @returns Array of unique years
   *
   * @example
   * const years = await spptRepo.getAvailableYears();
   */
  async getAvailableYears(): Promise<string[]> {
    const results = await this.createQueryBuilder("sppt").select("DISTINCT sppt.thnPajakSppt", "year").orderBy("sppt.thnPajakSppt", "DESC").getRawMany();

    return results.map((row) => row.year);
  }

  /**
   * Counts total SPPT records for a year
   *
   * @param year - Tax year
   * @param filters - Optional filters
   * @returns Total count
   *
   * @example
   * const total = await spptRepo.countByYear(2024, { statusPembayaranSppt: 0 });
   */
  async countByYear(year: number, filters?: Partial<SpptFilterOptions>): Promise<number> {
    const query = this.createQueryBuilder("sppt").where("sppt.thnPajakSppt = :year", {
      year: year.toString(),
    });

    if (filters?.statusPembayaranSppt !== undefined) {
      if (filters.statusPembayaranSppt === null || filters.statusPembayaranSppt === 0) {
        query.andWhere("(sppt.statusPembayaranSppt != 1 OR sppt.statusPembayaranSppt IS NULL)");
      } else {
        query.andWhere("sppt.statusPembayaranSppt = :statusPembayaranSppt", { statusPembayaranSppt: filters.statusPembayaranSppt });
      }
    }

    if (filters?.kecamatan) {
      query.andWhere("sppt.kdKecamatan = :kecamatan", { kecamatan: filters.kecamatan });
    }

    if (filters?.kelurahan) {
      query.andWhere("sppt.kdKelurahan = :kelurahan", { kelurahan: filters.kelurahan });
    }

    return query.getCount();
  }

  /**
   * Finds SPPT records by taxpayer name (WP nama)
   *
   * @param name - Taxpayer name (partial match)
   * @param pagination - Pagination options
   * @returns Paginated results
   *
   * @example
   * const results = await spptRepo.findByTaxpayerName("Ahmad", { page: 1, limit: 10 });
   */
  async findByTaxpayerName(name: string, pagination: PaginationOptions): Promise<PaginatedResult<Sppt>> {
    /// query postgreSQL
    // const query = this.createQueryBuilder("sppt")
    //   .distinctOn([
    //     "sppt.kdPropinsi",
    //     "sppt.kdDati2",
    //     "sppt.kdKecamatan",
    //     "sppt.kdKelurahan",
    //     "sppt.kdBlok",
    //     "sppt.noUrut",
    //     "sppt.kdJnsOp"
    //   ])
    //   .where("LOWER(sppt.nmWpSppt) LIKE LOWER(:name)", {
    //     name: `%${name}%`,
    //   })
    //   .orderBy("sppt.kdPropinsi", "ASC")
    //   .addOrderBy("sppt.kdDati2", "ASC")
    //   .addOrderBy("sppt.kdKecamatan", "ASC")
    //   .addOrderBy("sppt.kdKelurahan", "ASC")
    //   .addOrderBy("sppt.kdBlok", "ASC")
    //   .addOrderBy("sppt.noUrut", "ASC")
    //   .addOrderBy("sppt.kdJnsOp", "ASC")
    //   .addOrderBy("sppt.thnPajakSppt", "DESC");

    // const { page, limit } = pagination;
    // const skip = (page - 1) * limit;

    // const data = await query.skip(skip).take(limit).getMany();

    /// query oracle
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const maxRow = page * limit;

    const data = await AppDataSource.query(`
        SELECT 
          KD_PROPINSI AS "kdPropinsi",
          KD_DATI2 AS "kdDati2",
          KD_KECAMATAN AS "kdKecamatan",
          KD_KELURAHAN AS "kdKelurahan",
          KD_BLOK AS "kdBlok",
          NO_URUT AS "noUrut",
          KD_JNS_OP AS "kdJnsOp",
          THN_PAJAK_SPPT AS "thnPajakSppt",
          NM_WP_SPPT AS "nmWpSppt",
          JLN_WP_SPPT AS "jlnWpSppt"
        FROM (
          SELECT 
            MAIN_SUB.*, 
            ROWNUM AS RNUM
          FROM (
            
            SELECT 
              SUB.KD_PROPINSI,
              SUB.KD_DATI2,
              SUB.KD_KECAMATAN,
              SUB.KD_KELURAHAN,
              SUB.KD_BLOK,
              SUB.NO_URUT,
              SUB.KD_JNS_OP,
              SUB.THN_PAJAK_SPPT,
              SUB.NM_WP_SPPT,
              SUB.JLN_WP_SPPT
            FROM (
              SELECT 
                SPPT.KD_PROPINSI,
                SPPT.KD_DATI2,
                SPPT.KD_KECAMATAN,
                SPPT.KD_KELURAHAN,
                SPPT.KD_BLOK,
                SPPT.NO_URUT,
                SPPT.KD_JNS_OP,
                SPPT.THN_PAJAK_SPPT,
                SPPT.NM_WP_SPPT,
                SPPT.JLN_WP_SPPT,
                ROW_NUMBER() OVER (
                  PARTITION BY 
                    SPPT.KD_PROPINSI,
                    SPPT.KD_DATI2,
                    SPPT.KD_KECAMATAN,
                    SPPT.KD_KELURAHAN,
                    SPPT.KD_BLOK,
                    SPPT.NO_URUT,
                    SPPT.KD_JNS_OP
                  ORDER BY 
                    SPPT.THN_PAJAK_SPPT DESC
                ) AS RN
              FROM ${process.env.DB_SCHEMA}.SPPT SPPT
              WHERE LOWER(SPPT.NM_WP_SPPT) LIKE LOWER(:1)
            ) SUB
            WHERE SUB.RN = 1
            ORDER BY 
              SUB.KD_PROPINSI ASC,
              SUB.KD_DATI2 ASC,
              SUB.KD_KECAMATAN ASC,
              SUB.KD_KELURAHAN ASC,
              SUB.KD_BLOK ASC,
              SUB.NO_URUT ASC,
              SUB.KD_JNS_OP ASC

          ) MAIN_SUB
          WHERE ROWNUM <= :2
        )
        WHERE RNUM > :3
      `, ['%' + name + '%', maxRow, skip])

    /// query postgreSQL
    // Query total
    // const total = await this.createQueryBuilder("sppt")
    //   .select(`
    //   COUNT(DISTINCT (
    //     CONCAT(
    //     "sppt"."KD_PROPINSI",
    //     "sppt"."KD_DATI2",
    //     "sppt"."KD_KECAMATAN",
    //     "sppt"."KD_KELURAHAN",
    //     "sppt"."KD_BLOK",
    //     "sppt"."NO_URUT",
    //     "sppt"."KD_JNS_OP"
    //     )
    //   ))
    // `, "count")
    //   .where("sppt.nmWpSppt LIKE UPPER(:name)", {
    //     name: `%${name}%`,
    //   })
    //   .getRawOne()
    //   .then(res => Number(res.count));

    /// query oracle
    const total = await AppDataSource.query(`
        SELECT COUNT(*) AS COUNT
          FROM (
              SELECT DISTINCT
                  KD_PROPINSI,
                  KD_DATI2,
                  KD_KECAMATAN,
                  KD_KELURAHAN,
                  KD_BLOK,
                  NO_URUT,
                  KD_JNS_OP,
                  THN_PAJAK_SPPT,
                  NM_WP_SPPT
              FROM ${process.env.DB_SCHEMA}.SPPT
              WHERE LOWER(NM_WP_SPPT) LIKE LOWER(:1)
          )
      `, ['%' + name + '%'])

    const totalPages = Math.ceil(total[0].COUNT / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Lightweight taxpayer-name lookup for the AI Copilot.
   *
   * Returns up to `limit` DISTINCT NOPs (latest tax year per NOP) whose
   * nmWpSppt matches `name`. Unlike findByTaxpayerName this runs a SINGLE
   * scan — it deliberately omits the expensive `COUNT(DISTINCT ...)` second
   * query, which roughly doubled latency (the /api/ai/taxpayer endpoint was
   * ~23s and timed out the AI service's per-fetch budget). The caller infers
   * "truncated" from whether `limit` rows came back.
   *
   * @param name  Partial taxpayer name (LIKE %name%)
   * @param limit Max distinct NOPs to return
   */
  async findTaxpayerNops(name: string, limit: number): Promise<Sppt[]> {
    // return this.createQueryBuilder("sppt")
    //   .distinctOn([
    //     "sppt.kdPropinsi",
    //     "sppt.kdDati2",
    //     "sppt.kdKecamatan",
    //     "sppt.kdKelurahan",
    //     "sppt.kdBlok",
    //     "sppt.noUrut",
    //     "sppt.kdJnsOp",
    //   ])
    //   .where("LOWER(sppt.nmWpSppt) LIKE LOWER(:name)", { name: `%${name}%` })
    //   .orderBy("sppt.kdPropinsi", "ASC")
    //   .addOrderBy("sppt.kdDati2", "ASC")
    //   .addOrderBy("sppt.kdKecamatan", "ASC")
    //   .addOrderBy("sppt.kdKelurahan", "ASC")
    //   .addOrderBy("sppt.kdBlok", "ASC")
    //   .addOrderBy("sppt.noUrut", "ASC")
    //   .addOrderBy("sppt.kdJnsOp", "ASC")
    //   .addOrderBy("sppt.thnPajakSppt", "DESC")
    //   .limit(limit)
    //   .getMany();
    return this.query(`
      SELECT
          KD_PROPINSI      AS "kdPropinsi",
          KD_DATI2         AS "kdDati2",
          KD_KECAMATAN     AS "kdKecamatan",
          KD_KELURAHAN     AS "kdKelurahan",
          KD_BLOK          AS "kdBlok",
          NO_URUT          AS "noUrut",
          KD_JNS_OP        AS "kdJnsOp",
          THN_PAJAK_SPPT   AS "thnPajakSppt",
          NM_WP_SPPT       AS "nmWpSppt",
          JLN_WP_SPPT      AS "jlnWpSppt",
          PBB_YG_HARUS_DIBAYAR_SPPT AS "pbbYgHarusDibayarSppt",
          STATUS_PEMBAYARAN_SPPT AS "statusPembayaranSppt",
          NJOP_SPPT AS "njopSppt"
      FROM (
          SELECT
              S.*,
              ROW_NUMBER() OVER (
                  PARTITION BY
                      KD_PROPINSI,
                      KD_DATI2,
                      KD_KECAMATAN,
                      KD_KELURAHAN,
                      KD_BLOK,
                      NO_URUT,
                      KD_JNS_OP
                  ORDER BY THN_PAJAK_SPPT DESC
              ) RN
          FROM ${process.env.DB_SCHEMA}.SPPT S
          WHERE LOWER(S.NM_WP_SPPT) LIKE LOWER(:1)
      )
      WHERE RN = 1
      AND ROWNUM <= :2
      ORDER BY
          KD_PROPINSI,
          KD_DATI2,
          KD_KECAMATAN,
          KD_KELURAHAN,
          KD_BLOK,
          NO_URUT,
          KD_JNS_OP
      `,
      [
        `%${name}%`,
        limit,
      ])
  }

  /**
   * Gets last paid year for each NOP
   * Used for overdue analysis to determine when each property last made a payment
   *
   * @param filters - Optional regional filters
   * @returns Array of { nop, lastPaidYear } objects
   *
   * @example
   * const lastPayments = await spptRepo.getLastPaymentsByNOP({ kecamatan: "720" });
   */
  async getLastPaymentsByNOP(filters?: { kecamatan?: string; kelurahan?: string }): Promise<Array<{ nop: string; lastPaidYear: string | null }>> {
    // String untuk menggabungkan semua segmen NOP
    const fullNopSelect = `
    CONCAT(
      sppt."KD_PROPINSI",
      sppt."KD_DATI2",
      sppt."KD_KECAMATAN",
      sppt."KD_KELURAHAN",
      sppt."KD_BLOK",
      sppt."NO_URUT",
      sppt."KD_JNS_OP"
    )
  `;

    // Daftar semua kolom NOP untuk keperluan GROUP BY
    const nopColumns = ['sppt."KD_PROPINSI"', 'sppt."KD_DATI2"', 'sppt."KD_KECAMATAN"', 'sppt."KD_KELURAHAN"', 'sppt."KD_BLOK"', 'sppt."NO_URUT"', 'sppt."KD_JNS_OP"'];
    let query = this.createQueryBuilder("sppt")
      .select(fullNopSelect, "nop")
      .addSelect(
        `MAX(
        CASE 
          WHEN sppt."STATUS_PEMBAYARAN_SPPT" = '1'
          THEN sppt."THN_PAJAK_SPPT"
          ELSE NULL
        END
      )`,
        "lastPaidYear"
      )
      .where(`sppt."STATUS_PEMBAYARAN_SPPT" = '1'`);

    if (filters?.kecamatan && filters.kecamatan !== "all") {
      query = query.andWhere(`sppt."KD_KECAMATAN" = :kecamatan`, { kecamatan: filters.kecamatan });
    }

    if (filters?.kelurahan && filters.kelurahan !== "all") {
      query = query.andWhere(`sppt."KD_KELURAHAN" = :kelurahan`, { kelurahan: filters.kelurahan });
    }

    return query.groupBy(nopColumns.join(", ")).getRawMany();
  }

  /**
   * Gets overdue records with last payment information using optimized JOIN query
   * Eliminates N+1 query problem by fetching all data in a single query
   *
   * @param filters - Optional filters for year, kecamatan, kelurahan
   * @returns Array of overdue records with last payment year
   *
   * @example
   * const overdueRecords = await spptRepo.getOverdueRecordsOptimized({ year: "2024", kecamatan: "720" });
   *
   * @performance
   * Before: 3 queries + O(n²) processing
   * After: 1 query + O(n) processing
   * Speed improvement: ~80-90% for large datasets
   */

  async getOverdueRecordsOptimized(filters?: { year?: string; kecamatan?: string; kelurahan?: string }): Promise<
    Array<{
      nop: string;
      nmWpSppt: string;
      kdKecamatan: string;
      kdKelurahan: string;
      opAlamat: string;
      thnPajakSppt: string;
      tglJatuhTempoSppt: Date;
      pbbYgHarusDibayarSppt: number;
      pbbTerhutangSppt: number;
      lastPaidYear: string | null;
    }>
  > {
    // --- DEFINISI KONSTAN UNTUK NOP GABUNGAN ---
    // String untuk menggabungkan semua segmen NOP
    const fullNopExpression = (alias: string): string => {
      // <-- GUNAKAN SINTAKS FUNGSI PANAH
      /// query postgresql
      // return `CONCAT(${alias}.kdPropinsi, ${alias}.kdDati2, ${alias}.kdKecamatan, ${alias}.kdKelurahan, ${alias}.kdBlok, ${alias}.noUrut, ${alias}.kdJnsOp)`;
      /// query oracle
      return `${alias}."KD_PROPINSI" || ${alias}."KD_DATI2" || ${alias}."KD_KECAMATAN" || ${alias}."KD_KELURAHAN" || ${alias}."KD_BLOK" || ${alias}."NO_URUT" || ${alias}."KD_JNS_OP"`;
    };

    // --- MAIN QUERY ---
    const spptNop = fullNopExpression("SPPT"); // NOP gabungan dari tabel utama

    let query = this.createQueryBuilder("SPPT")
      .select([
        // SELECT: Mengganti sppt.nop dengan CONCAT
        `${spptNop} AS "nop"`,
        `SPPT."NM_WP_SPPT" AS "nmWpSppt"`,
        `SPPT."KD_KECAMATAN" AS "kdKecamatan"`,
        `SPPT."KD_KELURAHAN" AS "kdKelurahan"`,
        `SPPT."THN_PAJAK_SPPT" AS "thnPajakSppt"`,
        `SPPT."TGL_JATUH_TEMPO_SPPT" AS "tglJatuhTempoSppt"`,
        `SPPT."PBB_YG_HARUS_DIBAYAR_SPPT" AS "pbbYgHarusDibayarSppt"`,
        `SPPT."PBB_TERHUTANG_SPPT" AS "pbbTerhutangSppt"`,
        // lastPaidYear diset NULL karena kita menggunakan logika NOT EXISTS
        `NULL AS "lastPaidYear"`,
      ])
      .where(`(SPPT."STATUS_PEMBAYARAN_SPPT" != 1 OR SPPT."STATUS_PEMBAYARAN_SPPT" IS NULL)`)
      .andWhere(`SPPT."TGL_JATUH_TEMPO_SPPT" IS NOT NULL`)
      .andWhere(`SPPT."TGL_JATUH_TEMPO_SPPT" < CURRENT_DATE`)
      // Menggunakan NOT EXISTS Correlated Subquery untuk kinerja tinggi pada Regional
      // Memeriksa bahwa tidak ada record pembayaran yang tahunnya >= dari record tunggakan ini
      .andWhere(`NOT EXISTS (
        SELECT 1 FROM "${process.env.DB_SCHEMA}"."SPPT" paid
        WHERE paid."STATUS_PEMBAYARAN_SPPT" = 1
          AND paid."KD_PROPINSI" = SPPT."KD_PROPINSI"
          AND paid."KD_DATI2" = SPPT."KD_DATI2"
          AND paid."KD_KECAMATAN" = SPPT."KD_KECAMATAN"
          AND paid."KD_KELURAHAN" = SPPT."KD_KELURAHAN"
          AND paid."KD_BLOK" = SPPT."KD_BLOK"
          AND paid."NO_URUT" = SPPT."NO_URUT"
          AND paid."KD_JNS_OP" = SPPT."KD_JNS_OP"
          AND paid."THN_PAJAK_SPPT" >= SPPT."THN_PAJAK_SPPT"
      )`);

    // Apply filters (Tetap sama karena menggunakan kdKecamatan/kdKelurahan)
    if (filters?.year && filters.year !== "all") {
      query = query.andWhere(`SPPT."THN_PAJAK_SPPT" = :year`, { year: filters.year });
    }

    if (filters?.kecamatan && filters.kecamatan !== "all") {
      query = query.andWhere(`SPPT."KD_KECAMATAN" = :kecamatan`, { kecamatan: filters.kecamatan });
    }

    if (filters?.kelurahan && filters.kelurahan !== "all") {
      query = query.andWhere(`SPPT."KD_KELURAHAN" = :kelurahan`, { kelurahan: filters.kelurahan });
    }

    return query.getRawMany();
  }

  /**
   * Gets a single-pass aggregated breakdown of SPPT records grouped by a chosen
   * NON-geographic OR geographic dimension. This is what lets the AI Copilot
   * answer object-level analytics ("distribusi tunggakan per kelas tanah",
   * "collection rate per bracket NJOP") instead of only kecamatan/kelurahan.
   *
   * All dimensions here live directly on the SPPT row, so no fan-out joins are
   * needed and SUM/COUNT stay correct (one SPPT row = one NOP per tax year).
   *
   * @param params.basis     "payment" (per-year, status-based) or "overdue"
   *                          (cumulative arrears, same predicate as
   *                          getOverdueRecordsOptimized).
   * @param params.groupBy   land_class | njop_bracket | area_bracket | kelurahan
   * @param params.year      tax year (required for "payment"; optional filter for
   *                          "overdue", "all" = every year)
   * @param params.kecamatan KD_KECAMATAN code (already resolved), optional
   * @returns Raw aggregated rows (numbers come back as strings from PG).
   */
  async getAnalyticsBreakdown(params: {
    basis: "payment" | "overdue";
    groupBy: "land_class" | "njop_bracket" | "area_bracket" | "kelurahan";
    year?: string;
    kecamatan?: string;
  }): Promise<any[]> {
    const { basis, groupBy, year, kecamatan } = params;

    let dimExpr: string;
    let needKelJoin = false;
    switch (groupBy) {
      case "land_class":
        dimExpr = `COALESCE(SPPT."KD_KLS_TANAH", 'TANPA_KELAS')`;
        break;
      case "njop_bracket":
        dimExpr = `CASE
          WHEN SPPT."NJOP_SPPT" IS NULL THEN 'Tidak diketahui'
          WHEN SPPT."NJOP_SPPT" < 50000000 THEN '< 50 jt'
          WHEN SPPT."NJOP_SPPT" < 100000000 THEN '50-100 jt'
          WHEN SPPT."NJOP_SPPT" < 250000000 THEN '100-250 jt'
          WHEN SPPT."NJOP_SPPT" < 500000000 THEN '250-500 jt'
          WHEN SPPT."NJOP_SPPT" < 1000000000 THEN '500 jt - 1 M'
          ELSE '> 1 M'
        END`;
        break;
      case "area_bracket":
        dimExpr = `CASE
          WHEN SPPT."LUAS_BUMI_SPPT" IS NULL THEN 'Tidak diketahui'
          WHEN SPPT."LUAS_BUMI_SPPT" < 100 THEN '< 100 m2'
          WHEN SPPT."LUAS_BUMI_SPPT" < 250 THEN '100-250 m2'
          WHEN SPPT."LUAS_BUMI_SPPT" < 500 THEN '250-500 m2'
          WHEN SPPT."LUAS_BUMI_SPPT" < 1000 THEN '500-1.000 m2'
          WHEN SPPT."LUAS_BUMI_SPPT" < 5000 THEN '1.000-5.000 m2'
          ELSE '> 5.000 m2'
        END`;
        break;
      case "kelurahan":
      default:
        dimExpr = `rk."NM_KELURAHAN"`;
        needKelJoin = true;
        break;
    }

    let qb = this.createQueryBuilder("SPPT")
      .select(dimExpr, "groupLabel")
      .addSelect("COUNT(*)", "totalNop")
      .addSelect(`SUM(COALESCE(SPPT."PBB_YG_HARUS_DIBAYAR_SPPT", 0))`, "totalDue")
      .addSelect(`SUM(COALESCE(SPPT."NJOP_SPPT", 0))`, "njopTotal");

    if (basis === "payment") {
      qb = qb
        .addSelect(`COUNT(CASE WHEN SPPT."STATUS_PEMBAYARAN_SPPT" = '1' THEN 1 END)`, "paidNop")
        .addSelect(
          `SUM(CASE WHEN SPPT."STATUS_PEMBAYARAN_SPPT" = '1' THEN COALESCE(SPPT."PBB_YG_HARUS_DIBAYAR_SPPT", 0) ELSE 0 END)`,
          "realization"
        );
    }

    if (needKelJoin) {
      qb = qb.innerJoin(
        "REF_KELURAHAN",
        "rk",
        `rk."KD_KECAMATAN" = SPPT."KD_KECAMATAN" AND rk."KD_KELURAHAN" = SPPT."KD_KELURAHAN"`
      );
    }

    if (basis === "overdue") {
      qb = qb
        .where(`(SPPT."STATUS_PEMBAYARAN_SPPT" != '1' OR SPPT."STATUS_PEMBAYARAN_SPPT" IS NULL)`)
        .andWhere(`SPPT."TGL_JATUH_TEMPO_SPPT" IS NOT NULL`)
        .andWhere(`SPPT."TGL_JATUH_TEMPO_SPPT" < CURRENT_DATE`)
        .andWhere(`NOT EXISTS (
          SELECT 1 FROM "${process.env.DB_SCHEMA}"."SPPT" paid
          WHERE paid."STATUS_PEMBAYARAN_SPPT" = '1'
            AND paid."KD_PROPINSI" = SPPT."KD_PROPINSI"
            AND paid."KD_DATI2" = SPPT."KD_DATI2"
            AND paid."KD_KECAMATAN" = SPPT."KD_KECAMATAN"
            AND paid."KD_KELURAHAN" = SPPT."KD_KELURAHAN"
            AND paid."KD_BLOK" = SPPT."KD_BLOK"
            AND paid."NO_URUT" = SPPT."NO_URUT"
            AND paid."KD_JNS_OP" = SPPT."KD_JNS_OP"
            AND paid."THN_PAJAK_SPPT" >= SPPT."THN_PAJAK_SPPT"
        )`);
      if (year && year !== "all") {
        qb = qb.andWhere(`SPPT."THN_PAJAK_SPPT" = :year`, { year });
      }
    } else {
      qb = qb.where(`SPPT."THN_PAJAK_SPPT" = :year`, { year: year as string });
    }

    if (kecamatan && kecamatan !== "all") {
      qb = qb.andWhere(`SPPT."KD_KECAMATAN" = :kecamatan`, { kecamatan });
    }

    qb = qb.groupBy(dimExpr);

    return qb.getRawMany();
  }
}
