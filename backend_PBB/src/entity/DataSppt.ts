import { Column, Entity } from "typeorm";

@Entity("DATA_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class DataSppt {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character", { name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

  @Column("character", { name: "PENETAPAN_KE", length: 3 })
  penetapanKe!: string;

  @Column("character varying", {
    name: "JNS_PENETAPAN",
    nullable: true,
    length: 20,
  })
  jnsPenetapan!: string | null;

  @Column("numeric", {
    name: "SIKLUS_SPPT",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  siklusSppt!: string | null;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("character varying", {
    name: "NM_WP_SPPT",
    nullable: true,
    length: 100,
  })
  nmWpSppt!: string | null;

  @Column("character varying", {
    name: "JLN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  jlnWpSppt!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_WP_SPPT",
    nullable: true,
    length: 18,
  })
  blokKavNoWpSppt!: string | null;

  @Column("character", { name: "RW_WP_SPPT", nullable: true, length: 3 })
  rwWpSppt!: string | null;

  @Column("character", { name: "RT_WP_SPPT", nullable: true, length: 3 })
  rtWpSppt!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  kelurahanWpSppt!: string | null;

  @Column("character varying", {
    name: "KOTA_WP_SPPT",
    nullable: true,
    length: 30,
  })
  kotaWpSppt!: string | null;

  @Column("character varying", {
    name: "KD_POS_WP_SPPT",
    nullable: true,
    length: 5,
  })
  kdPosWpSppt!: string | null;

  @Column("character varying", {
    name: "NPWP_SPPT",
    nullable: true,
    length: 15,
  })
  npwpSppt!: string | null;

  @Column("character varying", {
    name: "NO_PERSIL_SPPT",
    nullable: true,
    length: 5,
  })
  noPersilSppt!: string | null;

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

  @Column("timestamp without time zone", {
    name: "TGL_JATUH_TEMPO_SPPT",
    nullable: true,
  })
  tglJatuhTempoSppt!: Date | null;

  @Column("numeric", {
    name: "LUAS_BUMI_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiSppt!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngSppt!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiSppt!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngSppt!: string | null;

  @Column("numeric", {
    name: "NJOP_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopSppt!: string | null;

  @Column("numeric", {
    name: "NJOPTKP_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njoptkpSppt!: string | null;

  @Column("numeric", {
    name: "PBB_TERHUTANG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbTerhutangSppt!: string | null;

  @Column("numeric", {
    name: "FAKTOR_PENGURANG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  faktorPengurangSppt!: string | null;

  @Column("numeric", {
    name: "PBB_YG_HARUS_DIBAYAR_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbYgHarusDibayarSppt!: string | null;

  @Column("character", {
    name: "STATUS_PEMBAYARAN_SPPT",
    nullable: true,
    length: 1,
  })
  statusPembayaranSppt!: string | null;

  @Column("character", {
    name: "STATUS_TAGIHAN_SPPT",
    nullable: true,
    length: 1,
  })
  statusTagihanSppt!: string | null;

  @Column("character", { name: "STATUS_CETAK_SPPT", nullable: true, length: 1 })
  statusCetakSppt!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERBIT_SPPT",
    nullable: true,
  })
  tglTerbitSppt!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_SPPT",
    nullable: true,
  })
  tglCetakSppt!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_SPPT",
    nullable: true,
    length: 30,
  })
  nipPencetakSppt!: string | null;

  @Column("character varying", { name: "NO_REF", nullable: true, length: 50 })
  noRef!: string | null;

  @Column("numeric", {
    name: "JML_REF",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jmlRef!: string | null;

  @Column("numeric", {
    name: "PERSEN_NJKP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  persenNjkp!: string | null;

  @Column("character", { name: "STATUS_H2H", nullable: true, length: 1 })
  statusH2H!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_UPDATE_SPPT",
    nullable: true,
  })
  tglUpdateSppt!: Date | null;

  @Column("numeric", {
    name: "NJKP_SPPT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  njkpSppt!: string | null;

  @Column("character", { name: "KD_BANK_PERSEPSI", nullable: true, length: 4 })
  kdBankPersepsi!: string | null;

  @Column("character", { name: "KD_BANK_TUNGGAL", nullable: true, length: 4 })
  kdBankTunggal!: string | null;

  @Column("character", { name: "KD_KPPBB_BANK", nullable: true, length: 4 })
  kdKppbbBank!: string | null;

  @Column("character", { name: "KD_KANWIL_BANK", nullable: true, length: 2 })
  kdKanwilBank!: string | null;

  @Column("character", { name: "FLG_BAYAR_POKOK", nullable: true, length: 1 })
  flgBayarPokok!: string | null;

  @Column("numeric", {
    name: "JML_KRG_BAYAR",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  jmlKrgBayar!: string | null;

  @Column("character", {
    name: "STATUS_PEKERJAAN_WP",
    nullable: true,
    length: 1,
  })
  statusPekerjaanWp!: string | null;

  @Column("character", { name: "TERSELEKSI", nullable: true, length: 1 })
  terseleksi!: string | null;

  @Column("character", { name: "KELAPA_SAWIT", nullable: true, length: 1 })
  kelapaSawit!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENETAPAN",
    nullable: true,
  })
  tglPenetapan!: Date | null;
}
