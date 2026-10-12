import { Column, Entity } from "typeorm";

@Entity("TEMP_LSPOP", { schema: "PBB_KUTAI-BARAT" })
export class TempLspop {
  @Column("character", { name: "THN_BUNDEL", nullable: true, length: 4 })
  thnBundel!: string | null;

  @Column("character", { name: "NO_BUNDEL", nullable: true, length: 4 })
  noBundel!: string | null;

  @Column("character", { name: "NO_URUT_BUNDEL", nullable: true, length: 3 })
  noUrutBundel!: string | null;

  @Column("character", { name: "TOKEN", nullable: true, length: 6 })
  token!: string | null;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("numeric", {
    name: "RD_NO_BANGUNAN",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  rdNoBangunan!: string | null;

  @Column("numeric", {
    name: "RD_LUAS_BANGUNAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  rdLuasBangunan!: string | null;

  @Column("character", { name: "RD_KONSTRUKSI", nullable: true, length: 1 })
  rdKonstruksi!: string | null;

  @Column("character", { name: "RD_JENIS_BANGUNAN", nullable: true, length: 2 })
  rdJenisBangunan!: string | null;

  @Column("numeric", {
    name: "RD_JUMLAH_LANTAI",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  rdJumlahLantai!: string | null;

  @Column("character", { name: "RD_TAHUN_DIBANGUN", nullable: true, length: 4 })
  rdTahunDibangun!: string | null;

  @Column("character", { name: "RD_TAHUN_RENOVASI", nullable: true, length: 4 })
  rdTahunRenovasi!: string | null;

  @Column("character", {
    name: "RD_KONDISI_BANGUNAN",
    nullable: true,
    length: 1,
  })
  rdKondisiBangunan!: string | null;

  @Column("character", { name: "RD_ATAP", nullable: true, length: 1 })
  rdAtap!: string | null;

  @Column("character", { name: "RD_DINDING", nullable: true, length: 1 })
  rdDinding!: string | null;

  @Column("character", { name: "RD_LANGIT2", nullable: true, length: 1 })
  rdLangit2!: string | null;

  @Column("numeric", {
    name: "F_LISTRIK_DAYA",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  fListrikDaya!: string | null;

  @Column("character", { name: "F_LISTRIK_SPLIT", nullable: true, length: 3 })
  fListrikSplit!: string | null;

  @Column("character", { name: "F_LISTRIK_WINDOW", nullable: true, length: 1 })
  fListrikWindow!: string | null;

  @Column("character", { name: "F_AC_CENTRAL", nullable: true, length: 1 })
  fAcCentral!: string | null;

  @Column("numeric", {
    name: "F_KOLAM_RENANG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  fKolamRenang!: string | null;

  @Column("character", { name: "F_KOLAM_FINISHING", nullable: true, length: 1 })
  fKolamFinishing!: string | null;

  @Column("character", { name: "F_HALAMAN_RINGAN", nullable: true, length: 1 })
  fHalamanRingan!: string | null;

  @Column("character", { name: "F_HALAMAN_BERAT", nullable: true, length: 1 })
  fHalamanBerat!: string | null;

  @Column("character", { name: "F_HALAMAN_SEDANG", nullable: true, length: 1 })
  fHalamanSedang!: string | null;

  @Column("character", {
    name: "F_HALAMAN_PENUTUP_LANTAI",
    nullable: true,
    length: 1,
  })
  fHalamanPenutupLantai!: string | null;

  @Column("character", {
    name: "F_TENIS_BETON_PLUS",
    nullable: true,
    length: 1,
  })
  fTenisBetonPlus!: string | null;

  @Column("character", {
    name: "F_TENIS_BETON_MINUS",
    nullable: true,
    length: 1,
  })
  fTenisBetonMinus!: string | null;

  @Column("character", {
    name: "F_TENIS_ASPAL_PLUS",
    nullable: true,
    length: 1,
  })
  fTenisAspalPlus!: string | null;

  @Column("character", {
    name: "F_TENIS_ASPAL_MINUS",
    nullable: true,
    length: 1,
  })
  fTenisAspalMinus!: string | null;

  @Column("character", {
    name: "F_TENIS_RUMPUT_PLUS",
    nullable: true,
    length: 1,
  })
  fTenisRumputPlus!: string | null;

  @Column("character", {
    name: "F_TENIS_RUMPUT_MINUS",
    nullable: true,
    length: 1,
  })
  fTenisRumputMinus!: string | null;

  @Column("character", { name: "F_LIFT_PENUMPANG", nullable: true, length: 1 })
  fLiftPenumpang!: string | null;

  @Column("character", { name: "F_LIFT_KAPSUL", nullable: true, length: 1 })
  fLiftKapsul!: string | null;

  @Column("character", { name: "F_LIFT_BARANG", nullable: true, length: 1 })
  fLiftBarang!: string | null;

  @Column("character", {
    name: "F_TANGGA_BERJALAN_KECIL",
    nullable: true,
    length: 1,
  })
  fTanggaBerjalanKecil!: string | null;

  @Column("character", {
    name: "F_TANGGA_BERJALAN_BESAR",
    nullable: true,
    length: 1,
  })
  fTanggaBerjalanBesar!: string | null;

  @Column("numeric", {
    name: "F_PAGAR_PANJANG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  fPagarPanjang!: string | null;

  @Column("character", { name: "F_PAGAR_BAHAN", nullable: true, length: 1 })
  fPagarBahan!: string | null;

  @Column("character", { name: "F_PEMADAM_HYDRANT", nullable: true, length: 1 })
  fPemadamHydrant!: string | null;

  @Column("character", { name: "F_PEMADAM_ALARAM", nullable: true, length: 1 })
  fPemadamAlaram!: string | null;

  @Column("character", { name: "F_PABX", nullable: true, length: 1 })
  fPabx!: string | null;

  @Column("character", { name: "F_KEDALAMAN", nullable: true, length: 1 })
  fKedalaman!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN1",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan1!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN2",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan2!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN3",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan3!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN4",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan4!: string | null;

  @Column("character", { name: "DB_JENIS_HOTEL5", nullable: true, length: 1 })
  dbJenisHotel5!: string | null;

  @Column("character", { name: "DB_JML_BINTANG5", nullable: true, length: 1 })
  dbJmlBintang5!: string | null;

  @Column("character", { name: "DB_TIPE_BANGUNAN6", nullable: true, length: 1 })
  dbTipeBangunan6!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN7",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan7!: string | null;

  @Column("character", { name: "DB_LETAK_TANGKI8", nullable: true, length: 1 })
  dbLetakTangki8!: string | null;

  @Column("character", {
    name: "DB_KELAS_BANGUNAN9",
    nullable: true,
    length: 1,
  })
  dbKelasBangunan9!: string | null;

  @Column("character", { name: "F_PEMADAM_SPRINK", nullable: true, length: 1 })
  fPemadamSprink!: string | null;

  @Column("character", { name: "RD_LANTAI", nullable: true, length: 1 })
  rdLantai!: string | null;

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

  @Column("numeric", {
    name: "DB_ST_LUAS_MEZZANINE",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  dbStLuasMezzanine!: string | null;

  @Column("numeric", {
    name: "DB_ST_KELILING_DINDING",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  dbStKelilingDinding!: string | null;

  @Column("numeric", {
    name: "DB_ST_DAYA_DUKUNG_LANTAI",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  dbStDayaDukungLantai!: string | null;

  @Column("numeric", {
    name: "DB_ST_LEBAR_BENTANG",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  dbStLebarBentang!: string | null;

  @Column("numeric", {
    name: "DB_ST_TINGGI_KOLOM",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  dbStTinggiKolom!: string | null;
}
