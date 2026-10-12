import { AppDataSource } from "../data-resource";
import { BatasKelurahan } from "../entity/entities/BatasKelurahan";
import { BaseRepository } from "./BaseRepository";

/**
 * Repository for BatasKelurahan entity
 * Handles kelurahan boundary data with PostGIS geometry operations
 */
export class BatasKelurahanRepository extends BaseRepository<BatasKelurahan> {
  constructor() {
    super(AppDataSource.getRepository(BatasKelurahan));
  }

  /**
   * Get all kelurahan boundaries with GeoJSON geometry
   * Converts PostGIS geometry to GeoJSON format for frontend mapping
   *
   * @returns Array of kelurahan boundaries with GeoJSON geometry
   */
  async findAllWithGeometry(): Promise<any[]> {
    const query = `
      SELECT
        "KD_PROV",
        "KD_KAB",
        "KD_KEC",
        "KD_KEL",
        "NM_KEL",
        ST_AsGeoJSON(geom) as geometry
      FROM "GIS_BONEBOL".batas_kelurahan
      WHERE geom IS NOT NULL
      ORDER BY "NM_KEL" ASC
    `;

    const results = await this.repository.query(query);

    return results.map((row: any) => ({
      type: "Feature",
      properties: {
        KD_PROV: row.KD_PROV,
        KD_KAB: row.KD_KAB,
        KD_KEC: row.KD_KEC,
        KD_KEL: row.KD_KEL,
        NM_KEL: row.NM_KEL,
      },
      geometry: row.geometry ? JSON.parse(row.geometry) : null,
    }));
  }

  /**
   * Get kelurahan boundary by kelurahan code
   *
   * @param kdKel - Kelurahan code
   * @returns Kelurahan boundary with GeoJSON geometry
   */
  async findByKelurahanCode(kdKel: string): Promise<any | null> {
    const query = `
      SELECT
        "KD_PROV",
        "KD_KAB",
        "KD_KEC",
        "KD_KEL",
        "NM_KEL",
        ST_AsGeoJSON(geom) as geometry
      FROM "GIS_BONEBOL".batas_kelurahan
      WHERE "KD_KEL" = $1
      AND geom IS NOT NULL
      LIMIT 1
    `;

    const results = await this.repository.query(query, [kdKel]);

    if (results.length === 0) {
      return null;
    }

    const row = results[0];
    return {
      type: "Feature",
      properties: {
        KD_PROV: row.KD_PROV,
        KD_KAB: row.KD_KAB,
        KD_KEC: row.KD_KEC,
        KD_KEL: row.KD_KEL,
        NM_KEL: row.NM_KEL,
      },
      geometry: row.geometry ? JSON.parse(row.geometry) : null,
    };
  }

  /**
   * Get kelurahan boundaries by kecamatan code
   *
   * @param kdKec - Kecamatan code
   * @returns Array of kelurahan boundaries in the kecamatan
   */
  async findByKecamatanCode(kdKec: string): Promise<any[]> {
    const query = `
      SELECT
        "KD_PROV",
        "KD_KAB",
        "KD_KEC",
        "KD_KEL",
        "NM_KEL",
        ST_AsGeoJSON(geom) as geometry
      FROM "GIS_BONEBOL".batas_kelurahan
      WHERE "KD_KEC" = $1
      AND geom IS NOT NULL
      ORDER BY "NM_KEL" ASC
    `;

    const results = await this.repository.query(query, [kdKec]);

    return results.map((row: any) => ({
      type: "Feature",
      properties: {
        KD_PROV: row.KD_PROV,
        KD_KAB: row.KD_KAB,
        KD_KEC: row.KD_KEC,
        KD_KEL: row.KD_KEL,
        NM_KEL: row.NM_KEL,
      },
      geometry: row.geometry ? JSON.parse(row.geometry) : null,
    }));
  }

  /**
   * Delete all kelurahan boundaries by kecamatan code
   *
   * @param kdKec - Kecamatan code
   * @returns Number of deleted records
   */
  async deleteByKecamatanCode(kdKec: string): Promise<number> {
    const result = await this.repository.createQueryBuilder().delete().where("KD_KEC = :kdKec", { kdKec }).execute();

    return result.affected || 0;
  }
}
