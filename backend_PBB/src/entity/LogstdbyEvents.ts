import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$EVENTS", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyEvents {
  @Column("timestamp without time zone", { name: "EVENT_TIME" })
  eventTime!: Date;

  @Column("numeric", {
    name: "CURRENT_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  currentScn!: string | null;

  @Column("numeric", {
    name: "COMMIT_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  commitScn!: string | null;

  @Column("numeric", {
    name: "XIDUSN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidusn!: string | null;

  @Column("numeric", {
    name: "XIDSLT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidslt!: string | null;

  @Column("numeric", {
    name: "XIDSQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidsqn!: string | null;

  @Column("numeric", {
    name: "ERRVAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  errval!: string | null;

  @Column("character varying", { name: "EVENT", nullable: true, length: 2000 })
  event!: string | null;

  @Column("text", { name: "FULL_EVENT", nullable: true })
  fullEvent!: string | null;

  @Column("character varying", { name: "ERROR", nullable: true, length: 2000 })
  error!: string | null;

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

  @Column("character varying", { name: "CON_NAME", nullable: true, length: 30 })
  conName!: string | null;

  @Column("numeric", {
    name: "CON_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  conId!: string | null;
}
