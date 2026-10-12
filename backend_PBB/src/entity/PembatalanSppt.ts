import { Column, Entity } from "typeorm";

@Entity("PEMBATALAN_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class PembatalanSppt {
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

  @Column("numeric", { name: "PEMBATALAN_SPPT_KE", precision: 2, scale: 0 })
  pembatalanSpptKe!: string;

  @Column("character", { name: "KD_BATAL", nullable: true, length: 2 })
  kdBatal!: string | null;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 3 })
  kdTp!: string | null;

  @Column("numeric", {
    name: "DENDA_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaSppt!: string | null;

  @Column("numeric", {
    name: "JML_SPPT_YG_DIBATALKAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlSpptYgDibatalkan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBATALAN_SPPT",
    nullable: true,
  })
  tglPembatalanSppt!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_BTL_SPPT",
    nullable: true,
  })
  tglRekamBtlSppt!: Date | null;

  @Column("character", {
    name: "NIP_REKAM_BTL_SPPT",
    nullable: true,
    length: 30,
  })
  nipRekamBtlSppt!: string | null;

  @Column("character varying", { name: "NO_BATAL", nullable: true, length: 30 })
  noBatal!: string | null;
}
