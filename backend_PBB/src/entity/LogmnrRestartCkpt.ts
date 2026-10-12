import { Column, Entity } from "typeorm";

@Entity("LOGMNR_RESTART_CKPT$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrRestartCkpt {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", {
    name: "VALID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  valid!: string | null;

  @Column("numeric", { name: "CKPT_SCN", precision: 1000, scale: 53 })
  ckptScn!: string;

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

  @Column("bytea", { name: "CKPT_INFO", nullable: true })
  ckptInfo!: Buffer | null;

  @Column("numeric", {
    name: "FLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flag!: string | null;

  @Column("numeric", {
    name: "OFFSET",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  offset!: string | null;

  @Column("bytea", { name: "CLIENT_DATA", nullable: true })
  clientData!: Buffer | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("numeric", {
    name: "SPARE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare2!: string | null;

  @Column("numeric", { name: "PDBID", precision: 1000, scale: 53 })
  pdbid!: string;
}
