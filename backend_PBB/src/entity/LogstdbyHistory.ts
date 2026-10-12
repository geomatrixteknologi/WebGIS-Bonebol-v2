import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$HISTORY", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyHistory {
  @Column("numeric", {
    name: "STREAM_SEQUENCE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  streamSequence!: string | null;

  @Column("numeric", {
    name: "LMNR_SID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lmnrSid!: string | null;

  @Column("numeric", {
    name: "DBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbid!: string | null;

  @Column("numeric", {
    name: "FIRST_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstChange!: string | null;

  @Column("numeric", {
    name: "LAST_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lastChange!: string | null;

  @Column("numeric", {
    name: "SOURCE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  source!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("timestamp without time zone", { name: "FIRST_TIME", nullable: true })
  firstTime!: Date | null;

  @Column("timestamp without time zone", { name: "LAST_TIME", nullable: true })
  lastTime!: Date | null;

  @Column("character varying", { name: "DGNAME", nullable: true, length: 255 })
  dgname!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 2000 })
  spare3!: string | null;
}
