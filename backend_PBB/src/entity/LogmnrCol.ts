import { Column, Entity } from "typeorm";

@Entity("LOGMNR_COL$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrCol {
  @Column("numeric", { name: "COL#", nullable: true, precision: 22, scale: 0 })
  col!: string | null;

  @Column("numeric", {
    name: "SEGCOL#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  segcol!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 384 })
  name!: string | null;

  @Column("numeric", { name: "TYPE#", nullable: true, precision: 22, scale: 0 })
  type!: string | null;

  @Column("numeric", {
    name: "LENGTH",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  length!: string | null;

  @Column("numeric", {
    name: "PRECISION#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  precision!: string | null;

  @Column("numeric", { name: "SCALE", nullable: true, precision: 22, scale: 0 })
  scale!: string | null;

  @Column("numeric", { name: "NULL$", nullable: true, precision: 22, scale: 0 })
  null!: string | null;

  @Column("numeric", {
    name: "INTCOL#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  intcol!: string | null;

  @Column("numeric", {
    name: "PROPERTY",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  property!: string | null;

  @Column("numeric", {
    name: "CHARSETID",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  charsetid!: string | null;

  @Column("numeric", {
    name: "CHARSETFORM",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  charsetform!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  spare1!: string | null;

  @Column("numeric", {
    name: "SPARE2",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  spare2!: string | null;

  @Column("numeric", { name: "OBJ#", precision: 22, scale: 0 })
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
