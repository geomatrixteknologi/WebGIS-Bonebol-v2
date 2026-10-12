import { Column, Entity } from "typeorm";

@Entity("LOGMNR_TAB$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrTab {
  @Column("numeric", { name: "TS#", nullable: true, precision: 22, scale: 0 })
  ts!: string | null;

  @Column("numeric", { name: "COLS", nullable: true, precision: 22, scale: 0 })
  cols!: string | null;

  @Column("numeric", {
    name: "PROPERTY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property!: string | null;

  @Column("numeric", {
    name: "INTCOLS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  intcols!: string | null;

  @Column("numeric", {
    name: "KERNELCOLS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  kernelcols!: string | null;

  @Column("numeric", { name: "BOBJ#", nullable: true, precision: 22, scale: 0 })
  bobj!: string | null;

  @Column("numeric", {
    name: "TRIGFLAG",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  trigflag!: string | null;

  @Column("numeric", { name: "FLAGS", nullable: true, precision: 22, scale: 0 })
  flags!: string | null;

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
