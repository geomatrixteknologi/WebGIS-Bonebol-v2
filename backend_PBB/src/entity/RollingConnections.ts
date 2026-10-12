import { Column, Entity } from "typeorm";

@Entity("ROLLING$CONNECTIONS", { schema: "PBB_KUTAI-BARAT" })
export class RollingConnections {
  @Column("numeric", {
    name: "SOURCE_RDBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sourceRdbid!: string | null;

  @Column("numeric", {
    name: "DEST_RDBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  destRdbid!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attributes!: string | null;

  @Column("character varying", {
    name: "SERVICE_NAME",
    nullable: true,
    length: 256,
  })
  serviceName!: string | null;

  @Column("numeric", {
    name: "CONN_HANDLE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  connHandle!: string | null;

  @Column("timestamp without time zone", {
    name: "CONNECT_TIME",
    nullable: true,
  })
  connectTime!: Date | null;

  @Column("timestamp without time zone", { name: "SEND_TIME", nullable: true })
  sendTime!: Date | null;

  @Column("timestamp without time zone", {
    name: "DISCONNECT_TIME",
    nullable: true,
  })
  disconnectTime!: Date | null;

  @Column("timestamp without time zone", {
    name: "UPDATE_TIME",
    nullable: true,
  })
  updateTime!: Date | null;

  @Column("numeric", {
    name: "SOURCE_PID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sourcePid!: string | null;

  @Column("numeric", {
    name: "DEST_PID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  destPid!: string | null;

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
