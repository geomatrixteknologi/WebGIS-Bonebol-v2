import { Column, Entity } from "typeorm";

@Entity("LOGMNR_TS$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrTs {
  @Column("numeric", { name: "TS#", nullable: true, precision: 22, scale: 0 })
  ts!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 90 })
  name!: string | null;

  @Column("numeric", {
    name: "OWNER#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  owner!: string | null;

  @Column("numeric", { name: "BLOCKSIZE", precision: 22, scale: 0 })
  blocksize!: string;

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
