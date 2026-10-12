import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_WORKLOAD", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvWorkload {
  @Column("numeric", { name: "QUERYID#", precision: 1000, scale: 53 })
  queryid!: string;

  @Column("numeric", { name: "COLLECTIONID#", precision: 1000, scale: 53 })
  collectionid!: string;

  @Column("timestamp without time zone", { name: "COLLECTTIME" })
  collecttime!: Date;

  @Column("character varying", {
    name: "APPLICATION",
    nullable: true,
    length: 128,
  })
  application!: string | null;

  @Column("numeric", {
    name: "CARDINALITY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cardinality!: string | null;

  @Column("numeric", {
    name: "RESULTSIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  resultsize!: string | null;

  @Column("character varying", { name: "UNAME", length: 128 })
  uname!: string;

  @Column("timestamp without time zone", { name: "QDATE", nullable: true })
  qdate!: Date | null;

  @Column("numeric", {
    name: "PRIORITY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  priority!: string | null;

  @Column("numeric", {
    name: "EXEC_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  execTime!: string | null;

  @Column("text", { name: "SQL_TEXT" })
  sqlText!: string;

  @Column("numeric", { name: "SQL_TEXTLEN", precision: 1000, scale: 53 })
  sqlTextlen!: string;

  @Column("numeric", {
    name: "SQL_HASH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sqlHash!: string | null;

  @Column("bytea", { name: "SQL_ADDR", nullable: true })
  sqlAddr!: Buffer | null;

  @Column("numeric", {
    name: "FREQUENCY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  frequency!: string | null;
}
