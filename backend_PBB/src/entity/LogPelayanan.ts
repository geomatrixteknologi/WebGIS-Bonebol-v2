import { Column, Entity } from "typeorm";

@Entity("LOG_PELAYANAN", { schema: "PBB_KUTAI-BARAT" })
export class LogPelayanan {
  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", nullable: true, length: 4 })
  noBundel!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 3 })
  noUrut!: string | null;

  @Column("character", { name: "STATUS_PELAYANAN", nullable: true, length: 2 })
  statusPelayanan!: string | null;

  @Column("character", { name: "STATUS", nullable: true, length: 2 })
  status!: string | null;

  @Column("numeric", {
    name: "ESTIMASI",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  estimasi!: string | null;

  @Column("character varying", { name: "TITLE", nullable: true, length: 100 })
  title!: string | null;

  @Column("character varying", { name: "ALASAN", nullable: true, length: 4000 })
  alasan!: string | null;

  @Column("timestamp without time zone", { name: "TANGGAL" })
  tanggal!: Date;

  @Column("character", { name: "STATUS_PROGRES", nullable: true, length: 2 })
  statusProgres!: string | null;

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;
}
