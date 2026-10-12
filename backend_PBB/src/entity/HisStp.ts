import { Column, Entity } from "typeorm";

@Entity("HIS_STP", { schema: "PBB_KUTAI-BARAT" })
export class HisStp {
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

  @Column("character", { name: "THN_PAJAK_STP", length: 4 })
  thnPajakStp!: string;

  @Column("numeric", { name: "INDEKS_PERUBAHAN_STP", precision: 2, scale: 0 })
  indeksPerubahanStp!: string;

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

  @Column("timestamp without time zone", {
    name: "HIS_TGL_JATUH_TEMPO_STP",
    nullable: true,
  })
  hisTglJatuhTempoStp!: Date | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_TERBIT_STP",
    nullable: true,
  })
  hisTglTerbitStp!: Date | null;

  @Column("numeric", {
    name: "HIS_SISA_PAJAK_TERHUTANG_STP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisSisaPajakTerhutangStp!: string | null;

  @Column("numeric", {
    name: "HIS_JML_LAMBAT_BULAN_DENDA_STP",
    nullable: true,
    precision: 2,
    scale: 0,
  })
  hisJmlLambatBulanDendaStp!: string | null;

  @Column("numeric", {
    name: "HIS_RUPIAH_DENDA_STP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisRupiahDendaStp!: string | null;

  @Column("numeric", {
    name: "HIS_JML_PAJAK_TERHUTANG_STP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisJmlPajakTerhutangStp!: string | null;

  @Column("numeric", {
    name: "HIS_PERSETUJUAN_STP_KP_PBB",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  hisPersetujuanStpKpPbb!: string | null;

  @Column("character", {
    name: "HIS_KD_JNS_KETETAPAN",
    nullable: true,
    length: 1,
  })
  hisKdJnsKetetapan!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_CETAK_STP",
    nullable: true,
  })
  hisTglCetakStp!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PENCETAK_STP",
    nullable: true,
    length: 30,
  })
  hisNipPencetakStp!: string | null;
}
