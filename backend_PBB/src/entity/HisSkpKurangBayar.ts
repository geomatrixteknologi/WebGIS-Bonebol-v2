import { Column, Entity } from "typeorm";

@Entity("HIS_SKP_KURANG_BAYAR", { schema: "PBB_KUTAI-BARAT" })
export class HisSkpKurangBayar {
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

  @Column("character", { name: "THN_PAJAK_SKP_KB", length: 4 })
  thnPajakSkpKb!: string;

  @Column("numeric", {
    name: "HIS_INDEKS_PERUBAHAN_SKP_KB",
    precision: 4,
    scale: 0,
  })
  hisIndeksPerubahanSkpKb!: string;

  @Column("numeric", {
    name: "HIS_SIKLUS_SKP_KB",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  hisSiklusSkpKb!: string | null;

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
    name: "HIS_TGL_JATUH_TEMPO_SKP_KB",
    nullable: true,
  })
  hisTglJatuhTempoSkpKb!: Date | null;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumiSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBngSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_NJOPTKP_SKP_KB",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  hisNjoptkpSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_NJKP_SKP_KB",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  hisNjkpSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_TERHUTANG_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbTerhutangSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_BESAR_DENDA_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisBesarDendaSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_FAKTOR_PENGURANG_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisFaktorPengurangSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_YG_HARUS_DIBYR_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbYgHarusDibyrSkpKb!: string | null;

  @Column("numeric", {
    name: "HIS_PBB_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisPbbSppt!: string | null;

  @Column("numeric", {
    name: "HIS_SELISIH_PEMBAYARAN_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisSelisihPembayaranSkpKb!: string | null;

  @Column("character", {
    name: "HIS_STATUS_PEMBAYARAN_SKP_KB",
    nullable: true,
    length: 1,
  })
  hisStatusPembayaranSkpKb!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_TERBIT_SKP_KB",
    nullable: true,
  })
  hisTglTerbitSkpKb!: Date | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_CETAK_SKP_KB",
    nullable: true,
  })
  hisTglCetakSkpKb!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PENCETAK_SKP_KB",
    nullable: true,
    length: 30,
  })
  hisNipPencetakSkpKb!: string | null;
}
