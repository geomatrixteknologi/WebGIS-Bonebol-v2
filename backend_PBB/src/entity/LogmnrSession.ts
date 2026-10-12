import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SESSION$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrSession {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", {
    name: "CLIENT#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  client!: string | null;

  @Column("character varying", { name: "SESSION_NAME", length: 128 })
  sessionName!: string;

  @Column("numeric", {
    name: "DB_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbId!: string | null;

  @Column("numeric", {
    name: "RESETLOGS_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resetlogsChange!: string | null;

  @Column("numeric", {
    name: "SESSION_ATTR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sessionAttr!: string | null;

  @Column("character varying", {
    name: "SESSION_ATTR_VERBOSE",
    nullable: true,
    length: 400,
  })
  sessionAttrVerbose!: string | null;

  @Column("numeric", {
    name: "START_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScn!: string | null;

  @Column("numeric", {
    name: "END_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endScn!: string | null;

  @Column("numeric", {
    name: "SPILL_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spillScn!: string | null;

  @Column("timestamp without time zone", { name: "SPILL_TIME", nullable: true })
  spillTime!: Date | null;

  @Column("numeric", {
    name: "OLDEST_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oldestScn!: string | null;

  @Column("numeric", {
    name: "RESUME_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resumeScn!: string | null;

  @Column("character varying", {
    name: "GLOBAL_DB_NAME",
    nullable: true,
    length: 384,
  })
  globalDbName!: string | null;

  @Column("numeric", {
    name: "RESET_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resetTimestamp!: string | null;

  @Column("numeric", {
    name: "BRANCH_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  branchScn!: string | null;

  @Column("character varying", { name: "VERSION", nullable: true, length: 64 })
  version!: string | null;

  @Column("character varying", {
    name: "REDO_COMPAT",
    nullable: true,
    length: 20,
  })
  redoCompat!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("numeric", {
    name: "PURGE_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  purgeScn!: string | null;

  @Column("numeric", {
    name: "SPARE3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare3!: string | null;

  @Column("numeric", {
    name: "SPARE4",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare4!: string | null;

  @Column("numeric", {
    name: "SPARE5",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare5!: string | null;

  @Column("timestamp without time zone", { name: "SPARE6", nullable: true })
  spare6!: Date | null;

  @Column("character varying", { name: "SPARE7", nullable: true, length: 1000 })
  spare7!: string | null;

  @Column("character varying", { name: "SPARE8", nullable: true, length: 1000 })
  spare8!: string | null;

  @Column("numeric", {
    name: "SPARE9",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare9!: string | null;
}
