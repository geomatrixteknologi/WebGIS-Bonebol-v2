import { Column, Entity } from "typeorm";

@Entity("LOGMNR_REFCON$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrRefcon {
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
    name: "REFTYP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  reftyp!: string | null;

  @Column("bytea", { name: "STABID", nullable: true })
  stabid!: Buffer | null;

  @Column("bytea", { name: "EXPCTOID", nullable: true })
  expctoid!: Buffer | null;

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
