import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_GTCS", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcGtcs {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", { name: "OBJV#", precision: 1000, scale: 53 })
  objv!: string;

  @Column("numeric", { name: "SEGCOL#", precision: 1000, scale: 53 })
  segcol!: string;

  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

  @Column("character varying", { name: "COLNAME", length: 384 })
  colname!: string;

  @Column("numeric", { name: "TYPE#", precision: 1000, scale: 53 })
  type!: string;

  @Column("numeric", {
    name: "LENGTH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  length!: string | null;

  @Column("numeric", {
    name: "PRECISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  precision!: string | null;

  @Column("numeric", {
    name: "SCALE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  scale!: string | null;

  @Column("numeric", {
    name: "INTERVAL_LEADING_PRECISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intervalLeadingPrecision!: string | null;

  @Column("numeric", {
    name: "INTERVAL_TRAILING_PRECISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intervalTrailingPrecision!: string | null;

  @Column("numeric", {
    name: "PROPERTY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property!: string | null;

  @Column("bytea", { name: "TOID", nullable: true })
  toid!: Buffer | null;

  @Column("numeric", {
    name: "CHARSETID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  charsetid!: string | null;

  @Column("numeric", {
    name: "CHARSETFORM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  charsetform!: string | null;

  @Column("character varying", {
    name: "TYPENAME",
    nullable: true,
    length: 384,
  })
  typename!: string | null;

  @Column("character varying", {
    name: "FQCOLNAME",
    nullable: true,
    length: 4000,
  })
  fqcolname!: string | null;

  @Column("numeric", {
    name: "NUMINTCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  numintcols!: string | null;

  @Column("numeric", {
    name: "NUMATTRS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  numattrs!: string | null;

  @Column("numeric", {
    name: "ADTORDER",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  adtorder!: string | null;

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
    name: "COL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  col!: string | null;

  @Column("character varying", {
    name: "XTYPESCHEMANAME",
    nullable: true,
    length: 384,
  })
  xtypeschemaname!: string | null;

  @Column("character varying", {
    name: "XTYPENAME",
    nullable: true,
    length: 4000,
  })
  xtypename!: string | null;

  @Column("character varying", {
    name: "XFQCOLNAME",
    nullable: true,
    length: 4000,
  })
  xfqcolname!: string | null;

  @Column("numeric", {
    name: "XTOPINTCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xtopintcol!: string | null;

  @Column("numeric", {
    name: "XREFFEDTABLEOBJN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xreffedtableobjn!: string | null;

  @Column("numeric", {
    name: "XREFFEDTABLEOBJV",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xreffedtableobjv!: string | null;

  @Column("numeric", {
    name: "XCOLTYPEFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xcoltypeflags!: string | null;

  @Column("numeric", {
    name: "XOPQTYPETYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xopqtypetype!: string | null;

  @Column("numeric", {
    name: "XOPQTYPEFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xopqtypeflags!: string | null;

  @Column("numeric", {
    name: "XOPQLOBINTCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xopqlobintcol!: string | null;

  @Column("numeric", {
    name: "XOPQOBJINTCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xopqobjintcol!: string | null;

  @Column("numeric", {
    name: "XXMLINTCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xxmlintcol!: string | null;

  @Column("numeric", {
    name: "EAOWNER#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eaowner!: string | null;

  @Column("character varying", {
    name: "EAMKEYID",
    nullable: true,
    length: 192,
  })
  eamkeyid!: string | null;

  @Column("numeric", {
    name: "EAENCALG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eaencalg!: string | null;

  @Column("numeric", {
    name: "EAINTALG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eaintalg!: string | null;

  @Column("bytea", { name: "EACOLKLC", nullable: true })
  eacolklc!: Buffer | null;

  @Column("numeric", {
    name: "EAKLCLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eaklclen!: string | null;

  @Column("numeric", {
    name: "EAFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eaflags!: string | null;

  @Column("numeric", {
    name: "LOGMNRDERIVEDFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrderivedflags!: string | null;

  @Column("numeric", {
    name: "COLLID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  collid!: string | null;

  @Column("numeric", {
    name: "COLLINTCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  collintcol!: string | null;

  @Column("numeric", {
    name: "ACDRRESCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  acdrrescol!: string | null;
}
