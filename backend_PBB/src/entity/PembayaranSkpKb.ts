import { Column, Entity } from "typeorm";

@Entity("PEMBAYARAN_SKP_KB", { schema: "PBB_KUTAI-BARAT" })
export class PembayaranSkpKb {
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

  @Column("numeric", { name: "PEMBAYARAN_SKP_KB_KE", precision: 2, scale: 0 })
  pembayaranSkpKbKe!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("numeric", {
    name: "DENDA_SKP_KB",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaSkpKb!: string | null;

  @Column("numeric", {
    name: "JML_SKP_KB_YG_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlSkpKbYgDibayar!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBAYARAN_SKP_KB",
    nullable: true,
  })
  tglPembayaranSkpKb!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_BYR_SKP_KB",
    nullable: true,
  })
  tglRekamByrSkpKb!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_BYR_SKP_KB",
    nullable: true,
    length: 30,
  })
  nipPerekamByrSkpKb!: string | null;
}
