import { Column, Entity } from "typeorm";

@Entity("HIS_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class HisSppt {
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

  @Column("numeric", {
    name: "HIS_INDEKS_PERUBAHAN_SPPT",
    precision: 4,
    scale: 0,
  })
  hisIndeksPerubahanSppt!: string;

  @Column("numeric", {
    name: "HIS_SIKLUS_SPPT",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  hisSiklusSppt!: string | null;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "JNS_SK", nullable: true, length: 1 })
  jnsSk!: string | null;

  @Column("character", { name: "NO_SK", nullable: true, length: 100 })
  noSk!: string | null;

  @Column("character", { name: "HIS_KD_TP", nullable: true, length: 4 })
  hisKdTp!: string | null;

  @Column("character varying", {
    name: "HIS_NM_WP_SPPT",
    nullable: true,
    length: 30,
  })
  hisNmWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_JLN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  hisJlnWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_BLOK_KAV_NO_WP_SPPT",
    nullable: true,
    length: 15,
  })
  hisBlokKavNoWpSppt!: string | null;

  @Column("character", { name: "HIS_RW_WP_SPPT", nullable: true, length: 3 })
  hisRwWpSppt!: string | null;

  @Column("character", { name: "HIS_RT_WP_SPPT", nullable: true, length: 3 })
  hisRtWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_KELURAHAN_WP_SPPT",
    nullable: true,
    length: 30,
  })
  hisKelurahanWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_KOTA_WP_SPPT",
    nullable: true,
    length: 30,
  })
  hisKotaWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_KD_POS_WP_SPPT",
    nullable: true,
    length: 5,
  })
  hisKdPosWpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_NPWP_SPPT",
    nullable: true,
    length: 15,
  })
  hisNpwpSppt!: string | null;

  @Column("character varying", {
    name: "HIS_NO_PERSIL_SPPT",
    nullable: true,
    length: 5,
  })
  hisNoPersilSppt!: string | null;

  @Column("character", { name: "HIS_KD_KLS_TANAH", nullable: true, length: 3 })
  hisKdKlsTanah!: string | null;

  @Column("character", {
    name: "HIS_THN_AWAL_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  hisThnAwalKlsTanah!: string | null;

  @Column("character", { name: "HIS_KD_KLS_BNG", nullable: true, length: 3 })
  hisKdKlsBng!: string | null;

  @Column("character", {
    name: "HIS_THN_AWAL_KLS_BNG",
    nullable: true,
    length: 4,
  })
  hisThnAwalKlsBng!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_JATUH_TEMPO_SPPT",
    nullable: true,
  })
  hisTglJatuhTempoSppt!: Date | null;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiSppt!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumiSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBngSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOPTKP_SPPT",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  hisNjoptkpSppt!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_TERHUTANG_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbTerhutangSppt!: string | null;

  @Column("numeric", {
    name: "HIS_FAKTOR_PENGURANG_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisFaktorPengurangSppt!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_YG_HARUS_DIBAYAR_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbYgHarusDibayarSppt!: string | null;

  @Column("character", {
    name: "HIS_STATUS_PEMBAYARAN_SPPT",
    nullable: true,
    length: 1,
  })
  hisStatusPembayaranSppt!: string | null;

  @Column("character", {
    name: "HIS_STATUS_TAGIHAN_SPPT",
    nullable: true,
    length: 1,
  })
  hisStatusTagihanSppt!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_TERBIT_SPPT",
    nullable: true,
  })
  hisTglTerbitSppt!: Date | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_CETAK_SPPT",
    nullable: true,
  })
  hisTglCetakSppt!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PENCETAK_SPPT",
    nullable: true,
    length: 30,
  })
  hisNipPencetakSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJKP_SPPT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hisNjkpSppt!: string | null;

  @Column("character", {
    name: "HIS_KD_BANK_PERSEPSI",
    nullable: true,
    length: 2,
  })
  hisKdBankPersepsi!: string | null;

  @Column("character", {
    name: "HIS_KD_BANK_TUNGGAL",
    nullable: true,
    length: 2,
  })
  hisKdBankTunggal!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
