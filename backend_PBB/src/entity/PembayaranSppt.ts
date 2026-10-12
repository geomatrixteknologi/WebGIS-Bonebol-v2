import { Column, Entity } from "typeorm";

@Entity("PEMBAYARAN_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class PembayaranSppt {
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

  @Column("character", { primary: true, name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

  @Column("numeric", { primary: true, name: "PEMBAYARAN_SPPT_KE", precision: 2, scale: 0 })
  pembayaranSpptKe!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("character", { name: "KD_LP", nullable: true, length: 4 })
  kdLp!: string | null;

  @Column("numeric", {
    name: "DENDA_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaSppt!: string | null;

  @Column("numeric", {
    name: "JML_SPPT_YG_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlSpptYgDibayar!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBAYARAN_SPPT",
    nullable: true,
  })
  tglPembayaranSppt!: Date | null;

  @Column("timestamp without time zone", { name: "TGL_REKAM_BYR_SPPT" })
  tglRekamByrSppt!: Date;

  @Column("character", {
    name: "NIP_REKAM_BYR_SPPT",
    nullable: true,
    length: 30,
  })
  nipRekamByrSppt!: string | null;

  @Column("character varying", { name: "NO_BUKTI", nullable: true, length: 30 })
  noBukti!: string | null;

  @Column("numeric", {
    name: "PENGURANGAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pengurangan!: string | null;

  @Column("character", { name: "STATUS_H2H", nullable: true, length: 1 })
  statusH2H!: string | null;

  @Column("character", { name: "STAN", nullable: true, length: 6 })
  stan!: string | null;

  @Column("character", { name: "TGL_TRX", nullable: true, length: 10 })
  tglTrx!: string | null;

  @Column("timestamp without time zone", { name: "TGL_REV", nullable: true })
  tglRev!: Date | null;

  @Column("character", { name: "PENGESAHAN", nullable: true, length: 16 })
  pengesahan!: string | null;

  @Column("character", { name: "FLAG_KIRIM", nullable: true, length: 1 })
  flagKirim!: string | null;

  @Column("numeric", {
    name: "REV_FLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  revFlag!: string | null;

  @Column("character", { name: "KD_BANK_PERSEPSI", nullable: true, length: 2 })
  kdBankPersepsi!: string | null;

  @Column("character", { name: "KD_BANK_TUNGGAL", nullable: true, length: 2 })
  kdBankTunggal!: string | null;

  @Column("character", { name: "KD_KPPBB_BANK", nullable: true, length: 2 })
  kdKppbbBank!: string | null;

  @Column("character", { name: "KD_KANWIL_BANK", nullable: true, length: 2 })
  kdKanwilBank!: string | null;

  @Column("character", { name: "BATCH_NUMBER", nullable: true, length: 18 })
  batchNumber!: string | null;
}
