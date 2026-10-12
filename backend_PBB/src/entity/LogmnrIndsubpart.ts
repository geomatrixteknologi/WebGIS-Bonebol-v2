import { Column, Entity } from "typeorm";

@Entity("LOGMNR_INDSUBPART$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrIndsubpart {
  @Column("numeric", { name: "OBJ#", nullable: true, precision: 22, scale: 0 })
  obj!: string | null;

  @Column("numeric", {
    name: "DATAOBJ#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dataobj!: string | null;

  @Column("numeric", { name: "POBJ#", nullable: true, precision: 22, scale: 0 })
  pobj!: string | null;

  @Column("numeric", {
    name: "SUBPART#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  subpart!: string | null;

  @Column("numeric", { name: "TS#", precision: 22, scale: 0 })
  ts!: string;

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
