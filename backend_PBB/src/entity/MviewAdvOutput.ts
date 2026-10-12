import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_OUTPUT", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvOutput {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "OUTPUT_TYPE", precision: 1000, scale: 53 })
  outputType!: string;

  @Column("numeric", { name: "RANK#", precision: 1000, scale: 53 })
  rank!: string;

  @Column("character varying", {
    name: "ACTION_TYPE",
    nullable: true,
    length: 6,
  })
  actionType!: string | null;

  @Column("character varying", {
    name: "SUMMARY_OWNER",
    nullable: true,
    length: 128,
  })
  summaryOwner!: string | null;

  @Column("character varying", {
    name: "SUMMARY_NAME",
    nullable: true,
    length: 128,
  })
  summaryName!: string | null;

  @Column("character varying", {
    name: "GROUP_BY_COLUMNS",
    nullable: true,
    length: 2000,
  })
  groupByColumns!: string | null;

  @Column("character varying", {
    name: "WHERE_CLAUSE",
    nullable: true,
    length: 2000,
  })
  whereClause!: string | null;

  @Column("character varying", {
    name: "FROM_CLAUSE",
    nullable: true,
    length: 2000,
  })
  fromClause!: string | null;

  @Column("character varying", {
    name: "MEASURES_LIST",
    nullable: true,
    length: 2000,
  })
  measuresList!: string | null;

  @Column("character varying", {
    name: "FACT_TABLES",
    nullable: true,
    length: 1000,
  })
  factTables!: string | null;

  @Column("character varying", {
    name: "GROUPING_LEVELS",
    nullable: true,
    length: 2000,
  })
  groupingLevels!: string | null;

  @Column("numeric", {
    name: "QUERYLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  querylen!: string | null;

  @Column("text", { name: "QUERY_TEXT", nullable: true })
  queryText!: string | null;

  @Column("numeric", {
    name: "STORAGE_IN_BYTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  storageInBytes!: string | null;

  @Column("numeric", {
    name: "PCT_PERFORMANCE_GAIN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pctPerformanceGain!: string | null;

  @Column("numeric", {
    name: "FREQUENCY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  frequency!: string | null;

  @Column("numeric", {
    name: "CUMULATIVE_BENEFIT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cumulativeBenefit!: string | null;

  @Column("numeric", {
    name: "BENEFIT_TO_COST_RATIO",
    precision: 1000,
    scale: 53,
  })
  benefitToCostRatio!: string;

  @Column("numeric", {
    name: "VALIDATED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  validated!: string | null;
}
