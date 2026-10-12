import { Column, Entity, Index } from "typeorm";

@Index(
  "TEMP_DATA_OP_PK",
  ["bundelPelayanan", "kdBlokPemohon", "kdDati2Pemohon", "kdJnsOpPemohon", "kdKantor", "kdKanwil", "kdKecamatanPemohon", "kdKelurahanPemohon", "kdPropinsiPemohon", "noUrutPelayanan", "noUrutPemohon", "tempJnsData", "thnPelayanan"],
  { unique: true }
)
@Entity("TEMP_DATA_OP", { schema: "PBB_KUTAI-BARAT" })
export class TempDataOp {
  @Column("character", { primary: true, name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { primary: true, name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 2,
  })
  kdTempatPelayanan!: string | null;

  @Column("character", { primary: true, name: "THN_PELAYANAN", length: 4 })
  thnPelayanan!: string;

  @Column("character", { primary: true, name: "BUNDEL_PELAYANAN", length: 4 })
  bundelPelayanan!: string;

  @Column("character", { primary: true, name: "NO_URUT_PELAYANAN", length: 3 })
  noUrutPelayanan!: string;

  @Column("character", {
    primary: true,
    name: "KD_PROPINSI_PEMOHON",
    length: 2,
  })
  kdPropinsiPemohon!: string;

  @Column("character", { primary: true, name: "KD_DATI2_PEMOHON", length: 2 })
  kdDati2Pemohon!: string;

  @Column("character", {
    primary: true,
    name: "KD_KECAMATAN_PEMOHON",
    length: 3,
  })
  kdKecamatanPemohon!: string;

  @Column("character", {
    primary: true,
    name: "KD_KELURAHAN_PEMOHON",
    length: 3,
  })
  kdKelurahanPemohon!: string;

  @Column("character", { primary: true, name: "KD_BLOK_PEMOHON", length: 3 })
  kdBlokPemohon!: string;

  @Column("character", { primary: true, name: "NO_URUT_PEMOHON", length: 4 })
  noUrutPemohon!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP_PEMOHON", length: 1 })
  kdJnsOpPemohon!: string;

  @Column("character", { primary: true, name: "TEMP_JNS_DATA", length: 1 })
  tempJnsData!: string;

  @Column("numeric", {
    name: "TEMP_SIKLUS_SPPT",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  tempSiklusSppt!: string | null;

  @Column("character varying", {
    name: "TEMP_NM_WP",
    nullable: true,
    length: 30,
  })
  tempNmWp!: string | null;

  @Column("character varying", {
    name: "TEMP_JALAN_OP",
    nullable: true,
    length: 30,
  })
  tempJalanOp!: string | null;

  @Column("character varying", {
    name: "TEMP_BLOK_KAV_NO_OP",
    nullable: true,
    length: 15,
  })
  tempBlokKavNoOp!: string | null;

  @Column("character", { name: "TEMP_RW_OP", nullable: true, length: 3 })
  tempRwOp!: string | null;

  @Column("character", { name: "TEMP_RT_OP", nullable: true, length: 3 })
  tempRtOp!: string | null;

  @Column("character varying", {
    name: "TEMP_JALAN_WP",
    nullable: true,
    length: 30,
  })
  tempJalanWp!: string | null;

  @Column("character varying", {
    name: "TEMP_BLOK_KAV_NO_WP",
    nullable: true,
    length: 15,
  })
  tempBlokKavNoWp!: string | null;

  @Column("character", { name: "TEMP_RW_WP", nullable: true, length: 3 })
  tempRwWp!: string | null;

  @Column("character", { name: "TEMP_RT_WP", nullable: true, length: 3 })
  tempRtWp!: string | null;

  @Column("character varying", {
    name: "TEMP_KELURAHAN_WP",
    nullable: true,
    length: 30,
  })
  tempKelurahanWp!: string | null;

  @Column("character varying", {
    name: "TEMP_KOTA_WP",
    nullable: true,
    length: 30,
  })
  tempKotaWp!: string | null;

  @Column("character varying", {
    name: "TEMP_KD_POS_WP",
    nullable: true,
    length: 5,
  })
  tempKdPosWp!: string | null;

  @Column("character varying", {
    name: "TEMP_NPWP",
    nullable: true,
    length: 15,
  })
  tempNpwp!: string | null;

  @Column("character varying", {
    name: "TEMP_SUBJEK_PAJAK_ID",
    nullable: true,
    length: 30,
  })
  tempSubjekPajakId!: string | null;

  @Column("character", { name: "KD_KLS_TANAH", nullable: true, length: 3 })
  kdKlsTanah!: string | null;

  @Column("character", {
    name: "THN_AWAL_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  thnAwalKlsTanah!: string | null;

  @Column("character", { name: "KD_KLS_BNG", nullable: true, length: 3 })
  kdKlsBng!: string | null;

  @Column("character", { name: "THN_AWAL_KLS_BNG", nullable: true, length: 4 })
  thnAwalKlsBng!: string | null;

  @Column("numeric", {
    name: "TEMP_LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  tempLuasBumi!: string | null;

  @Column("numeric", {
    name: "TEMP_LUAS_BANGUNAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  tempLuasBangunan!: string | null;

  @Column("numeric", {
    name: "TEMP_NJOP_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  tempNjopBumi!: string | null;

  @Column("numeric", {
    name: "TEMP_NJOP_BANGUNAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  tempNjopBangunan!: string | null;

  @Column("numeric", {
    name: "TEMP_NJOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  tempNjop!: string | null;

  @Column("numeric", {
    name: "TEMP_NJOPTKP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  tempNjoptkp!: string | null;

  @Column("numeric", {
    name: "TEMP_PBB_TERHUTANG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  tempPbbTerhutang!: string | null;

  @Column("numeric", {
    name: "TEMP_BESAR_DENDA",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  tempBesarDenda!: string | null;

  @Column("numeric", {
    name: "TEMP_FAKTOR_PENGURANG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  tempFaktorPengurang!: string | null;

  @Column("numeric", {
    name: "TEMP_PBB_YG_HARUS_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  tempPbbYgHarusDibayar!: string | null;

  @Column("timestamp without time zone", {
    name: "TEMP_TGL_JATUH_TEMPO",
    nullable: true,
  })
  tempTglJatuhTempo!: Date | null;

  @Column("numeric", {
    name: "TEMP_NJKP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tempNjkp!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
