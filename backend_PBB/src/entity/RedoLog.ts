import { Column, Entity } from "typeorm";

@Entity("REDO_LOG", { schema: "PBB_KUTAI-BARAT" })
export class RedoLog {
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

  @Column("numeric", { name: "SEQUENCE#", precision: 1000, scale: 53 })
  sequence!: string;

  @Column("numeric", {
    name: "DUPID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dupid!: string | null;

  @Column("numeric", {
    name: "STATUS1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status1!: string | null;

  @Column("numeric", {
    name: "STATUS2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status2!: string | null;

  @Column("character varying", {
    name: "CREATE_TIME",
    nullable: true,
    length: 32,
  })
  createTime!: string | null;

  @Column("character varying", {
    name: "CLOSE_TIME",
    nullable: true,
    length: 32,
  })
  closeTime!: string | null;

  @Column("character varying", {
    name: "DONE_TIME",
    nullable: true,
    length: 32,
  })
  doneTime!: string | null;

  @Column("numeric", {
    name: "FIRST_SCN_BAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstScnBas!: string | null;

  @Column("numeric", {
    name: "FIRST_SCN_WRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstScnWrp!: string | null;

  @Column("numeric", {
    name: "FIRST_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstTime!: string | null;

  @Column("numeric", {
    name: "NEXT_SCN_BAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextScnBas!: string | null;

  @Column("numeric", {
    name: "NEXT_SCN_WRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextScnWrp!: string | null;

  @Column("numeric", {
    name: "NEXT_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextTime!: string | null;

  @Column("numeric", {
    name: "FIRST_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstScn!: string | null;

  @Column("numeric", {
    name: "NEXT_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextScn!: string | null;

  @Column("numeric", { name: "RESETLOGS_SCN", precision: 1000, scale: 53 })
  resetlogsScn!: string;

  @Column("numeric", {
    name: "BLOCKS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  blocks!: string | null;

  @Column("numeric", {
    name: "BLOCK_SIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  blockSize!: string | null;

  @Column("numeric", {
    name: "OLD_BLOCKS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oldBlocks!: string | null;

  @Column("timestamp without time zone", {
    name: "CREATE_DATE",
    nullable: true,
  })
  createDate!: Date | null;

  @Column("numeric", {
    name: "ERROR1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  error1!: string | null;

  @Column("numeric", {
    name: "ERROR2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  error2!: string | null;

  @Column("character varying", {
    name: "FILENAME",
    nullable: true,
    length: 513,
  })
  filename!: string | null;

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
    name: "ENDIAN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endian!: string | null;

  @Column("numeric", {
    name: "SPARE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare2!: string | null;

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

  @Column("numeric", { name: "PRESETLOGS_SCN", precision: 1000, scale: 53 })
  presetlogsScn!: string;

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
    name: "OLD_STATUS1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oldStatus1!: string | null;

  @Column("numeric", {
    name: "OLD_STATUS2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oldStatus2!: string | null;

  @Column("character varying", {
    name: "OLD_FILENAME",
    nullable: true,
    length: 513,
  })
  oldFilename!: string | null;
}
