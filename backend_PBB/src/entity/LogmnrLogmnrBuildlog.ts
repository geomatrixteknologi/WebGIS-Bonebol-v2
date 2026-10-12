import { Column, Entity } from "typeorm";

@Entity("LOGMNR_LOGMNR_BUILDLOG", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrLogmnrBuildlog {
  @Column("character varying", {
    name: "BUILD_DATE",
    nullable: true,
    length: 20,
  })
  buildDate!: string | null;

  @Column("numeric", {
    name: "DB_TXN_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbTxnScnbas!: string | null;

  @Column("numeric", {
    name: "DB_TXN_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbTxnScnwrp!: string | null;

  @Column("numeric", {
    name: "CURRENT_BUILD_STATE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  currentBuildState!: string | null;

  @Column("numeric", {
    name: "COMPLETION_STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  completionStatus!: string | null;

  @Column("numeric", {
    name: "MARKED_LOG_FILE_LOW_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  markedLogFileLowScn!: string | null;

  @Column("character varying", { name: "INITIAL_XID", length: 22 })
  initialXid!: string;

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

  @Column("character varying", { name: "CDB_XID", nullable: true, length: 22 })
  cdbXid!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("character varying", { name: "SPARE2", nullable: true, length: 4000 })
  spare2!: string | null;
}
