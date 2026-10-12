import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_GSBA", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcGsba {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "AS_OF_SCN", precision: 1000, scale: 53 })
  asOfScn!: string;

  @Column("numeric", {
    name: "FDO_LENGTH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fdoLength!: string | null;

  @Column("bytea", { name: "FDO_VALUE", nullable: true })
  fdoValue!: Buffer | null;

  @Column("numeric", {
    name: "CHARSETID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  charsetid!: string | null;

  @Column("numeric", {
    name: "NCHARSETID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ncharsetid!: string | null;

  @Column("numeric", {
    name: "DBTIMEZONE_LEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbtimezoneLen!: string | null;

  @Column("character varying", {
    name: "DBTIMEZONE_VALUE",
    nullable: true,
    length: 192,
  })
  dbtimezoneValue!: string | null;

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

  @Column("character varying", {
    name: "DB_GLOBAL_NAME",
    nullable: true,
    length: 384,
  })
  dbGlobalName!: string | null;
}
