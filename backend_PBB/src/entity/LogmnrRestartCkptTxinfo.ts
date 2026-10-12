import { Column, Entity } from "typeorm";

@Entity("LOGMNR_RESTART_CKPT_TXINFO$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrRestartCkptTxinfo {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", { name: "XIDUSN", precision: 1000, scale: 53 })
  xidusn!: string;

  @Column("numeric", { name: "XIDSLT", precision: 1000, scale: 53 })
  xidslt!: string;

  @Column("numeric", { name: "XIDSQN", precision: 1000, scale: 53 })
  xidsqn!: string;

  @Column("numeric", { name: "SESSION_NUM", precision: 1000, scale: 53 })
  sessionNum!: string;

  @Column("numeric", { name: "SERIAL_NUM", precision: 1000, scale: 53 })
  serialNum!: string;

  @Column("numeric", {
    name: "FLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flag!: string | null;

  @Column("numeric", {
    name: "START_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScn!: string | null;

  @Column("numeric", { name: "EFFECTIVE_SCN", precision: 1000, scale: 53 })
  effectiveScn!: string;

  @Column("numeric", {
    name: "OFFSET",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  offset!: string | null;

  @Column("bytea", { name: "TX_DATA", nullable: true })
  txData!: Buffer | null;
}
