import { Column, Entity } from "typeorm";

@Entity("LOGMNR_COLTYPE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrColtype {
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

  @Column("bytea", { name: "TOID", nullable: true })
  toid!: Buffer | null;

  @Column("numeric", {
    name: "VERSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  version!: string | null;

  @Column("numeric", {
    name: "PACKED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  packed!: string | null;

  @Column("numeric", {
    name: "INTCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intcols!: string | null;

  @Column("bytea", { name: "INTCOL#S", nullable: true })
  intcolS!: Buffer | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "TYPIDCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  typidcol!: string | null;

  @Column("numeric", {
    name: "SYNOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  synobj!: string | null;

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
