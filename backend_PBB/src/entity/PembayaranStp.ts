import { Column, Entity } from "typeorm";

@Entity("PEMBAYARAN_STP", { schema: "PBB_KUTAI-BARAT" })
export class PembayaranStp {
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

  @Column("character", { name: "THN_PAJAK_STP", length: 4 })
  thnPajakStp!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("numeric", {
    name: "DENDA_STP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaStp!: string | null;

  @Column("numeric", {
    name: "JML_STP_YG_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlStpYgDibayar!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBAYARAN_STP",
    nullable: true,
  })
  tglPembayaranStp!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_BYR_STP",
    nullable: true,
  })
  tglRekamByrStp!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_BYR_STP",
    nullable: true,
    length: 30,
  })
  nipPerekamByrStp!: string | null;
}
