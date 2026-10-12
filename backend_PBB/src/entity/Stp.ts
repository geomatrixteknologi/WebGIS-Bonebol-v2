import { Column, Entity, Index } from "typeorm";

@Index("STP_PK", ["kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noUrut", "thnPajakStp"], { unique: true })
@Entity("STP", { schema: "PBB_KUTAI-BARAT" })
export class Stp {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character", { primary: true, name: "THN_PAJAK_STP", length: 4 })
  thnPajakStp!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_JATUH_TEMPO_STP",
    nullable: true,
  })
  tglJatuhTempoStp!: Date | null;

  @Column("numeric", {
    name: "JML_LAMBAT_BULAN_DENDA_STP",
    nullable: true,
    precision: 2,
    scale: 0,
  })
  jmlLambatBulanDendaStp!: string | null;

  @Column("numeric", {
    name: "SISA_PAJAK_TERHUTANG_STP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  sisaPajakTerhutangStp!: string | null;

  @Column("numeric", {
    name: "RUPIAH_DENDA_STP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  rupiahDendaStp!: string | null;

  @Column("numeric", {
    name: "JML_PAJAK_TERHUTANG_STP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  jmlPajakTerhutangStp!: string | null;

  @Column("numeric", {
    name: "PERSETUJUAN_STP_KP_PBB",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  persetujuanStpKpPbb!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERBIT_STP",
    nullable: true,
  })
  tglTerbitStp!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_STP",
    nullable: true,
  })
  tglCetakStp!: Date | null;

  @Column("character", { name: "NIP_PENCETAK_STP", nullable: true, length: 30 })
  nipPencetakStp!: string | null;

  @Column("character", { name: "KD_JNS_KETETAPAN", nullable: true, length: 1 })
  kdJnsKetetapan!: string | null;
}
