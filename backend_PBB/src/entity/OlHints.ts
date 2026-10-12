import { Column, Entity } from "typeorm";

@Entity("OL$HINTS", { schema: "PBB_KUTAI-BARAT" })
export class OlHints {
  @Column("character varying", { name: "OL_NAME", nullable: true, length: 128 })
  olName!: string | null;

  @Column("numeric", {
    name: "HINT#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hint!: string | null;

  @Column("character varying", {
    name: "CATEGORY",
    nullable: true,
    length: 128,
  })
  category!: string | null;

  @Column("numeric", {
    name: "HINT_TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hintType!: string | null;

  @Column("character varying", {
    name: "HINT_TEXT",
    nullable: true,
    length: 512,
  })
  hintText!: string | null;

  @Column("numeric", {
    name: "STAGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  stage!: string | null;

  @Column("numeric", {
    name: "NODE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  node!: string | null;

  @Column("character varying", {
    name: "TABLE_NAME",
    nullable: true,
    length: 128,
  })
  tableName!: string | null;

  @Column("numeric", {
    name: "TABLE_TIN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tableTin!: string | null;

  @Column("numeric", {
    name: "TABLE_POS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tablePos!: string | null;

  @Column("numeric", {
    name: "REF_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  refId!: string | null;

  @Column("character varying", {
    name: "USER_TABLE_NAME",
    nullable: true,
    length: 260,
  })
  userTableName!: string | null;

  @Column("double precision", { name: "COST", nullable: true, precision: 53 })
  cost!: number | null;

  @Column("double precision", {
    name: "CARDINALITY",
    nullable: true,
    precision: 53,
  })
  cardinality!: number | null;

  @Column("double precision", { name: "BYTES", nullable: true, precision: 53 })
  bytes!: number | null;

  @Column("numeric", {
    name: "HINT_TEXTOFF",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hintTextoff!: string | null;

  @Column("numeric", {
    name: "HINT_TEXTLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hintTextlen!: string | null;

  @Column("character varying", {
    name: "JOIN_PRED",
    nullable: true,
    length: 2000,
  })
  joinPred!: string | null;

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

  @Column("text", { name: "HINT_STRING", nullable: true })
  hintString!: string | null;
}
