import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PARTOBJ$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrPartobj {
  @Column("numeric", {
    name: "PARTTYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  parttype!: string | null;

  @Column("numeric", {
    name: "PARTCNT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  partcnt!: string | null;

  @Column("numeric", {
    name: "PARTKEYCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  partkeycols!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "DEFTS#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defts!: string | null;

  @Column("numeric", {
    name: "DEFPCTFREE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defpctfree!: string | null;

  @Column("numeric", {
    name: "DEFPCTUSED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defpctused!: string | null;

  @Column("numeric", {
    name: "DEFPCTTHRES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defpctthres!: string | null;

  @Column("numeric", {
    name: "DEFINITRANS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  definitrans!: string | null;

  @Column("numeric", {
    name: "DEFMAXTRANS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defmaxtrans!: string | null;

  @Column("numeric", {
    name: "DEFTINIEXTS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  deftiniexts!: string | null;

  @Column("numeric", {
    name: "DEFEXTSIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defextsize!: string | null;

  @Column("numeric", {
    name: "DEFMINEXTS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defminexts!: string | null;

  @Column("numeric", {
    name: "DEFMAXEXTS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defmaxexts!: string | null;

  @Column("numeric", {
    name: "DEFEXTPCT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defextpct!: string | null;

  @Column("numeric", {
    name: "DEFLISTS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  deflists!: string | null;

  @Column("numeric", {
    name: "DEFGROUPS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defgroups!: string | null;

  @Column("numeric", {
    name: "DEFLOGGING",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  deflogging!: string | null;

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

  @Column("numeric", {
    name: "SPARE3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare3!: string | null;

  @Column("numeric", {
    name: "DEFINCLCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  definclcol!: string | null;

  @Column("character varying", {
    name: "PARAMETERS",
    nullable: true,
    length: 3000,
  })
  parameters!: string | null;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", {
    name: "LOGMNR_UID",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrUid!: string | null;

  @Column("numeric", {
    name: "LOGMNR_FLAGS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrFlags!: string | null;
}
