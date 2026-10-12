import { Column, Entity } from "typeorm";

@Entity("ROLLING$EVENTS", { schema: "PBB_KUTAI-BARAT" })
export class RollingEvents {
  @Column("numeric", {
    name: "EVENTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  eventid!: string | null;

  @Column("numeric", {
    name: "INSTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  instid!: string | null;

  @Column("numeric", {
    name: "REVISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  revision!: string | null;

  @Column("timestamp without time zone", { name: "EVENT_TIME", nullable: true })
  eventTime!: Date | null;

  @Column("character varying", { name: "TYPE", nullable: true, length: 16 })
  type!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("character varying", { name: "MESSAGE", nullable: true, length: 256 })
  message!: string | null;

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
