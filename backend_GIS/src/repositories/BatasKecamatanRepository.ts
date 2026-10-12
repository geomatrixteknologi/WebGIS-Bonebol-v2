import { AppDataSource } from "../data-resource";
import { BatasKecamatan } from "../entity/entities/BatasKecamatan";
import { BaseRepository } from "./BaseRepository";

/**
 * Repository for BatasKecamatan entity
 * Handles kecamatan boundary data with PostGIS geometry operations
 */
export class BatasKecamatanRepository extends BaseRepository<BatasKecamatan> {
  constructor() {
    super(AppDataSource.getRepository(BatasKecamatan));
  }

  /**
   * Get all kecamatan boundaries with GeoJSON geometry
   * Converts PostGIS geometry to GeoJSON format for frontend mapping
   *
   * @returns Array of kecamatan boundaries with GeoJSON geometry
   */
  async findAllWithGeometry(): Promise<any[]> {
    const query = `
      SELECT
        "KD_PROV",
        "KD_KAB",
        "KD_KEC",
        "NM_KEC",
        ST_AsGeoJSON(ST_Transform(geom, 4326)) as geometry
      FROM "GIS_BONEBOL".batas_kecamatan
      WHERE geom IS NOT NULL
      ORDER BY "NM_KEC" ASC
    `;

    const results = await this.repository.query(query);

    return results.map((row: any) => ({
      type: "Feature",
      properties: {
        KD_PROV: row.KD_PROV,
        KD_KAB: row.KD_KAB,
        KD_KEC: row.KD_KEC,
        NM_KEC: row.NM_KEC,
      },
      geometry: row.geometry ? JSON.parse(row.geometry) : null,
    }));
  }

  /**
   * Get kecamatan boundary by kecamatan code
   *
   * @param kdKec - Kecamatan code
   * @returns Kecamatan boundary with GeoJSON geometry
   */
  async findByKecamatanCode(kdKec: string): Promise<any | null> {
    const query = `
      SELECT
        "KD_PROV",
        "KD_KAB",
        "KD_KEC",
        "NM_KEC",
        ST_AsGeoJSON(ST_Transform(geom, 4326)) as geometry
      FROM "GIS_BONEBOL".batas_kecamatan
      WHERE "KD_KEC" = $1
      AND geom IS NOT NULL
      LIMIT 1
    `;

    const results = await this.repository.query(query, [kdKec]);

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
        NM_KEC: row.NM_KEC,
      },
      geometry: row.geometry ? JSON.parse(row.geometry) : null,
    };
  }

  /**
   * Delete all kecamatan boundaries
   * Used before uploading new kecamatan boundary data
   *
   * @returns Number of deleted records
   */
  async deleteAll(): Promise<number> {
    const result = await this.repository.createQueryBuilder().delete().execute();

    return result.affected || 0;
  }
}
