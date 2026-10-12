import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SESSION_ACTIONS$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrSessionActions {
  @Column("numeric", {
    name: "FLAGSRUNTIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flagsruntime!: string | null;

  @Column("numeric", {
    name: "DROPSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropscn!: string | null;

  @Column("timestamp without time zone", { name: "MODIFYTIME", nullable: true })
  modifytime!: Date | null;

  @Column("timestamp without time zone", {
    name: "DISPATCHTIME",
    nullable: true,
  })
  dispatchtime!: Date | null;

  @Column("timestamp without time zone", { name: "DROPTIME", nullable: true })
  droptime!: Date | null;

  @Column("numeric", {
    name: "LCRCOUNT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lcrcount!: string | null;

  @Column("character varying", { name: "ACTIONNAME", length: 30 })
  actionname!: string;

  @Column("numeric", { name: "LOGMNRSESSION#", precision: 1000, scale: 53 })
  logmnrsession!: string;

  @Column("numeric", { name: "PROCESSROLE#", precision: 1000, scale: 53 })
  processrole!: string;

  @Column("numeric", { name: "ACTIONTYPE#", precision: 1000, scale: 53 })
  actiontype!: string;

  @Column("numeric", {
    name: "FLAGSDEFINETIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flagsdefinetime!: string | null;

  @Column("timestamp without time zone", { name: "CREATETIME", nullable: true })
  createtime!: Date | null;

  @Column("numeric", {
    name: "XIDUSN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidusn!: string | null;

  @Column("numeric", {
    name: "XIDSLT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidslt!: string | null;

  @Column("numeric", {
    name: "XIDSQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidsqn!: string | null;

  @Column("numeric", {
    name: "THREAD#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  thread!: string | null;

  @Column("numeric", {
    name: "STARTSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startscn!: string | null;

  @Column("numeric", {
    name: "STARTSUBSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startsubscn!: string | null;

  @Column("numeric", {
    name: "ENDSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endscn!: string | null;

  @Column("numeric", {
    name: "ENDSUBSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endsubscn!: string | null;

  @Column("numeric", {
    name: "RBASQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbasqn!: string | null;

  @Column("numeric", {
    name: "RBABLK",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbablk!: string | null;

  @Column("numeric", {
    name: "RBABYTE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbabyte!: string | null;

  @Column("numeric", {
    name: "SESSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  session!: string | null;

  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "ATTR1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr1!: string | null;

  @Column("numeric", {
    name: "ATTR2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr2!: string | null;

  @Column("numeric", {
    name: "ATTR3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr3!: string | null;

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

  @Column("timestamp without time zone", { name: "SPARE3", nullable: true })
  spare3!: Date | null;

  @Column("character varying", { name: "SPARE4", nullable: true, length: 2000 })
  spare4!: string | null;

  @Column("numeric", {
    name: "PDBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbid!: string | null;

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 390,
  })
  pdbName!: string | null;
}
