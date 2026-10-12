import { Column, Entity } from "typeorm";

@Entity("ROLLING$STATUS", { schema: "PBB_KUTAI-BARAT" })
export class RollingStatus {
  @Column("numeric", {
    name: "REVISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  revision!: string | null;

  @Column("numeric", {
    name: "PHASE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  phase!: string | null;

  @Column("numeric", {
    name: "BATCHID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  batchid!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("numeric", {
    name: "COORDID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  coordid!: string | null;

  @Column("numeric", {
    name: "OPRIMARY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oprimary!: string | null;

  @Column("numeric", {
    name: "FPRIMARY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fprimary!: string | null;

  @Column("numeric", {
    name: "PID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pid!: string | null;

  @Column("numeric", {
    name: "INSTANCE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  instance!: string | null;

  @Column("numeric", {
    name: "DBTOTAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbtotal!: string | null;

  @Column("numeric", {
    name: "DBACTIVE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbactive!: string | null;

  @Column("character varying", {
    name: "LOCATION",
    nullable: true,
    length: 128,
  })
  location!: string | null;

  @Column("timestamp without time zone", { name: "INIT_TIME", nullable: true })
  initTime!: Date | null;

  @Column("timestamp without time zone", { name: "BUILD_TIME", nullable: true })
  buildTime!: Date | null;

  @Column("timestamp without time zone", { name: "START_TIME", nullable: true })
  startTime!: Date | null;

  @Column("timestamp without time zone", {
    name: "SWITCH_TIME",
    nullable: true,
  })
  switchTime!: Date | null;

  @Column("timestamp without time zone", {
    name: "FINISH_TIME",
    nullable: true,
  })
  finishTime!: Date | null;

  @Column("numeric", {
    name: "LAST_INSTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lastInstid!: string | null;

  @Column("numeric", {
    name: "LAST_BATCHID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lastBatchid!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 128 })
  spare3!: string | null;
}
