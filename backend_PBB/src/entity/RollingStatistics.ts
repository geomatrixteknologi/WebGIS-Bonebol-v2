import { Column, Entity } from "typeorm";

@Entity("ROLLING$STATISTICS", { schema: "PBB_KUTAI-BARAT" })
export class RollingStatistics {
  @Column("numeric", {
    name: "STATID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  statid!: string | null;

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
    name: "TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 256 })
  name!: string | null;

  @Column("character varying", {
    name: "VALUESTR",
    nullable: true,
    length: 256,
  })
  valuestr!: string | null;

  @Column("numeric", {
    name: "VALUENUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  valuenum!: string | null;

  @Column("timestamp without time zone", { name: "VALUETS", nullable: true })
  valuets!: Date | null;

  @Column("text", { name: "VALUEINT", nullable: true })
  valueint!: string | null;

  @Column("timestamp without time zone", {
    name: "UPDATE_TIME",
    nullable: true,
  })
  updateTime!: Date | null;

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
