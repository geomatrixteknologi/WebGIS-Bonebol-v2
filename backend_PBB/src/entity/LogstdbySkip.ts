import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$SKIP", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbySkip {
  @Column("numeric", {
    name: "ERROR",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  error!: string | null;

  @Column("character varying", {
    name: "STATEMENT_OPT",
    nullable: true,
    length: 128,
  })
  statementOpt!: string | null;

  @Column("character varying", { name: "SCHEMA", nullable: true, length: 128 })
  schema!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 261 })
  name!: string | null;

  @Column("numeric", {
    name: "USE_LIKE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  useLike!: string | null;

  @Column("character varying", { name: "ESC", nullable: true, length: 1 })
  esc!: string | null;

  @Column("character varying", { name: "PROC", nullable: true, length: 392 })
  proc!: string | null;

  @Column("numeric", {
    name: "ACTIVE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  active!: string | null;

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
}
