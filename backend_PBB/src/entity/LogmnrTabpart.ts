import { Column, Entity } from "typeorm";

@Entity("LOGMNR_TABPART$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrTabpart {
  @Column("numeric", { name: "OBJ#", nullable: true, precision: 22, scale: 0 })
  obj!: string | null;

  @Column("numeric", { name: "TS#", nullable: true, precision: 22, scale: 0 })
  ts!: string | null;

  @Column("numeric", {
    name: "PART#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  part!: string | null;

  @Column("numeric", { name: "BO#", precision: 22, scale: 0 })
  bo!: string;

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
