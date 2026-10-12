import { Column, Entity } from "typeorm";

@Entity("LOGMNR_LOB$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrLob {
  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "INTCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intcol!: string | null;

  @Column("numeric", {
    name: "COL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  col!: string | null;

  @Column("numeric", {
    name: "LOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lobj!: string | null;

  @Column("numeric", { name: "CHUNK", precision: 1000, scale: 53 })
  chunk!: string;

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
