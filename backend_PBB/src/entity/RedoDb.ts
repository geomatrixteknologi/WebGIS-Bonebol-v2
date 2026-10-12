import { Column, Entity } from "typeorm";

@Entity("REDO_DB", { schema: "PBB_KUTAI-BARAT" })
export class RedoDb {
  @Column("numeric", { name: "DBID", precision: 1000, scale: 53 })
  dbid!: string;

  @Column("character varying", {
    name: "GLOBAL_DBNAME",
    nullable: true,
    length: 129,
  })
  globalDbname!: string | null;

  @Column("character varying", { name: "DBUNAME", nullable: true, length: 32 })
  dbuname!: string | null;

  @Column("character varying", { name: "VERSION", nullable: true, length: 32 })
  version!: string | null;

  @Column("numeric", { name: "THREAD#", precision: 1000, scale: 53 })
  thread!: string;

  @Column("numeric", {
    name: "RESETLOGS_SCN_BAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resetlogsScnBas!: string | null;

  @Column("numeric", {
    name: "RESETLOGS_SCN_WRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resetlogsScnWrp!: string | null;

  @Column("numeric", { name: "RESETLOGS_TIME", precision: 1000, scale: 53 })
  resetlogsTime!: string;

  @Column("numeric", {
    name: "PRESETLOGS_SCN_BAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  presetlogsScnBas!: string | null;

  @Column("numeric", {
    name: "PRESETLOGS_SCN_WRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  presetlogsScnWrp!: string | null;

  @Column("numeric", { name: "PRESETLOGS_TIME", precision: 1000, scale: 53 })
  presetlogsTime!: string;

  @Column("numeric", {
    name: "SEQNO_RCV_CUR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoRcvCur!: string | null;

  @Column("numeric", {
    name: "SEQNO_RCV_LO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoRcvLo!: string | null;

  @Column("numeric", {
    name: "SEQNO_RCV_HI",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoRcvHi!: string | null;

  @Column("numeric", {
    name: "SEQNO_DONE_CUR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoDoneCur!: string | null;

  @Column("numeric", {
    name: "SEQNO_DONE_LO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoDoneLo!: string | null;

  @Column("numeric", {
    name: "SEQNO_DONE_HI",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqnoDoneHi!: string | null;

  @Column("numeric", {
    name: "GAP_SEQNO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapSeqno!: string | null;

  @Column("numeric", {
    name: "GAP_RET",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapRet!: string | null;

  @Column("numeric", {
    name: "GAP_DONE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapDone!: string | null;

  @Column("numeric", {
    name: "APPLY_SEQNO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  applySeqno!: string | null;

  @Column("numeric", {
    name: "APPLY_DONE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  applyDone!: string | null;

  @Column("numeric", {
    name: "PURGE_DONE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  purgeDone!: string | null;

  @Column("numeric", {
    name: "HAS_CHILD",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hasChild!: string | null;

  @Column("numeric", {
    name: "ERROR1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  error1!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("timestamp without time zone", {
    name: "CREATE_DATE",
    nullable: true,
  })
  createDate!: Date | null;

  @Column("numeric", {
    name: "TS1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ts1!: string | null;

  @Column("numeric", {
    name: "TS2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ts2!: string | null;

  @Column("numeric", {
    name: "GAP_NEXT_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapNextScn!: string | null;

  @Column("numeric", {
    name: "GAP_NEXT_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapNextTime!: string | null;

  @Column("numeric", {
    name: "CURSCN_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  curscnTime!: string | null;

  @Column("numeric", { name: "RESETLOGS_SCN", precision: 1000, scale: 53 })
  resetlogsScn!: string;

  @Column("numeric", { name: "PRESETLOGS_SCN", precision: 1000, scale: 53 })
  presetlogsScn!: string;

  @Column("numeric", {
    name: "GAP_RET2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  gapRet2!: string | null;

  @Column("numeric", {
    name: "CURLOG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  curlog!: string | null;

  @Column("numeric", {
    name: "ENDIAN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endian!: string | null;

  @Column("numeric", {
    name: "ENQIDX",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  enqidx!: string | null;

  @Column("numeric", {
    name: "SPARE4",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare4!: string | null;

  @Column("timestamp without time zone", { name: "SPARE5", nullable: true })
  spare5!: Date | null;

  @Column("character varying", { name: "SPARE6", nullable: true, length: 65 })
  spare6!: string | null;

  @Column("character varying", { name: "SPARE7", nullable: true, length: 129 })
  spare7!: string | null;

  @Column("numeric", {
    name: "TS3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ts3!: string | null;

  @Column("numeric", {
    name: "CURBLKNO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  curblkno!: string | null;

  @Column("numeric", {
    name: "SPARE8",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare8!: string | null;

  @Column("numeric", {
    name: "SPARE9",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare9!: string | null;

  @Column("numeric", {
    name: "SPARE10",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare10!: string | null;

  @Column("numeric", {
    name: "SPARE11",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare11!: string | null;

  @Column("numeric", {
    name: "SPARE12",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare12!: string | null;
}
