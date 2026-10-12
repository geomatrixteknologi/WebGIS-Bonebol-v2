import { Column, Entity } from "typeorm";

@Entity("LOGMNR_CCOL$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrCcol {
  @Column("numeric", {
    name: "CON#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  con!: string | null;

  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "COL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  col!: string | null;

  @Column("numeric", {
    name: "POS#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pos!: string | null;

  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

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
