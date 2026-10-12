import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$EDS_TABLES", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyEdsTables {
  @Column("character varying", { name: "OWNER", length: 128 })
  owner!: string;

  @Column("character varying", { name: "TABLE_NAME", length: 128 })
  tableName!: string;

  @Column("character varying", {
    name: "SHADOW_TABLE_NAME",
    nullable: true,
    length: 128,
  })
  shadowTableName!: string | null;

  @Column("character varying", {
    name: "BASE_TRIGGER_NAME",
    nullable: true,
    length: 128,
  })
  baseTriggerName!: string | null;

  @Column("character varying", {
    name: "SHADOW_TRIGGER_NAME",
    nullable: true,
    length: 128,
  })
  shadowTriggerName!: string | null;

  @Column("character varying", { name: "DBLINK", nullable: true, length: 255 })
  dblink!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("character varying", { name: "STATE", nullable: true, length: 255 })
  state!: string | null;

  @Column("numeric", {
    name: "OBJV",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  objv!: string | null;

  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "SOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sobj!: string | null;

  @Column("timestamp without time zone", { name: "CTIME", nullable: true })
  ctime!: Date | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("character varying", { name: "SPARE2", nullable: true, length: 255 })
  spare2!: string | null;

  @Column("numeric", {
    name: "SPARE3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare3!: string | null;

  @Column("character varying", {
    name: "MVIEW_NAME",
    nullable: true,
    length: 128,
  })
  mviewName!: string | null;

  @Column("character varying", {
    name: "MVIEW_LOG_NAME",
    nullable: true,
    length: 128,
  })
  mviewLogName!: string | null;

  @Column("character varying", {
    name: "MVIEW_TRIGGER_NAME",
    nullable: true,
    length: 128,
  })
  mviewTriggerName!: string | null;
}
