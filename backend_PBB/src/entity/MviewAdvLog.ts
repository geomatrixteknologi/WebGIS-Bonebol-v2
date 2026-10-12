import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_LOG", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvLog {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", {
    name: "FILTERID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  filterid!: string | null;

  @Column("timestamp without time zone", { name: "RUN_BEGIN", nullable: true })
  runBegin!: Date | null;

  @Column("timestamp without time zone", { name: "RUN_END", nullable: true })
  runEnd!: Date | null;

  @Column("numeric", {
    name: "RUN_TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  runType!: string | null;

  @Column("character varying", { name: "UNAME", nullable: true, length: 128 })
  uname!: string | null;

  @Column("numeric", { name: "STATUS", precision: 1000, scale: 53 })
  status!: string;

  @Column("character varying", {
    name: "MESSAGE",
    nullable: true,
    length: 2000,
  })
  message!: string | null;

  @Column("numeric", {
    name: "COMPLETED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  completed!: string | null;

  @Column("numeric", {
    name: "TOTAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  total!: string | null;

  @Column("character varying", {
    name: "ERROR_CODE",
    nullable: true,
    length: 20,
  })
  errorCode!: string | null;
}
