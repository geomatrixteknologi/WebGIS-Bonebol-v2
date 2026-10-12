import { Column, Entity } from "typeorm";

@Entity("LOGMNR_LOG$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrLog {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", { name: "THREAD#", precision: 1000, scale: 53 })
  thread!: string;

  @Column("numeric", { name: "SEQUENCE#", precision: 1000, scale: 53 })
  sequence!: string;

  @Column("numeric", { name: "FIRST_CHANGE#", precision: 1000, scale: 53 })
  firstChange!: string;

  @Column("numeric", {
    name: "NEXT_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextChange!: string | null;

  @Column("timestamp without time zone", { name: "FIRST_TIME", nullable: true })
  firstTime!: Date | null;

  @Column("timestamp without time zone", { name: "NEXT_TIME", nullable: true })
  nextTime!: Date | null;

  @Column("character varying", {
    name: "FILE_NAME",
    nullable: true,
    length: 513,
  })
  fileName!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("character varying", { name: "INFO", nullable: true, length: 32 })
  info!: string | null;

  @Column("timestamp without time zone", { name: "TIMESTAMP", nullable: true })
  timestamp!: Date | null;

  @Column("character varying", {
    name: "DICT_BEGIN",
    nullable: true,
    length: 3,
  })
  dictBegin!: string | null;

  @Column("character varying", { name: "DICT_END", nullable: true, length: 3 })
  dictEnd!: string | null;

  @Column("character varying", {
    name: "STATUS_INFO",
    nullable: true,
    length: 32,
  })
  statusInfo!: string | null;

  @Column("numeric", { name: "DB_ID", precision: 1000, scale: 53 })
  dbId!: string;

  @Column("numeric", { name: "RESETLOGS_CHANGE#", precision: 1000, scale: 53 })
  resetlogsChange!: string;

  @Column("numeric", { name: "RESET_TIMESTAMP", precision: 1000, scale: 53 })
  resetTimestamp!: string;

  @Column("numeric", {
    name: "PREV_RESETLOGS_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prevResetlogsChange!: string | null;

  @Column("numeric", {
    name: "PREV_RESET_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prevResetTimestamp!: string | null;

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
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "CONTENTS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  contents!: string | null;

  @Column("numeric", {
    name: "RECID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  recid!: string | null;

  @Column("numeric", {
    name: "RECSTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  recstamp!: string | null;

  @Column("numeric", {
    name: "MARK_DELETE_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  markDeleteTimestamp!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

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

  @Column("numeric", {
    name: "SPARE5",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare5!: string | null;
}
