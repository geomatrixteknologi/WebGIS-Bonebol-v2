import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PROFILE_PLSQL_STATS$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrProfilePlsqlStats {
  @Column("character varying", { name: "PKGOWNER", length: 384 })
  pkgowner!: string;

  @Column("character varying", { name: "PKGNAME", length: 384 })
  pkgname!: string;

  @Column("numeric", { name: "NAME", precision: 1000, scale: 53 })
  name!: string;

  @Column("numeric", {
    name: "PRAGMAOP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pragmaop!: string | null;

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
    name: "REDOSIZE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  redosize!: string | null;

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
