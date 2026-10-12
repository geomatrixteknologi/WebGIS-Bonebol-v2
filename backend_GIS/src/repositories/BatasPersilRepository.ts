import { AppDataSource } from "../data-resource";
import { BatasPersil } from "../entity/entities/BatasPersil";
import { BaseRepository, PaginationOptions, PaginatedResult } from "./BaseRepository";

/**
 * BatasPersilRepository
 *
 * Repository for BatasPersil (Parcel Boundary) entities.
 * Provides parcel-specific database operations.
 *
 * Common Query Patterns:
 * - Find by NOP (Nomor Objek Pajak)
 * - Find by region (kecamatan/kelurahan)
 * - Find by block (blok)
 * - Geospatial queries for map display
 *
 * @extends BaseRepository<BatasPersil>
 *
 *  Refactoring
 * @version 1.0.0
 */

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * Parcel filter options
 */
export interface PersilFilterOptions {
  kdProv?: string;
  kdKab?: string;
  kdKec?: string;
  kdKel?: string;
  kdBlok?: string;
  nop?: string;
}

/**
 * NOP parts for structured queries
 */
export interface NOPParts {
  KD_PROV: string;
  KD_KAB: string;
  KD_KEC: string;
  KD_KEL: string;
  KD_BLOK: string;
  NO_URUT: string;
  KD_JNS_OP: string;
}

// ============================================================================
// BATAS PERSIL REPOSITORY
// ============================================================================

export class BatasPersilRepository extends BaseRepository<BatasPersil> {
  constructor() {
    super(AppDataSource.getRepository(BatasPersil));
  }

  // ============================================================================
  // NOP-BASED QUERIES
  // ============================================================================

  /**
   * Finds a parcel by complete NOP
   *
   * @param nop - Complete 18-digit NOP
   * @returns BatasPersil record or null
   *
   * @example
   * const persil = await persilRepo.findByNOP("527172001001001000");
   */
  async findByNOP(nop: string): Promise<BatasPersil | null> {
    if (nop.length !== 18) {
      throw new Error(`Invalid NOP length: expected 18 digits, got ${nop.length}`);
    }

    // const nopParts = this.parseNOP(nop);
    // return this.findOne({
    //   where: nopParts,
    // });
    const result = await AppDataSource.query(
      `SELECT 
        ST_AsGeoJSON(ST_Transform(geom, 4326))::json as geom,
        "KD_PROV", "KD_KAB", "KD_KEC", "KD_KEL",
        "KD_BLOK", "NO_URUT", "KD_JNS_OP", "FOTO_PERSIL"
       FROM "GIS_BONEBOL".batas_persil
       WHERE "KD_PROV" = $1 AND "KD_KAB" = $2 AND "KD_KEC" = $3
         AND "KD_KEL" = $4 AND "KD_BLOK" = $5 AND "NO_URUT" = $6
         AND "KD_JNS_OP" = $7`,
      [nop.substring(0, 2), nop.substring(2, 4), nop.substring(4, 7), nop.substring(7, 10), nop.substring(10, 13), nop.substring(13, 17), nop.substring(17, 18)],
    );

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  /**
   * Finds parcels by NOP parts
   *
   * @param nopParts - Partial NOP components
   * @returns Array of BatasPersil records
   *
   * @example
   * const parcels = await persilRepo.findByNOPParts({
   *   KD_PROV: "52",
   *   KD_KAB: "71",
   *   KD_KEC: "720"
   * });
   */
  async findByNOPParts(nopParts: Partial<NOPParts>): Promise<BatasPersil[]> {
    return this.findAll({
      where: nopParts as any,
    });
  }

  // ============================================================================
  // REGIONAL QUERIES
  // ============================================================================

  /**
   * Finds all parcels in a kelurahan
   *
   * @param kdKec - Kecamatan code
   * @param kdKel - Kelurahan code
   * @param pagination - Optional pagination
   * @returns Parcels or paginated result
   *
   * @example
   * const parcels = await persilRepo.findByKelurahan("720", "001");
   */
  async findByKelurahan(kdKec: string, kdKel: string, pagination?: PaginationOptions): Promise<BatasPersil[] | PaginatedResult<BatasPersil>> {
    const options = {
      where: {
        KD_KEC: kdKec,
        KD_KEL: kdKel,
      },
    };

    if (pagination) {
      return this.findPaginated(options, pagination);
    }

    return this.findAll(options);
  }

  /**
   * Finds all parcels in a kecamatan
   *
   * @param kdKec - Kecamatan code
   * @param pagination - Optional pagination
   * @returns Parcels or paginated result
   *
   * @example
   * const parcels = await persilRepo.findByKecamatan("720", { page: 1, limit: 50 });
   */
  async findByKecamatan(kdKec: string, pagination?: PaginationOptions): Promise<BatasPersil[] | PaginatedResult<BatasPersil>> {
    const options = {
      where: {
        KD_KEC: kdKec,
      },
    };

    if (pagination) {
      return this.findPaginated(options, pagination);
    }

    return this.findAll(options);
  }

  /**
   * Finds all parcels in a block
   *
   * @param kdKec - Kecamatan code
   * @param kdKel - Kelurahan code
   * @param kdBlok - Block code
   * @returns Array of parcels
   *
   * @example
   * const parcels = await persilRepo.findByBlok("720", "001", "001");
   */
  async findByBlok(kdKec: string, kdKel: string, kdBlok: string): Promise<BatasPersil[]> {
    return this.findAll({
      where: {
        KD_KEC: kdKec,
        KD_KEL: kdKel,
        KD_BLOK: kdBlok,
      },
    });
  }

  // ============================================================================
  // GEOSPATIAL QUERIES
  // ============================================================================

  /**
   * Finds parcels with geometry for map display
   *
   * @param filters - Region filters
   * @returns Array of parcels with geometry
   *
   * @example
   * const parcels = await persilRepo.findWithGeometry({
   *   kdKec: "720",
   *   kdKel: "001"
   * });
   */
  async findWithGeometry(filters: PersilFilterOptions): Promise<BatasPersil[]> {
    const query = this.createQueryBuilder("persil").where("persil.geom IS NOT NULL");

    if (filters.kdProv) {
      query.andWhere("persil.KD_PROV = :kdProv", { kdProv: filters.kdProv });
    }

    if (filters.kdKab) {
      query.andWhere("persil.KD_KAB = :kdKab", { kdKab: filters.kdKab });
    }

    if (filters.kdKec) {
      query.andWhere("persil.KD_KEC = :kdKec", { kdKec: filters.kdKec });
    }

    if (filters.kdKel) {
      query.andWhere("persil.KD_KEL = :kdKel", { kdKel: filters.kdKel });
    }

    if (filters.kdBlok) {
      query.andWhere("persil.KD_BLOK = :kdBlok", { kdBlok: filters.kdBlok });
    }

    if (filters.nop) {
      const nopParts = this.parseNOP(filters.nop);
      query.andWhere("persil.KD_PROV = :kdProv", { kdProv: nopParts.KD_PROV });
      query.andWhere("persil.KD_KAB = :kdKab", { kdKab: nopParts.KD_KAB });
      query.andWhere("persil.KD_KEC = :kdKec", { kdKec: nopParts.KD_KEC });
      query.andWhere("persil.KD_KEL = :kdKel", { kdKel: nopParts.KD_KEL });
      query.andWhere("persil.KD_BLOK = :kdBlok", { kdBlok: nopParts.KD_BLOK });
      query.andWhere("persil.NO_URUT = :noUrut", { noUrut: nopParts.NO_URUT });
      query.andWhere("persil.KD_JNS_OP = :kdJnsOp", { kdJnsOp: nopParts.KD_JNS_OP });
    }

    return query.getMany();
  }

  /**
   * Counts parcels by region
   *
   * @param kdKec - Kecamatan code
   * @param kdKel - Optional kelurahan code
   * @returns Count of parcels
   *
   * @example
   * const count = await persilRepo.countByRegion("720", "001");
   */
  async countByRegion(kdKec: string, kdKel?: string): Promise<number> {
    const where: any = {
      KD_KEC: kdKec,
    };

    if (kdKel) {
      where.KD_KEL = kdKel;
    }

    return this.count({ where });
  }

  /**
   * Checks if a parcel exists by NOP
   *
   * @param nop - Complete NOP
   * @returns True if exists
   *
   * @example
   * const exists = await persilRepo.existsByNOP("527172001001001000");
   */
  async existsByNOP(nop: string): Promise<boolean> {
    if (nop.length !== 18) {
      return false;
    }

    const nopParts = this.parseNOP(nop);
    return this.exists(nopParts as any);
  }

  // ============================================================================
  // BULK OPERATIONS
  // ============================================================================

  /**
   * Deletes all parcels in a kelurahan
   *
   * @param kdKec - Kecamatan code
   * @param kdKel - Kelurahan code
   * @returns Number of deleted records
   *
   * @example
   * const deleted = await persilRepo.deleteByKelurahan("720", "001");
   */
  async deleteByKelurahan(kdKec: string, kdKel: string): Promise<number> {
    return this.deleteWhere({
      KD_KEC: kdKec,
      KD_KEL: kdKel,
    } as any);
  }

  /**
   * Bulk inserts parcels
   *
   * @param parcels - Array of parcel data
   * @returns Array of created parcels
   *
   * @example
   * const created = await persilRepo.bulkInsert(parcelsData);
   */
  async bulkInsert(parcels: Partial<BatasPersil>[]): Promise<BatasPersil[]> {
    return this.createMany(parcels as any);
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Parses a complete NOP into its component parts
   *
   * @param nop - 18-digit NOP
   * @returns NOP parts object
   *
   * @example
   * const parts = persilRepo.parseNOP("527172001001001000");
   * // { KD_PROV: "52", KD_KAB: "71", ... }
   */
  private parseNOP(nop: string): NOPParts {
    if (nop.length !== 18) {
      throw new Error(`Invalid NOP length: expected 18 digits, got ${nop.length}`);
    }

    return {
      KD_PROV: nop.substring(0, 2),
      KD_KAB: nop.substring(2, 4),
      KD_KEC: nop.substring(4, 7),
      KD_KEL: nop.substring(7, 10),
      KD_BLOK: nop.substring(10, 13),
      NO_URUT: nop.substring(13, 17),
      KD_JNS_OP: nop.substring(17, 18),
    };
  }

  /**
   * Gets distinct kecamatan codes
   *
   * @returns Array of kecamatan codes
   *
   * @example
   * const kecamatans = await persilRepo.getDistinctKecamatans();
   */
  async getDistinctKecamatans(): Promise<string[]> {
    const results = await this.createQueryBuilder("persil").select("DISTINCT persil.KD_KEC", "kdKec").where("persil.KD_KEC IS NOT NULL").orderBy("persil.KD_KEC", "ASC").getRawMany();

    return results.map((r) => r.kdKec);
  }

  /**
   * Gets distinct kelurahan codes for a kecamatan
   *
   * @param kdKec - Kecamatan code
   * @returns Array of kelurahan codes
   *
   * @example
   * const kelurahans = await persilRepo.getDistinctKelurahans("720");
   */
  async getDistinctKelurahans(kdKec: string): Promise<string[]> {
    const results = await this.createQueryBuilder("persil").select("DISTINCT persil.KD_KEL", "kdKel").where("persil.KD_KEC = :kdKec", { kdKec }).andWhere("persil.KD_KEL IS NOT NULL").orderBy("persil.KD_KEL", "ASC").getRawMany();

    return results.map((r) => r.kdKel);
  }
}
