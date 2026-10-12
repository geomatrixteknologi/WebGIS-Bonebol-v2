import { AppDataSource } from "../data-source";
import { BaseRepository } from "./BaseRepository";
import { RefKecamatan } from "../entity_prod/RefKecamatan";
import { RefKelurahan } from "../entity_prod/RefKelurahan";

export class RefWilayahRepository extends BaseRepository<any> {
  private kecRepository = AppDataSource.getRepository(RefKecamatan);
  private kelRepository = AppDataSource.getRepository(RefKelurahan);

  constructor() {
    // BaseRepository but repository not directly used here
    super(AppDataSource.getRepository(RefKecamatan));
  }

  /**
   * Cari kecamatan berdasarkan nama menggunakan ILIKE
   */
  async findKecamatanByName(namaKecamatan: string) {
    return this.kecRepository
      .createQueryBuilder("kec")
      .select(["kec.kdKecamatan AS kdKecamatan", "kec.kdPropinsi AS kdPropinsi", "kec.kdDati2 AS kdDati2"])
      // postgresql
      // .where("kec.nmKecamatan ILIKE :name", { name: `%${namaKecamatan}%` })
      // oracle
      .where("kec.nmKecamatan LIKE :name", { name: `%${namaKecamatan}%` })
      .getRawOne();
  }

  /**
   * Ambil daftar kelurahan berdasarkan kode kecamatan
   */
  async findKelurahanByKdKecamatan(kdKecamatan: string) {
    return this.kelRepository.createQueryBuilder("kel").select("kel.nmKelurahan", "nm_kelurahan").where("kel.kdKecamatan = :kdKecamatan", { kdKecamatan }).orderBy("kel.nmKelurahan", "ASC").getRawMany();
  }

  /**
   * Map kode kelurahan -> nama, untuk satu kecamatan. Dipakai endpoint AI
   * /ai/overdue/kelurahan untuk menerjemahkan hasil agregasi (yang dikelompokkan
   * per KD_KELURAHAN) menjadi nama desa yang dapat dibaca.
   */
  async findKelurahanCodeNameByKdKecamatan(
    kdKecamatan: string
  ): Promise<Array<{ kdKelurahan: string; nmKelurahan: string }>> {
    return this.kelRepository
      .createQueryBuilder("kel")
      .select(["kel.kdKelurahan AS kdKelurahan", "kel.nmKelurahan AS nmKelurahan"])
      .where("kel.kdKecamatan = :kdKecamatan", { kdKecamatan })
      .getRawMany();
  }

  async findKdKelurahan(kdKecamatan: string, namaKelurahan: string) {
    return this.kelRepository
      .createQueryBuilder("kel")
      .select(["kel.kdKelurahan AS kdKelurahan", "kel.kdKecamatan AS kdKecamatan", "kel.kdPropinsi AS kdPropinsi", "kel.kdDati2 AS kdDati2"])
      .where("kel.kdKecamatan = :kdKecamatan", { kdKecamatan })
      // postgresql
      // .andWhere("kel.nmKelurahan ILIKE :nmKelurahan", { nmKelurahan: namaKelurahan })
      // oracle
      .andWhere("kel.nmKelurahan LIKE :nmKelurahan", { nmKelurahan: namaKelurahan })
      .getRawOne();
  }

  /**
   * Fallback: cari kelurahan by name across all kecamatan. Used when
   * the AI Copilot only knows the kelurahan name (not its kecamatan).
   */
  async findKelurahanByName(namaKelurahan: string) {
    return this.kelRepository
      .createQueryBuilder("kel")
      .select([
        "kel.kdKelurahan AS kdKelurahan",
        "kel.kdKecamatan AS kdKecamatan",
        "kel.kdPropinsi AS kdPropinsi",
        "kel.kdDati2 AS kdDati2",
      ])
      .where("kel.nmKelurahan ILIKE :nmKelurahan", { nmKelurahan: `%${namaKelurahan}%` })
      .getRawOne();
  }
}
