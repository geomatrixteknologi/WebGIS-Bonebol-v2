import { Column, Entity } from "typeorm";

@Entity("LOGMNR_CONTAINER$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrContainer {
  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", { name: "CON_ID#", precision: 1000, scale: 53 })
  conId!: string;

  @Column("numeric", { name: "DBID", precision: 1000, scale: 53 })
  dbid!: string;

  @Column("numeric", { name: "CON_UID", precision: 1000, scale: 53 })
  conUid!: string;

  @Column("numeric", { name: "CREATE_SCNWRP", precision: 1000, scale: 53 })
  createScnwrp!: string;

  @Column("numeric", { name: "CREATE_SCNBAS", precision: 1000, scale: 53 })
  createScnbas!: string;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", { name: "STATUS", precision: 1000, scale: 53 })
  status!: string;

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
    name: "VSN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  vsn!: string | null;

  @Column("numeric", {
    name: "FED_ROOT_CON_ID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fedRootConId!: string | null;
}
