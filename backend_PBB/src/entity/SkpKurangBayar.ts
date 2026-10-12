import { Column, Entity } from "typeorm";

@Entity("SKP_KURANG_BAYAR", { schema: "PBB_KUTAI-BARAT" })
export class SkpKurangBayar {
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
    name: "SIKLUS_SKP_KB",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  siklusSkpKb!: string | null;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

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
    name: "TGL_JATUH_TEMPO_SKP_KB",
    nullable: true,
  })
  tglJatuhTempoSkpKb!: Date | null;

  @Column("numeric", {
    name: "LUAS_BUMI_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiSkpKb!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngSkpKb!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiSkpKb!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngSkpKb!: string | null;

  @Column("numeric", {
    name: "NJOP_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopSkpKb!: string | null;

  @Column("numeric", {
    name: "NJOPTKP_SKP_KB",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  njoptkpSkpKb!: string | null;

  @Column("numeric", {
    name: "NJKP_SKP_KB",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  njkpSkpKb!: string | null;

  @Column("numeric", {
    name: "PBB_TERHUTANG_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbTerhutangSkpKb!: string | null;

  @Column("numeric", {
    name: "BESAR_DENDA_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  besarDendaSkpKb!: string | null;

  @Column("numeric", {
    name: "FAKTOR_PENGURANG_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  faktorPengurangSkpKb!: string | null;

  @Column("numeric", {
    name: "PBB_YG_HARUS_DIBAYAR_SKP_KB",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbYgHarusDibayarSkpKb!: string | null;

  @Column("numeric", {
    name: "PBB_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbSppt!: string | null;

  @Column("character", {
    name: "STATUS_PEMBAYARAN_SKP_KB",
    nullable: true,
    length: 1,
  })
  statusPembayaranSkpKb!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERBIT_SKP_KB",
    nullable: true,
  })
  tglTerbitSkpKb!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_SKP_KB",
    nullable: true,
  })
  tglCetakSkpKb!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_SKP_KB",
    nullable: true,
    length: 30,
  })
  nipPencetakSkpKb!: string | null;
}
