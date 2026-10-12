import { Column, Entity } from "typeorm";

@Entity("DAT_SETORAN", { schema: "PBB_KUTAI-BARAT" })
export class DatSetoran {
  @Column("numeric", { name: "ID_SETORAN", precision: 4, scale: 0 })
  idSetoran!: string;

  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_KOLEKTOR", nullable: true, length: 3 })
  kdKolektor!: string | null;

  @Column("numeric", {
    name: "JML_OP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jmlOp!: string | null;

  @Column("numeric", {
    name: "JML_BAYAR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jmlBayar!: string | null;

  @Column("numeric", {
    name: "JML_DENDA",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  jmlDenda!: string | null;

  @Column("character", { name: "THN_PAJAK_SPPT", nullable: true, length: 4 })
  thnPajakSppt!: string | null;

  @Column("character varying", {
    name: "BATCH_NUMBER",
    nullable: true,
    length: 30,
  })
  batchNumber!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBAYARAN",
    nullable: true,
  })
  tglPembayaran!: Date | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 30,
  })
  keterangan!: string | null;
}
