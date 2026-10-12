import { Column, Entity } from "typeorm";

@Entity("LOGMNR_IND$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrInd {
  @Column("numeric", { name: "BO#", nullable: true, precision: 22, scale: 0 })
  bo!: string | null;

  @Column("numeric", { name: "COLS", nullable: true, precision: 22, scale: 0 })
  cols!: string | null;

  @Column("numeric", { name: "TYPE#", nullable: true, precision: 22, scale: 0 })
  type!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "PROPERTY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property!: string | null;

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
}
