import { Column, Entity } from "typeorm";

@Entity("LOGMNR_ATTRCOL$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrAttrcol {
  @Column("numeric", {
    name: "INTCOL#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intcol!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 4000 })
  name!: string | null;

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
