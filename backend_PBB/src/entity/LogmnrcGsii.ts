import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_GSII", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcGsii {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", { name: "BO#", precision: 1000, scale: 53 })
  bo!: string;

  @Column("numeric", { name: "INDTYPE#", precision: 1000, scale: 53 })
  indtype!: string;

  @Column("numeric", {
    name: "DROP_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropScn!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare1!: string | null;

  @Column("numeric", {
    name: "LOGMNR_SPARE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrSpare2!: string | null;

  @Column("character varying", {
    name: "LOGMNR_SPARE3",
    nullable: true,
    length: 1000,
  })
  logmnrSpare3!: string | null;

  @Column("timestamp without time zone", {
    name: "LOGMNR_SPARE4",
    nullable: true,
  })
  logmnrSpare4!: Date | null;
}
