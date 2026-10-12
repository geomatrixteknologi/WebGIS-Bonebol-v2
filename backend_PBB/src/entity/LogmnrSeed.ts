import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SEED$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrSeed {
  @Column("numeric", {
    name: "SEED_VERSION",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  seedVersion!: string | null;

  @Column("numeric", {
    name: "GATHER_VERSION",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  gatherVersion!: string | null;

  @Column("character varying", {
    name: "SCHEMANAME",
    nullable: true,
    length: 384,
  })
  schemaname!: string | null;

  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", { name: "OBJV#", nullable: true, precision: 22, scale: 0 })
  objv!: string | null;

  @Column("character varying", {
    name: "TABLE_NAME",
    nullable: true,
    length: 384,
  })
  tableName!: string | null;

  @Column("character varying", {
    name: "COL_NAME",
    nullable: true,
    length: 384,
  })
  colName!: string | null;

  @Column("numeric", {
    name: "COL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  col!: string | null;

  @Column("numeric", {
    name: "INTCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intcol!: string | null;

  @Column("numeric", {
    name: "SEGCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  segcol!: string | null;

  @Column("numeric", {
    name: "TYPE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("numeric", {
    name: "LENGTH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  length!: string | null;

  @Column("numeric", {
    name: "PRECISION#",
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

  @Column("numeric", { name: "NULL$", precision: 1000, scale: 53 })
  null!: string;

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
