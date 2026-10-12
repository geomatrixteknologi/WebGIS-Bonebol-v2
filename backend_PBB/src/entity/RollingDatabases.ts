import { Column, Entity } from "typeorm";

@Entity("ROLLING$DATABASES", { schema: "PBB_KUTAI-BARAT" })
export class RollingDatabases {
  @Column("numeric", {
    name: "RDBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rdbid!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attributes!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTES2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attributes2!: string | null;

  @Column("character varying", { name: "DBUN", nullable: true, length: 128 })
  dbun!: string | null;

  @Column("numeric", {
    name: "DBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dbid!: string | null;

  @Column("numeric", {
    name: "PROD_RSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prodRscn!: string | null;

  @Column("numeric", {
    name: "PROD_RID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prodRid!: string | null;

  @Column("numeric", {
    name: "PROD_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prodScn!: string | null;

  @Column("numeric", {
    name: "CONS_RSCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  consRscn!: string | null;

  @Column("numeric", {
    name: "CONS_RID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  consRid!: string | null;

  @Column("numeric", {
    name: "CONS_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  consScn!: string | null;

  @Column("numeric", {
    name: "ENGINE_STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  engineStatus!: string | null;

  @Column("character varying", { name: "VERSION", nullable: true, length: 128 })
  version!: string | null;

  @Column("numeric", {
    name: "REDO_SOURCE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  redoSource!: string | null;

  @Column("timestamp without time zone", {
    name: "UPDATE_TIME",
    nullable: true,
  })
  updateTime!: Date | null;

  @Column("numeric", {
    name: "REVISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  revision!: string | null;

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
