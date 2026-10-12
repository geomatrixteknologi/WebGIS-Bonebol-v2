import { RefWilayahRepository } from "../repositories/RefWilayahRepository";

export class WilayahService {
  private wilRepo = new RefWilayahRepository();

  /**
   * Ambil list kelurahan berdasarkan nama kecamatan
   */
  async getKelurahanListByKecamatan(namaKecamatan: string) {
    if (!namaKecamatan || namaKecamatan.trim() === "") {
      throw new Error("Nama kecamatan wajib diisi");
    }

    // 1️⃣ Cari kode kecamatan
    const kec = await this.wilRepo.findKecamatanByName(namaKecamatan);

    if (!kec) {
      throw new Error("Kecamatan tidak ditemukan");
    }

    // 2️⃣ Ambil kelurahan berdasarkan kd_kecamatan
    /// query postgresql
    // const kelurahanRows = await this.wilRepo.findKelurahanByKdKecamatan(kec.kdkecamatan);
    /// query oracle
    const kelurahanRows = await this.wilRepo.findKelurahanByKdKecamatan(kec.KDKECAMATAN);

    const list = kelurahanRows.map((row) => row.nm_kelurahan);

    return list;
  }
}
