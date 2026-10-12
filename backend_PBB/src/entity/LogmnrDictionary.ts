import { Column, Entity } from "typeorm";

@Entity("LOGMNR_DICTIONARY$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrDictionary {
  @Column("character varying", { name: "DB_NAME", nullable: true, length: 27 })
  dbName!: string | null;

  @Column("numeric", { name: "DB_ID", nullable: true, precision: 20, scale: 0 })
  dbId!: string | null;

  @Column("character varying", {
    name: "DB_CREATED",
    nullable: true,
    length: 20,
  })
  dbCreated!: string | null;

  @Column("character varying", {
    name: "DB_DICT_CREATED",
    nullable: true,
    length: 20,
  })
  dbDictCreated!: string | null;

  @Column("numeric", {
    name: "DB_DICT_SCN",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dbDictScn!: string | null;

  @Column("bytea", { name: "DB_THREAD_MAP", nullable: true })
  dbThreadMap!: Buffer | null;

  @Column("numeric", {
    name: "DB_TXN_SCNBAS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dbTxnScnbas!: string | null;

  @Column("numeric", {
    name: "DB_TXN_SCNWRP",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dbTxnScnwrp!: string | null;

  @Column("numeric", {
    name: "DB_RESETLOGS_CHANGE#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dbResetlogsChange!: string | null;

  @Column("character varying", {
    name: "DB_RESETLOGS_TIME",
    nullable: true,
    length: 20,
  })
  dbResetlogsTime!: string | null;

  @Column("character varying", {
    name: "DB_VERSION_TIME",
    nullable: true,
    length: 20,
  })
  dbVersionTime!: string | null;

  @Column("character varying", {
    name: "DB_REDO_TYPE_ID",
    nullable: true,
    length: 8,
  })
  dbRedoTypeId!: string | null;

  @Column("character varying", {
    name: "DB_REDO_RELEASE",
    nullable: true,
    length: 60,
  })
  dbRedoRelease!: string | null;

  @Column("character varying", {
    name: "DB_CHARACTER_SET",
    nullable: true,
    length: 192,
  })
  dbCharacterSet!: string | null;

  @Column("character varying", {
    name: "DB_VERSION",
    nullable: true,
    length: 240,
  })
  dbVersion!: string | null;

  @Column("character varying", {
    name: "DB_STATUS",
    nullable: true,
    length: 240,
  })
  dbStatus!: string | null;

  @Column("character varying", {
    name: "DB_GLOBAL_NAME",
    nullable: true,
    length: 384,
  })
  dbGlobalName!: string | null;

  @Column("numeric", {
    name: "DB_DICT_MAXOBJECTS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  dbDictMaxobjects!: string | null;

  @Column("numeric", { name: "DB_DICT_OBJECTCOUNT", precision: 22, scale: 0 })
  dbDictObjectcount!: string;

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

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 384,
  })
  pdbName!: string | null;

  @Column("numeric", {
    name: "PDB_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbId!: string | null;

  @Column("numeric", {
    name: "PDB_UID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbUid!: string | null;

  @Column("numeric", {
    name: "PDB_DBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbDbid!: string | null;

  @Column("bytea", { name: "PDB_GUID", nullable: true })
  pdbGuid!: Buffer | null;

  @Column("numeric", {
    name: "PDB_CREATE_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbCreateScn!: string | null;

  @Column("numeric", {
    name: "PDB_COUNT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbCount!: string | null;

  @Column("character varying", {
    name: "PDB_GLOBAL_NAME",
    nullable: true,
    length: 384,
  })
  pdbGlobalName!: string | null;

  @Column("numeric", {
    name: "FED_ROOT_CON_ID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fedRootConId!: string | null;
}
