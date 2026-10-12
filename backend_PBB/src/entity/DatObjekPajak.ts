import { Column, Entity } from "typeorm";

@Entity("DAT_OBJEK_PAJAK", { schema: "PBB_KUTAI-BARAT" })
export class DatObjekPajak {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character", { name: "SUBJEK_PAJAK_ID", length: 30 })
  subjekPajakId!: string;

  @Column("character", { name: "NO_FORMULIR_SPOP", nullable: true, length: 11 })
  noFormulirSpop!: string | null;

  @Column("character varying", { name: "NO_PERSIL", nullable: true, length: 5 })
  noPersil!: string | null;

  @Column("character varying", { name: "JALAN_OP", nullable: true, length: 30 })
  jalanOp!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_OP",
    nullable: true,
    length: 15,
  })
  blokKavNoOp!: string | null;

  @Column("character", { name: "RW_OP", nullable: true, length: 3 })
  rwOp!: string | null;

  @Column("character", { name: "RT_OP", nullable: true, length: 3 })
  rtOp!: string | null;

  @Column("numeric", {
    name: "KD_STATUS_CABANG",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  kdStatusCabang!: string | null;

  @Column("character", { name: "KD_STATUS_WP", nullable: true, length: 1 })
  kdStatusWp!: string | null;

  @Column("numeric", {
    name: "TOTAL_LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  totalLuasBumi!: string | null;

  @Column("numeric", {
    name: "TOTAL_LUAS_BNG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  totalLuasBng!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumi!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBng!: string | null;

  @Column("numeric", {
    name: "STATUS_PETA_OP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusPetaOp!: string | null;

  @Column("character", { name: "JNS_TRANSAKSI_OP", nullable: true, length: 1 })
  jnsTransaksiOp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENDATAAN_OP",
    nullable: true,
  })
  tglPendataanOp!: Date | null;

  @Column("character", { name: "NIP_PENDATA", nullable: true, length: 30 })
  nipPendata!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMERIKSAAN_OP",
    nullable: true,
  })
  tglPemeriksaanOp!: Date | null;

  @Column("character", { name: "NIP_PEMERIKSA_OP", nullable: true, length: 30 })
  nipPemeriksaOp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEREKAMAN_OP",
    nullable: true,
  })
  tglPerekamanOp!: Date | null;

  @Column("character", { name: "NIP_PEREKAM_OP", nullable: true, length: 30 })
  nipPerekamOp!: string | null;

  @Column("character", { name: "STATUS_HAPUS", nullable: true, length: 1 })
  statusHapus!: string | null;

  @Column("character", { name: "KELAPA_SAWIT", nullable: true, length: 1 })
  kelapaSawit!: string | null;
}
