import { Column, Entity } from "typeorm";

@Entity("SKP_SPOP", { schema: "PBB_KUTAI-BARAT" })
export class SkpSpop {
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
    name: "SIKLUS_SKP_SPOP",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  siklusSkpSpop!: string | null;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("character varying", {
    name: "NM_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  nmWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "JLN_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  jlnWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_WP_SKP_SPOP",
    nullable: true,
    length: 15,
  })
  blokKavNoWpSkpSpop!: string | null;

  @Column("character", { name: "RW_WP_SKP_SPOP", nullable: true, length: 3 })
  rwWpSkpSpop!: string | null;

  @Column("character", { name: "RT_WP_SKP_SPOP", nullable: true, length: 3 })
  rtWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  kelurahanWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "KOTA_WP_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  kotaWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "KD_POS_WP_SKP_SPOP",
    nullable: true,
    length: 5,
  })
  kdPosWpSkpSpop!: string | null;

  @Column("character varying", {
    name: "NPWP_SKP_SPOP",
    nullable: true,
    length: 15,
  })
  npwpSkpSpop!: string | null;

  @Column("character varying", {
    name: "NO_PERSIL_SKP_SPOP",
    nullable: true,
    length: 5,
  })
  noPersilSkpSpop!: string | null;

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
    name: "TGL_JATUH_TEMPO_SKP_SPOP",
    nullable: true,
  })
  tglJatuhTempoSkpSpop!: Date | null;

  @Column("numeric", {
    name: "LUAS_BUMI_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiSkpSpop!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOP_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOPTKP_SKP_SPOP",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  njoptkpSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJKP_SKP_SPOP",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  njkpSkpSpop!: string | null;

  @Column("numeric", {
    name: "PBB_TERHUTANG_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbTerhutangSkpSpop!: string | null;

  @Column("numeric", {
    name: "BESAR_DENDA_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  besarDendaSkpSpop!: string | null;

  @Column("numeric", {
    name: "FAKTOR_PENGURANG_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  faktorPengurangSkpSpop!: string | null;

  @Column("numeric", {
    name: "PBB_YG_HARUS_DIBAYAR_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbYgHarusDibayarSkpSpop!: string | null;

  @Column("character", {
    name: "STATUS_PEMBAYARAN_SKP_SPOP",
    nullable: true,
    length: 1,
  })
  statusPembayaranSkpSpop!: string | null;

  @Column("character", {
    name: "STATUS_TAGIHAN_SKP_SPOP",
    nullable: true,
    length: 1,
  })
  statusTagihanSkpSpop!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERBIT_SKP_SPOP",
    nullable: true,
  })
  tglTerbitSkpSpop!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_SKP_SPOP",
    nullable: true,
  })
  tglCetakSkpSpop!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  nipPencetakSkpSpop!: string | null;
}
