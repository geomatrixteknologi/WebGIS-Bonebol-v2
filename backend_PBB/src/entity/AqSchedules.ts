import { Column, Entity } from "typeorm";

@Entity("AQ$_SCHEDULES", { schema: "PBB_KUTAI-BARAT" })
export class AqSchedules {
  @Column("bytea", { name: "OID" })
  oid!: Buffer;

  @Column("character varying", { name: "DESTINATION", length: 390 })
  destination!: string;

  @Column("timestamp without time zone", { name: "START_TIME", nullable: true })
  startTime!: Date | null;

  @Column("character varying", { name: "DURATION", nullable: true, length: 8 })
  duration!: string | null;

  @Column("character varying", {
    name: "NEXT_TIME",
    nullable: true,
    length: 128,
  })
  nextTime!: string | null;

  @Column("character varying", { name: "LATENCY", nullable: true, length: 8 })
  latency!: string | null;

  @Column("timestamp without time zone", { name: "LAST_TIME", nullable: true })
  lastTime!: Date | null;

  @Column("numeric", {
    name: "JOBNO",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jobno!: string | null;
}
