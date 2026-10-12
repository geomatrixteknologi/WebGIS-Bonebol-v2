import { Column, Entity } from "typeorm";

@Entity("PEMBETULAN_SPPTSKPSTP", { schema: "PBB_KUTAI-BARAT" })
export class PembetulanSpptskpstp {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 2,
  })
  kdTempatPelayanan!: string | null;

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

  @Column("character", { name: "THN_PEMBETULAN", nullable: true, length: 4 })
  thnPembetulan!: string | null;

  @Column("character", { name: "JNS_SK", nullable: true, length: 1 })
  jnsSk!: string | null;

  @Column("character", { name: "NO_SK", nullable: true, length: 100 })
  noSk!: string | null;

  @Column("character varying", {
    name: "PBL_NAMA_WP",
    nullable: true,
    length: 30,
  })
  pblNamaWp!: string | null;

  @Column("character varying", {
    name: "PBL_JALAN_WP",
    nullable: true,
    length: 30,
  })
  pblJalanWp!: string | null;

  @Column("character varying", {
    name: "PBL_BLOK_KAV_NO_WP",
    nullable: true,
    length: 15,
  })
  pblBlokKavNoWp!: string | null;

  @Column("numeric", {
    name: "PBL_LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  pblLuasBumi!: string | null;

  @Column("numeric", {
    name: "PBL_LUAS_BNG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  pblLuasBng!: string | null;

  @Column("numeric", {
    name: "PBL_NJOP_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pblNjopBumi!: string | null;

  @Column("numeric", {
    name: "PBL_NJOP_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pblNjopBng!: string | null;

  @Column("numeric", {
    name: "PBL_PBB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pblPbb!: string | null;

  @Column("character", { name: "PBL_STATUS", nullable: true, length: 1 })
  pblStatus!: string | null;

  @Column("character", {
    name: "JNS_SURAT_YG_DIBETULKAN",
    nullable: true,
    length: 2,
  })
  jnsSuratYgDibetulkan!: string | null;

  @Column("character varying", {
    name: "NO_SURAT_YG_DIBETULKAN",
    nullable: true,
    length: 30,
  })
  noSuratYgDibetulkan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_SURAT_YG_DIBETULKAN",
    nullable: true,
  })
  tglSuratYgDibetulkan!: Date | null;
}
