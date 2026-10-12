import { Column, Entity } from "typeorm";

@Entity("PEMBAYARAN_SKP_SPOP", { schema: "PBB_KUTAI-BARAT" })
export class PembayaranSkpSpop {
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

  @Column("numeric", { name: "PEMBAYARAN_SKP_SPOP_KE", precision: 2, scale: 0 })
  pembayaranSkpSpopKe!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("numeric", {
    name: "DENDA_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaSkpSpop!: string | null;

  @Column("numeric", {
    name: "JML_SKP_SPOP_YG_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlSkpSpopYgDibayar!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBAYARAN_SKP_SPOP",
    nullable: true,
  })
  tglPembayaranSkpSpop!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_BYR_SKP_SPOP",
    nullable: true,
  })
  tglRekamByrSkpSpop!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_BYR_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  nipPerekamByrSkpSpop!: string | null;
}
