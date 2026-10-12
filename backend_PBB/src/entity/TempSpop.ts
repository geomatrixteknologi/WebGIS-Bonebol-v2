import { Column, Entity } from "typeorm";

@Entity("TEMP_SPOP", { schema: "PBB_KUTAI-BARAT" })
export class TempSpop {
  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT_BUNDEL", length: 3 })
  noUrutBundel!: string;

  @Column("character", { name: "TOKEN", length: 6 })
  token!: string;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", { name: "KD_BLOK", nullable: true, length: 3 })
  kdBlok!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 4 })
  noUrut!: string | null;

  @Column("character", { name: "KD_JNS_OP", nullable: true, length: 1 })
  kdJnsOp!: string | null;

  @Column("character", { name: "KD_PROPINSI_ASAL", nullable: true, length: 2 })
  kdPropinsiAsal!: string | null;

  @Column("character", { name: "KD_DATI2_ASAL", nullable: true, length: 2 })
  kdDati2Asal!: string | null;

  @Column("character", { name: "KD_KECAMATAN_ASAL", nullable: true, length: 3 })
  kdKecamatanAsal!: string | null;

  @Column("character", { name: "KD_KELURAHAN_ASAL", nullable: true, length: 3 })
  kdKelurahanAsal!: string | null;

  @Column("character", { name: "KD_BLOK_ASAL", nullable: true, length: 3 })
  kdBlokAsal!: string | null;

  @Column("character", { name: "NO_URUT_ASAL", nullable: true, length: 4 })
  noUrutAsal!: string | null;

  @Column("character", { name: "KD_JNS_OP_ASAL", nullable: true, length: 1 })
  kdJnsOpAsal!: string | null;

  @Column("character", {
    name: "KD_PROPINSI_BERSAMA",
    nullable: true,
    length: 2,
  })
  kdPropinsiBersama!: string | null;

  @Column("character", { name: "KD_DATI2_BERSAMA", nullable: true, length: 2 })
  kdDati2Bersama!: string | null;

  @Column("character", {
    name: "KD_KECAMATAN_BERSAMA",
    nullable: true,
    length: 3,
  })
  kdKecamatanBersama!: string | null;

  @Column("character", {
    name: "KD_KELURAHAN_BERSAMA",
    nullable: true,
    length: 3,
  })
  kdKelurahanBersama!: string | null;

  @Column("character", { name: "KD_BLOK_BERSAMA", nullable: true, length: 3 })
  kdBlokBersama!: string | null;

  @Column("character", { name: "NO_URUT_BERSAMA", nullable: true, length: 4 })
  noUrutBersama!: string | null;

  @Column("character", { name: "KD_JNS_OP_BERSAMA", nullable: true, length: 1 })
  kdJnsOpBersama!: string | null;

  @Column("character varying", {
    name: "NM_JLN_OP",
    nullable: true,
    length: 50,
  })
  nmJlnOp!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_OP",
    nullable: true,
    length: 15,
  })
  blokKavNoOp!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_OP",
    nullable: true,
    length: 30,
  })
  kelurahanOp!: string | null;

  @Column("character varying", { name: "RW_OP", length: 3 })
  rwOp!: string;

  @Column("character varying", { name: "RT_OP", nullable: true, length: 3 })
  rtOp!: string | null;

  @Column("character", { name: "STATUS_WP", nullable: true, length: 1 })
  statusWp!: string | null;

  @Column("character", { name: "PEKERJAAN_WP", nullable: true, length: 1 })
  pekerjaanWp!: string | null;

  @Column("character varying", { name: "NM_WP", nullable: true, length: 100 })
  nmWp!: string | null;

  @Column("character varying", {
    name: "NM_JLN_WP",
    nullable: true,
    length: 50,
  })
  nmJlnWp!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_WP",
    nullable: true,
    length: 30,
  })
  kelurahanWp!: string | null;

  @Column("character varying", { name: "RW_WP", length: 3 })
  rwWp!: string;

  @Column("character varying", { name: "RT_WP", nullable: true, length: 3 })
  rtWp!: string | null;

  @Column("character varying", {
    name: "DATI2_KODE_POS",
    nullable: true,
    length: 5,
  })
  dati2KodePos!: string | null;

  @Column("character varying", { name: "NO_KTP", nullable: true, length: 30 })
  noKtp!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  luasBumi!: string | null;

  @Column("character", { name: "JNS_TANAH", nullable: true, length: 1 })
  jnsTanah!: string | null;

  @Column("numeric", {
    name: "JML_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlBng!: string | null;

  @Column("character", { name: "KD_ZNT", nullable: true, length: 2 })
  kdZnt!: string | null;
}
