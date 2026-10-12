import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_GTLO", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcGtlo {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "KEYOBJ#", precision: 1000, scale: 53 })
  keyobj!: string;

  @Column("numeric", { name: "LVLCNT", precision: 1000, scale: 53 })
  lvlcnt!: string;

  @Column("numeric", { name: "BASEOBJ#", precision: 1000, scale: 53 })
  baseobj!: string;

  @Column("numeric", { name: "BASEOBJV#", precision: 1000, scale: 53 })
  baseobjv!: string;

  @Column("numeric", {
    name: "LVL1OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lvl1Obj!: string | null;

  @Column("numeric", {
    name: "LVL2OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lvl2Obj!: string | null;

  @Column("numeric", { name: "LVL0TYPE#", precision: 1000, scale: 53 })
  lvl0Type!: string;

  @Column("numeric", {
    name: "LVL1TYPE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lvl1Type!: string | null;

  @Column("numeric", {
    name: "LVL2TYPE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lvl2Type!: string | null;

  @Column("numeric", {
    name: "OWNER#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  owner!: string | null;

  @Column("character varying", { name: "OWNERNAME", length: 384 })
  ownername!: string;

  @Column("character varying", { name: "LVL0NAME", length: 384 })
  lvl0Name!: string;

  @Column("character varying", {
    name: "LVL1NAME",
    nullable: true,
    length: 384,
  })
  lvl1Name!: string | null;

  @Column("character varying", {
    name: "LVL2NAME",
    nullable: true,
    length: 384,
  })
  lvl2Name!: string | null;

  @Column("numeric", { name: "INTCOLS", precision: 1000, scale: 53 })
  intcols!: string;

  @Column("numeric", {
    name: "COLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cols!: string | null;

  @Column("numeric", {
    name: "KERNELCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  kernelcols!: string | null;

  @Column("numeric", {
    name: "TAB_FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tabFlags!: string | null;

  @Column("numeric", {
    name: "TRIGFLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  trigflag!: string | null;

  @Column("numeric", {
    name: "ASSOC#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  assoc!: string | null;

  @Column("numeric", {
    name: "OBJ_FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  objFlags!: string | null;

  @Column("numeric", {
    name: "TS#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ts!: string | null;

  @Column("character varying", { name: "TSNAME", nullable: true, length: 90 })
  tsname!: string | null;

  @Column("numeric", {
    name: "PROPERTY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property!: string | null;

  @Column("numeric", { name: "START_SCN", precision: 1000, scale: 53 })
  startScn!: string;

  @Column("numeric", {
    name: "DROP_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropScn!: string | null;

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
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare1!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare2!: string | null;

  @Column("character varying", {
    name: "LOGMNR_SPARE3",
    nullable: true,
    length: 1000,
  })
  logmnrSpare3!: string | null;

  @Column("timestamp without time zone", {
    name: "LOGMNR_SPARE4",
    nullable: true,
  })
  logmnrSpare4!: Date | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE5",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare5!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE6",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare6!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE7",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare7!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE8",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare8!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE9",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare9!: string | null;

  @Column("numeric", {
    name: "PARTTYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  parttype!: string | null;

  @Column("numeric", {
    name: "SUBPARTTYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  subparttype!: string | null;

  @Column("numeric", {
    name: "UNSUPPORTEDCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  unsupportedcols!: string | null;

  @Column("numeric", {
    name: "COMPLEXTYPECOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  complextypecols!: string | null;

  @Column("numeric", {
    name: "NTPARENTOBJNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ntparentobjnum!: string | null;

  @Column("numeric", {
    name: "NTPARENTOBJVERSION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ntparentobjversion!: string | null;

  @Column("numeric", {
    name: "NTPARENTINTCOLNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ntparentintcolnum!: string | null;

  @Column("numeric", {
    name: "LOGMNRTLOFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrtloflags!: string | null;

  @Column("character varying", {
    name: "LOGMNRMCV",
    nullable: true,
    length: 30,
  })
  logmnrmcv!: string | null;

  @Column("numeric", {
    name: "ACDRFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  acdrflags!: string | null;

  @Column("numeric", {
    name: "ACDRTSOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  acdrtsobj!: string | null;

  @Column("numeric", {
    name: "ACDRROWTSINTCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  acdrrowtsintcol!: string | null;
}
