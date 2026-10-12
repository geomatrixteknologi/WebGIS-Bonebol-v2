import { Column, Entity } from "typeorm";

@Entity("PENERIMA_KOMPENSASI", { schema: "PBB_KUTAI-BARAT" })
export class PenerimaKompensasi {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { name: "THN_PELAYANAN", length: 4 })
  thnPelayanan!: string;

  @Column("character", { name: "BUNDEL_PELAYANAN", length: 4 })
  bundelPelayanan!: string;

  @Column("character", { name: "NO_URUT_PELAYANAN", length: 3 })
  noUrutPelayanan!: string;

  @Column("character", { name: "KD_PROPINSI_PEMOHON", length: 2 })
  kdPropinsiPemohon!: string;

  @Column("character", { name: "KD_DATI2_PEMOHON", length: 2 })
  kdDati2Pemohon!: string;

  @Column("character", { name: "KD_KECAMATAN_PEMOHON", length: 3 })
  kdKecamatanPemohon!: string;

  @Column("character", { name: "KD_KELURAHAN_PEMOHON", length: 3 })
  kdKelurahanPemohon!: string;

  @Column("character", { name: "KD_BLOK_PEMOHON", length: 3 })
  kdBlokPemohon!: string;

  @Column("character", { name: "NO_URUT_PEMOHON", length: 4 })
  noUrutPemohon!: string;

  @Column("character", { name: "KD_JNS_OP_PEMOHON", length: 1 })
  kdJnsOpPemohon!: string;

  @Column("numeric", {
    name: "NO_URUT_PENERIMA_KOMPENSASI",
    precision: 1,
    scale: 0,
  })
  noUrutPenerimaKompensasi!: string;

  @Column("character", {
    name: "KD_PROPINSI_KOMPENSASI",
    nullable: true,
    length: 2,
  })
  kdPropinsiKompensasi!: string | null;

  @Column("character", {
    name: "KD_DATI2_KOMPENSASI",
    nullable: true,
    length: 2,
  })
  kdDati2Kompensasi!: string | null;

  @Column("character", {
    name: "KD_KECAMATAN_KOMPENSASI",
    nullable: true,
    length: 3,
  })
  kdKecamatanKompensasi!: string | null;

  @Column("character", {
    name: "KD_KELURAHAN_KOMPENSASI",
    nullable: true,
    length: 3,
  })
  kdKelurahanKompensasi!: string | null;

  @Column("character", {
    name: "KD_BLOK_KOMPENSASI",
    nullable: true,
    length: 3,
  })
  kdBlokKompensasi!: string | null;

  @Column("character", {
    name: "NO_URUT_KOMPENSASI",
    nullable: true,
    length: 4,
  })
  noUrutKompensasi!: string | null;

  @Column("character", {
    name: "KD_JNS_OP_KOMPENSASI",
    nullable: true,
    length: 1,
  })
  kdJnsOpKompensasi!: string | null;

  @Column("character", {
    name: "THN_PAJAK_KOMPENSASI",
    nullable: true,
    length: 4,
  })
  thnPajakKompensasi!: string | null;

  @Column("numeric", {
    name: "NILAI_YANG_DIKOMPENSASI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  nilaiYangDikompensasi!: string | null;
}
