import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PROFILE_TABLE_STATS$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrProfileTableStats {
  @Column("character varying", { name: "OWNER", nullable: true, length: 384 })
  owner!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 384 })
  name!: string | null;

  @Column("numeric", { name: "OBJID", precision: 1000, scale: 53 })
  objid!: string;

  @Column("numeric", {
    name: "OPNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  opnum!: string | null;

  @Column("numeric", {
    name: "TLSBYUNSUPPOPNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tlsbyunsuppopnum!: string | null;

  @Column("numeric", {
    name: "OGGUNSUPPOPNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oggunsuppopnum!: string | null;

  @Column("numeric", {
    name: "OGGFETCHOPNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oggfetchopnum!: string | null;

  @Column("numeric", {
    name: "OGGPLSQLOPNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  oggplsqlopnum!: string | null;

  @Column("numeric", {
    name: "PARTNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  partnum!: string | null;

  @Column("numeric", {
    name: "INSERTNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  insertnum!: string | null;

  @Column("numeric", {
    name: "UPDATENUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  updatenum!: string | null;

  @Column("numeric", {
    name: "DELETENUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  deletenum!: string | null;

  @Column("numeric", {
    name: "DDLNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ddlnum!: string | null;

  @Column("numeric", {
    name: "PROPERTY1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property1!: string | null;

  @Column("numeric", {
    name: "PROPERTY2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  property2!: string | null;

  @Column("numeric", {
    name: "PARTITIONATTR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  partitionattr!: string | null;

  @Column("numeric", {
    name: "REDOSIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  redosize!: string | null;

  @Column("numeric", {
    name: "MAXLOBSIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  maxlobsize!: string | null;

  @Column("numeric", {
    name: "REDORATE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  redorate!: string | null;

  @Column("character varying", { name: "SPARE1", nullable: true, length: 384 })
  spare1!: string | null;

  @Column("character varying", { name: "SPARE2", nullable: true, length: 384 })
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

  @Column("numeric", {
    name: "SPARE6",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare6!: string | null;
}
