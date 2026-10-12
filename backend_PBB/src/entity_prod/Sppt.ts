import { Column, Entity, Index } from "typeorm";

@Index("SPPT_PK", ["kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noUrut", "thnPajakSppt"], { unique: true })
@Index("SPPT_I02", ["noRef"], {})
@Index("SPPT_I03", ["statusPembayaranSppt"], {})
@Index("SPPT_I01", ["thnPajakSppt"], {})
@Entity("SPPT", { schema: process.env.DB_SCHEMA })
export class Sppt {
  @Column("char", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("char", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("char", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("char", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("char", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("char", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("char", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("char", { primary: true, name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

  @Column("number", {
    name: "SIKLUS_SPPT",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  siklusSppt!: string | null;

  @Column("char", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("char", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("char", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("varchar2", {
    name: "NM_WP_SPPT",
    nullable: true,
    length: 150,
  })
  nmWpSppt!: string | null;

  @Column("varchar2", {
    name: "JLN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  jlnWpSppt!: string | null;

  @Column("varchar2", {
    name: "BLOK_KAV_NO_WP_SPPT",
    nullable: true,
    length: 18,
  })
  blokKavNoWpSppt!: string | null;

  @Column("char", { name: "RW_WP_SPPT", nullable: true, length: 3 })
  rwWpSppt!: string | null;

  @Column("char", { name: "RT_WP_SPPT", nullable: true, length: 3 })
  rtWpSppt!: string | null;

  @Column("varchar2", {
    name: "KELURAHAN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  kelurahanWpSppt!: string | null;

  @Column("varchar2", {
    name: "KOTA_WP_SPPT",
    nullable: true,
    length: 30,
  })
  kotaWpSppt!: string | null;

  @Column("varchar2", {
    name: "KD_POS_WP_SPPT",
    nullable: true,
    length: 5,
  })
  kdPosWpSppt!: string | null;

  @Column("varchar2", {
    name: "NPWP_SPPT",
    nullable: true,
    length: 15,
  })
  npwpSppt!: string | null;

  @Column("varchar2", {
    name: "NO_PERSIL_SPPT",
    nullable: true,
    length: 5,
  })
  noPersilSppt!: string | null;

  @Column("char", { name: "KD_KLS_TANAH", nullable: true, length: 3 })
  kdKlsTanah!: string | null;

  @Column("char", {
    name: "THN_AWAL_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  thnAwalKlsTanah!: string | null;

  @Column("char", { name: "KD_KLS_BNG", nullable: true, length: 3 })
  kdKlsBng!: string | null;

  @Column("char", { name: "THN_AWAL_KLS_BNG", nullable: true, length: 4 })
  thnAwalKlsBng!: string | null;

  @Column("date", {
    name: "TGL_JATUH_TEMPO_SPPT",
    nullable: true,
  })
  tglJatuhTempoSppt!: Date | null;

  @Column("number", {
    name: "LUAS_BUMI_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiSppt!: string | null;

  @Column("number", {
    name: "LUAS_BNG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngSppt!: string | null;

  @Column("number", {
    name: "NJOP_BUMI_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiSppt!: string | null;

  @Column("number", {
    name: "NJOP_BNG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngSppt!: string | null;

  @Column("number", {
    name: "NJOP_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopSppt!: string | null;

  @Column("number", {
    name: "NJOPTKP_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njoptkpSppt!: string | null;

  @Column("number", {
    name: "PBB_TERHUTANG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbTerhutangSppt!: string | null;

  @Column("number", {
    name: "FAKTOR_PENGURANG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  faktorPengurangSppt!: string | null;

  @Column("number", {
    name: "PBB_YG_HARUS_DIBAYAR_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbYgHarusDibayarSppt!: string | null;

  @Column("char", {
    name: "STATUS_PEMBAYARAN_SPPT",
    nullable: true,
    length: 1,
  })
  statusPembayaranSppt!: string | null;

  @Column("char", {
    name: "STATUS_TAGIHAN_SPPT",
    nullable: true,
    length: 1,
  })
  statusTagihanSppt!: string | null;

  @Column("char", { name: "STATUS_CETAK_SPPT", nullable: true, length: 1 })
  statusCetakSppt!: string | null;

  @Column("date", {
    name: "TGL_TERBIT_SPPT",
    nullable: true,
  })
  tglTerbitSppt!: Date | null;

  @Column("date", {
    name: "TGL_CETAK_SPPT",
    nullable: true,
  })
  tglCetakSppt!: Date | null;

  @Column("char", {
    name: "NIP_PENCETAK_SPPT",
    nullable: true,
    length: 30,
  })
  nipPencetakSppt!: string | null;

  @Column("varchar2", { name: "NO_REF", nullable: true, length: 50 })
  noRef!: string | null;

  @Column("number", {
    name: "JML_REF",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jmlRef!: string | null;

  @Column("number", {
    name: "PERSEN_NJKP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  persenNjkp!: string | null;

  @Column("char", { name: "STATUS_H2H", nullable: true, length: 1 })
  statusH2H!: string | null;

  @Column("date", {
    name: "TGL_UPDATE_SPPT",
    nullable: true,
  })
  tglUpdateSppt!: Date | null;

  @Column("number", {
    name: "NJKP_SPPT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  njkpSppt!: string | null;

  @Column("char", { name: "KD_BANK_PERSEPSI", nullable: true, length: 4 })
  kdBankPersepsi!: string | null;

  @Column("char", { name: "KD_BANK_TUNGGAL", nullable: true, length: 4 })
  kdBankTunggal!: string | null;

  @Column("char", { name: "KD_KPPBB_BANK", nullable: true, length: 4 })
  kdKppbbBank!: string | null;

  @Column("char", { name: "KD_KANWIL_BANK", nullable: true, length: 4 })
  kdKanwilBank!: string | null;

  @Column("number", { name: "NJOP_NJKP", nullable: true, precision: 15 })
  njopNjkp!: number | null;

  @Column("number", { name: "TARIF_SPPT", nullable: true, precision: 3, scale: 3 })
  tarifSppt!: number | null;

  @Column("varchar2", { name: "NOP_TAHUN", nullable: true, length: 255 })
  nopTahun!: string | null;

  @Column("number", { name: "NJKPTARIF", nullable: true, precision: 5 })
  njkpTarif!: number | null;

  @Column("number", { name: "NILAITARIF", nullable: true, precision: 3, scale: 3 })
  nilaiTarif!: number | null;

  @Column("varchar2", { name: "KODEBAYARPIUTANG", nullable: true, length: 255 })
  kodeBayarPiutang!: string | null;

  @Column("varchar2", { name: "QRISPIUTANG", nullable: true, length: 255 })
  qrisPiutang!: string | null;

  @Column("varchar2", { name: "KODEBAYAR", nullable: true, length: 255 })
  kodeBayar!: string | null;

  @Column("number", { name: "NILAIQRIS", nullable: true, precision: 8 })
  nilaiQris!: number | null;

  @Column("varchar2", { name: "QRIS", nullable: true, length: 255 })
  qris!: string | null;

  @Column("varchar2", { name: "NOP_TAHUN2", nullable: true, length: 255 })
  nopTahun2!: string | null;
}
