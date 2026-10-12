import { Column, Entity } from "typeorm";

@Entity("DAT_OP_BANGUNAN", { schema: "PBB_KUTAI-BARAT" })
export class DatOpBangunan {
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

  @Column("numeric", { primary: true, name: "NO_BNG", precision: 3, scale: 0 })
  noBng!: string;

  @Column("character", { name: "KD_JPB", nullable: true, length: 2 })
  kdJpb!: string | null;

  @Column("character", {
    name: "NO_FORMULIR_LSPOP",
    nullable: true,
    length: 11,
  })
  noFormulirLspop!: string | null;

  @Column("character", { name: "THN_DIBANGUN_BNG", nullable: true, length: 4 })
  thnDibangunBng!: string | null;

  @Column("character", { name: "THN_RENOVASI_BNG", nullable: true, length: 4 })
  thnRenovasiBng!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBng!: string | null;

  @Column("numeric", {
    name: "JML_LANTAI_BNG",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  jmlLantaiBng!: string | null;

  @Column("character", { name: "KONDISI_BNG", nullable: true, length: 1 })
  kondisiBng!: string | null;

  @Column("character", {
    name: "JNS_KONSTRUKSI_BNG",
    nullable: true,
    length: 1,
  })
  jnsKonstruksiBng!: string | null;

  @Column("character", { name: "JNS_ATAP_BNG", nullable: true, length: 1 })
  jnsAtapBng!: string | null;

  @Column("character", { name: "KD_DINDING", nullable: true, length: 1 })
  kdDinding!: string | null;

  @Column("character", { name: "KD_LANTAI", nullable: true, length: 1 })
  kdLantai!: string | null;

  @Column("character", { name: "KD_LANGIT_LANGIT", nullable: true, length: 1 })
  kdLangitLangit!: string | null;

  @Column("numeric", {
    name: "NILAI_SISTEM_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiSistemBng!: string | null;

  @Column("character", { name: "JNS_TRANSAKSI_BNG", nullable: true, length: 1 })
  jnsTransaksiBng!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENDATAAN_BNG",
    nullable: true,
  })
  tglPendataanBng!: Date | null;

  @Column("character", { name: "NIP_PENDATA_BNG", nullable: true, length: 30 })
  nipPendataBng!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMERIKSAAN_BNG",
    nullable: true,
  })
  tglPemeriksaanBng!: Date | null;

  @Column("character", {
    name: "NIP_PEMERIKSA_BNG",
    nullable: true,
    length: 30,
  })
  nipPemeriksaBng!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEREKAMAN_BNG",
    nullable: true,
  })
  tglPerekamanBng!: Date | null;

  @Column("character", { name: "NIP_PEREKAM_BNG", nullable: true, length: 30 })
  nipPerekamBng!: string | null;
}
