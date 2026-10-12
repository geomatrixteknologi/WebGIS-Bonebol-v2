import { Column, Entity } from "typeorm";

@Entity("LOGMNR_CON$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrCon {
  @Column("numeric", { name: "OWNER#", precision: 1000, scale: 53 })
  owner!: string;

  @Column("character varying", { name: "NAME", length: 384 })
  name!: string;

  @Column("numeric", { name: "CON#", precision: 1000, scale: 53 })
  con!: string;

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
    name: "START_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnbas!: string | null;

  @Column("numeric", {
    name: "START_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnwrp!: string | null;
}
