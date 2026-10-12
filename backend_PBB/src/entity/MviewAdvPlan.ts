import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_PLAN", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvPlan {
  @Column("character varying", {
    name: "STATEMENT_ID",
    nullable: true,
    length: 30,
  })
  statementId!: string | null;

  @Column("timestamp without time zone", { name: "TIMESTAMP", nullable: true })
  timestamp!: Date | null;

  @Column("character varying", { name: "REMARKS", nullable: true, length: 80 })
  remarks!: string | null;

  @Column("character varying", {
    name: "OPERATION",
    nullable: true,
    length: 30,
  })
  operation!: string | null;

  @Column("character varying", { name: "OPTIONS", nullable: true, length: 255 })
  options!: string | null;

  @Column("character varying", {
    name: "OBJECT_NODE",
    nullable: true,
    length: 128,
  })
  objectNode!: string | null;

  @Column("character varying", {
    name: "OBJECT_OWNER",
    nullable: true,
    length: 128,
  })
  objectOwner!: string | null;

  @Column("character varying", {
    name: "OBJECT_NAME",
    nullable: true,
    length: 128,
  })
  objectName!: string | null;

  @Column("numeric", {
    name: "OBJECT_INSTANCE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  objectInstance!: string | null;

  @Column("character varying", {
    name: "OBJECT_TYPE",
    nullable: true,
    length: 30,
  })
  objectType!: string | null;

  @Column("character varying", {
    name: "OPTIMIZER",
    nullable: true,
    length: 255,
  })
  optimizer!: string | null;

  @Column("numeric", {
    name: "SEARCH_COLUMNS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  searchColumns!: string | null;

  @Column("numeric", { name: "ID", nullable: true, precision: 1000, scale: 53 })
  id!: string | null;

  @Column("numeric", {
    name: "PARENT_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  parentId!: string | null;

  @Column("numeric", {
    name: "POSITION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  position!: string | null;

  @Column("numeric", {
    name: "COST",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cost!: string | null;

  @Column("numeric", {
    name: "CARDINALITY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cardinality!: string | null;

  @Column("numeric", {
    name: "BYTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  bytes!: string | null;

  @Column("character varying", {
    name: "OTHER_TAG",
    nullable: true,
    length: 255,
  })
  otherTag!: string | null;

  @Column("character varying", {
    name: "PARTITION_START",
    nullable: true,
    length: 255,
  })
  partitionStart!: string | null;

  @Column("character varying", {
    name: "PARTITION_STOP",
    nullable: true,
    length: 255,
  })
  partitionStop!: string | null;

  @Column("numeric", {
    name: "PARTITION_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  partitionId!: string | null;

  @Column("text", { name: "OTHER", nullable: true })
  other!: string | null;

  @Column("character varying", {
    name: "DISTRIBUTION",
    nullable: true,
    length: 30,
  })
  distribution!: string | null;

  @Column("numeric", {
    name: "CPU_COST",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cpuCost!: string | null;

  @Column("numeric", {
    name: "IO_COST",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ioCost!: string | null;

  @Column("numeric", {
    name: "TEMP_SPACE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tempSpace!: string | null;
}
