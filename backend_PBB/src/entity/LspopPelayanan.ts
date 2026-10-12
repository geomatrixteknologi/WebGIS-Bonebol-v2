import { Column, Entity } from "typeorm";

@Entity("LSPOP_PELAYANAN", { schema: "PBB_KUTAI-BARAT" })
export class LspopPelayanan {
  @Column("character", { name: "KD_PROP", nullable: true, length: 2 })
  kdProp!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KEC", nullable: true, length: 3 })
  kdKec!: string | null;

  @Column("character", { name: "KD_KEL", nullable: true, length: 3 })
  kdKel!: string | null;

  @Column("character", { name: "KD_BLOK", nullable: true, length: 3 })
  kdBlok!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 4 })
  noUrut!: string | null;

  @Column("character", { name: "KD_JNS_OP", nullable: true, length: 1 })
  kdJnsOp!: string | null;

  @Column("character", { name: "THN_FORMULIR", nullable: true, length: 4 })
  thnFormulir!: string | null;

  @Column("character", {
    name: "NO_BUNDEL_FORMULIR",
    nullable: true,
    length: 4,
  })
  noBundelFormulir!: string | null;

  @Column("character", { name: "NO_URUT_FORMULIR", nullable: true, length: 3 })
  noUrutFormulir!: string | null;

  @Column("character varying", {
    name: "RD_NO_BNG",
    nullable: true,
    length: 30,
  })
  rdNoBng!: string | null;

  @Column("character varying", {
    name: "RD_JNS_BNG",
    nullable: true,
    length: 30,
  })
  rdJnsBng!: string | null;

  @Column("character varying", {
    name: "RD_LUAS_BNG",
    nullable: true,
    length: 30,
  })
  rdLuasBng!: string | null;

  @Column("character varying", {
    name: "RD_JMLH_LANTAI",
    nullable: true,
    length: 30,
  })
  rdJmlhLantai!: string | null;

  @Column("character varying", {
    name: "RD_THN_DIBANGUN",
    nullable: true,
    length: 30,
  })
  rdThnDibangun!: string | null;

  @Column("character varying", {
    name: "RD_THN_RENOVASI",
    nullable: true,
    length: 30,
  })
  rdThnRenovasi!: string | null;

  @Column("character varying", {
    name: "RD_KONDISI_BNG",
    nullable: true,
    length: 30,
  })
  rdKondisiBng!: string | null;

  @Column("character varying", {
    name: "RD_KONSTRUKSI",
    nullable: true,
    length: 30,
  })
  rdKonstruksi!: string | null;

  @Column("character varying", { name: "RD_ATAP", nullable: true, length: 30 })
  rdAtap!: string | null;

  @Column("character varying", {
    name: "RD_DINDING",
    nullable: true,
    length: 30,
  })
  rdDinding!: string | null;

  @Column("character varying", {
    name: "RD_LANTAI",
    nullable: true,
    length: 30,
  })
  rdLantai!: string | null;

  @Column("character varying", {
    name: "RD_LANGIT2",
    nullable: true,
    length: 30,
  })
  rdLangit2!: string | null;

  @Column("timestamp without time zone", {
    name: "IP_TGL_PENDATAAN",
    nullable: true,
  })
  ipTglPendataan!: Date | null;

  @Column("timestamp without time zone", {
    name: "IP_TGL_PENELITI",
    nullable: true,
  })
  ipTglPeneliti!: Date | null;

  @Column("character varying", {
    name: "IP_NIP_PENDATA",
    nullable: true,
    length: 30,
  })
  ipNipPendata!: string | null;

  @Column("character varying", {
    name: "IP_NIP_PENELITI",
    nullable: true,
    length: 30,
  })
  ipNipPeneliti!: string | null;

  @Column("timestamp without time zone", {
    name: "IP_TGL_KUNJUNG_KEMBALI",
    nullable: true,
  })
  ipTglKunjungKembali!: Date | null;

  @Column("character varying", {
    name: "F_LISTRIK_DAYA",
    nullable: true,
    length: 30,
  })
  fListrikDaya!: string | null;

  @Column("character varying", {
    name: "F_LISTRIK_WINDOW",
    nullable: true,
    length: 30,
  })
  fListrikWindow!: string | null;

  @Column("character varying", {
    name: "F_AC_CENTRAL",
    nullable: true,
    length: 30,
  })
  fAcCentral!: string | null;

  @Column("character varying", {
    name: "F_KOLAM_RENANG",
    nullable: true,
    length: 30,
  })
  fKolamRenang!: string | null;

  @Column("character varying", {
    name: "F_KOLAM_FINISHING",
    nullable: true,
    length: 30,
  })
  fKolamFinishing!: string | null;

  @Column("character varying", {
    name: "F_HALAMAN_RINGAN",
    nullable: true,
    length: 30,
  })
  fHalamanRingan!: string | null;

  @Column("character varying", {
    name: "F_HALAMAN_BERAT",
    nullable: true,
    length: 30,
  })
  fHalamanBerat!: string | null;

  @Column("character varying", {
    name: "F_HALAMAN_SEDANG",
    nullable: true,
    length: 30,
  })
  fHalamanSedang!: string | null;

  @Column("character varying", {
    name: "F_HALAMAN_PENUTUP_LANTAI",
    nullable: true,
    length: 30,
  })
  fHalamanPenutupLantai!: string | null;

  @Column("character varying", {
    name: "F_TENIS_BETON_PLUS",
    nullable: true,
    length: 30,
  })
  fTenisBetonPlus!: string | null;

  @Column("character varying", {
    name: "F_TENIS_BETON_MINUS",
    nullable: true,
    length: 30,
  })
  fTenisBetonMinus!: string | null;

  @Column("character varying", {
    name: "F_LIFT_PENUMPANG",
    nullable: true,
    length: 30,
  })
  fLiftPenumpang!: string | null;

  @Column("character varying", {
    name: "F_LIFT_KAPSUL",
    nullable: true,
    length: 30,
  })
  fLiftKapsul!: string | null;

  @Column("character varying", {
    name: "F_LIFT_BARANG",
    nullable: true,
    length: 30,
  })
  fLiftBarang!: string | null;

  @Column("character varying", {
    name: "F_TANGGA_BERJALAN_BESAR",
    nullable: true,
    length: 30,
  })
  fTanggaBerjalanBesar!: string | null;

  @Column("character varying", {
    name: "F_PAGAR_PANJANG",
    nullable: true,
    length: 30,
  })
  fPagarPanjang!: string | null;

  @Column("character varying", {
    name: "F_PAGAR_BAHAN",
    nullable: true,
    length: 30,
  })
  fPagarBahan!: string | null;

  @Column("character varying", {
    name: "F_PEMADAM_SPRINK",
    nullable: true,
    length: 30,
  })
  fPemadamSprink!: string | null;

  @Column("character varying", {
    name: "F_PEMADAM_ALARAM",
    nullable: true,
    length: 30,
  })
  fPemadamAlaram!: string | null;

  @Column("character varying", { name: "F_PABX", nullable: true, length: 30 })
  fPabx!: string | null;

  @Column("character varying", {
    name: "F_KEDALAMAN",
    nullable: true,
    length: 30,
  })
  fKedalaman!: string | null;

  @Column("character varying", {
    name: "JPB_KELAS",
    nullable: true,
    length: 30,
  })
  jpbKelas!: string | null;

  @Column("character varying", {
    name: "JPB_TINGGI_KOLOM",
    nullable: true,
    length: 30,
  })
  jpbTinggiKolom!: string | null;

  @Column("character varying", {
    name: "JPB_LEBAR_BENTANG",
    nullable: true,
    length: 30,
  })
  jpbLebarBentang!: string | null;

  @Column("character varying", {
    name: "JPB_DAYA_DUKUNG_LANTAI",
    nullable: true,
    length: 30,
  })
  jpbDayaDukungLantai!: string | null;

  @Column("character varying", {
    name: "JPB_KELILING_DINDING",
    nullable: true,
    length: 30,
  })
  jpbKelilingDinding!: string | null;

  @Column("character varying", {
    name: "JPB_LUAS_MEZZANINE",
    nullable: true,
    length: 30,
  })
  jpbLuasMezzanine!: string | null;

  @Column("character varying", {
    name: "JPB_LUAS_AC_CENTRAL",
    nullable: true,
    length: 30,
  })
  jpbLuasAcCentral!: string | null;

  @Column("character varying", {
    name: "JPB_LUAS_AC_RUANG_LAIN",
    nullable: true,
    length: 30,
  })
  jpbLuasAcRuangLain!: string | null;

  @Column("character varying", {
    name: "JPB_JMLH_BINTANG",
    nullable: true,
    length: 30,
  })
  jpbJmlhBintang!: string | null;

  @Column("character varying", {
    name: "JPB_JMLH_KAMAR",
    nullable: true,
    length: 30,
  })
  jpbJmlhKamar!: string | null;

  @Column("character varying", {
    name: "JPB_KAPASITAS_TANGKI",
    nullable: true,
    length: 30,
  })
  jpbKapasitasTangki!: string | null;

  @Column("character varying", {
    name: "CB_AC_CENTRAL",
    nullable: true,
    length: 30,
  })
  cbAcCentral!: string | null;

  @Column("character varying", {
    name: "CB_PEMADAM_HYDRANT",
    nullable: true,
    length: 30,
  })
  cbPemadamHydrant!: string | null;

  @Column("character varying", {
    name: "CB_PEMADAM_ALARAM",
    nullable: true,
    length: 30,
  })
  cbPemadamAlaram!: string | null;

  @Column("character varying", {
    name: "CB_PEMADAM_SPRINK",
    nullable: true,
    length: 30,
  })
  cbPemadamSprink!: string | null;

  @Column("character", { name: "STATUS_BERKAS", nullable: true, length: 1 })
  statusBerkas!: string | null;

  @Column("character", { name: "STATUS_APPROVE", nullable: true, length: 1 })
  statusApprove!: string | null;

  @Column("character", { name: "STATUS_PROGRESS", nullable: true, length: 1 })
  statusProgress!: string | null;

  @Column("character varying", {
    name: "F_LISTRIK_SPLIT",
    nullable: true,
    length: 30,
  })
  fListrikSplit!: string | null;

  @Column("character varying", {
    name: "F_TENIS_ASPAL_PLUS",
    nullable: true,
    length: 30,
  })
  fTenisAspalPlus!: string | null;

  @Column("character varying", {
    name: "F_TENIS_ASPAL_MINUS",
    nullable: true,
    length: 30,
  })
  fTenisAspalMinus!: string | null;

  @Column("character varying", {
    name: "F_TENIS_RUMPUT_PLUS",
    nullable: true,
    length: 30,
  })
  fTenisRumputPlus!: string | null;

  @Column("character varying", {
    name: "F_TENIS_RUMPUL_MINUS",
    nullable: true,
    length: 30,
  })
  fTenisRumpulMinus!: string | null;

  @Column("character varying", {
    name: "F_TANGGA_BERJALAN_KECIL",
    nullable: true,
    length: 30,
  })
  fTanggaBerjalanKecil!: string | null;

  @Column("character", { name: "STATUS", nullable: true, length: 100 })
  status!: string | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 100,
  })
  keterangan!: string | null;

  @Column("character varying", {
    name: "F_PEMADAM_HYDRANT",
    nullable: true,
    length: 30,
  })
  fPemadamHydrant!: string | null;

  @Column("character varying", { name: "CATATAN", nullable: true, length: 100 })
  catatan!: string | null;

  @Column("character", { name: "THN_FORMULIR_SPOP", nullable: true, length: 4 })
  thnFormulirSpop!: string | null;

  @Column("character", {
    name: "NO_BUNDEL_FORMULIR_SPOP",
    nullable: true,
    length: 4,
  })
  noBundelFormulirSpop!: string | null;

  @Column("character", {
    name: "NO_URUT_FORMULIR_SPOP",
    nullable: true,
    length: 3,
  })
  noUrutFormulirSpop!: string | null;
}
