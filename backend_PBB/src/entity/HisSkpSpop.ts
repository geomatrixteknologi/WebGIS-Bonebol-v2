import { Column, Entity } from "typeorm";

@Entity("HIS_SKP_SPOP", { schema: "PBB_KUTAI-BARAT" })
export class HisSkpSpop {
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

  @Column("character", { name: "THN_PAJAK_SKP_SPOP", length: 4 })
  thnPajakSkpSpop!: string;

  @Column("numeric", {
    name: "HIS_INDEKS_PERUBAHAN_SKP_SPOP",
    precision: 4,
    scale: 0,
  })
  hisIndeksPerubahanSkpSpop!: string;

  @Column("numeric", {
    name: "HIS_SIKLUS_SKP_SPOP",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  hisSiklusSkpSpop!: string | null;

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
    name: "HIS_NM_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  hisNmWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_JLN_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  hisJlnWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_BLOK_KAV_NO_WP_SKP_SPOP",
    nullable: true,
    length: 15,
  })
  hisBlokKavNoWpSkpSpop!: string | null;

  @Column("character", {
    name: "HIS_RW_WP_SKP_SPOP",
    nullable: true,
    length: 3,
  })
  hisRwWpSkpSpop!: string | null;

  @Column("character", {
    name: "HIS_RT_WP_SKP_SPOP",
    nullable: true,
    length: 3,
  })
  hisRtWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_KELURAHAN_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  hisKelurahanWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_KOTA_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  hisKotaWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_KD_POS_WP_SKP_SPOP",
    nullable: true,
    length: 5,
  })
  hisKdPosWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_NPWP_SKP_SPOP",
    nullable: true,
    length: 15,
  })
  hisNpwpSkpSpop!: string | null;

  @Column("character varying", {
    name: "HIS_NO_PERSIL_SKP_SPOP",
    nullable: true,
    length: 5,
  })
  hisNoPersilSkpSpop!: string | null;

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
    name: "HIS_TGL_JATUH_TEMPO_SKP_SPOP",
    nullable: true,
  })
  hisTglJatuhTempoSkpSpop!: Date | null;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumiSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBngSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOPTKP_SKP_SPOP",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  hisNjoptkpSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJKP_SKP_SPOP",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  hisNjkpSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_TERHUTANG_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbTerhutangSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_BESAR_DENDA_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisBesarDendaSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_FAKTOR_PENGURANG_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisFaktorPengurangSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_YG_HARUS_DIBYR_SKPSPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbYgHarusDibyrSkpspop!: string | null;

  @Column("character", {
    name: "HIS_STATUS_PEMBAYARAN_SKP_SPOP",
    nullable: true,
    length: 1,
  })
  hisStatusPembayaranSkpSpop!: string | null;

  @Column("character", {
    name: "HIS_STATUS_TAGIHAN_SKP_SPOP",
    nullable: true,
    length: 1,
  })
  hisStatusTagihanSkpSpop!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_TERBIT_SKP_SPOP",
    nullable: true,
  })
  hisTglTerbitSkpSpop!: Date | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_CETAK_SKP_SPOP",
    nullable: true,
  })
  hisTglCetakSkpSpop!: Date | null;

  @Column("character", {
    name: "HIS_NIP_CETAK_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  hisNipCetakSkpSpop!: string | null;
}
