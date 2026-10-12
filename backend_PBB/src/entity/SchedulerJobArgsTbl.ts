import { Column, Entity } from "typeorm";

@Entity("SCHEDULER_JOB_ARGS_TBL", { schema: "PBB_KUTAI-BARAT" })
export class SchedulerJobArgsTbl {
  @Column("character varying", { name: "OWNER", nullable: true, length: 128 })
  owner!: string | null;

  @Column("character varying", {
    name: "JOB_NAME",
    nullable: true,
    length: 128,
  })
  jobName!: string | null;

  @Column("character varying", {
    name: "ARGUMENT_NAME",
    nullable: true,
    length: 128,
  })
  argumentName!: string | null;

  @Column("numeric", {
    name: "ARGUMENT_POSITION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  argumentPosition!: string | null;

  @Column("character varying", {
    name: "ARGUMENT_TYPE",
    nullable: true,
    length: 257,
  })
  argumentType!: string | null;

  @Column("character varying", { name: "VALUE", nullable: true, length: 4000 })
  value!: string | null;

  @Column("character varying", {
    name: "ANYDATA_VALUE",
    nullable: true,
    length: 3752,
  })
  anydataValue!: string | null;

  @Column("character varying", {
    name: "OUT_ARGUMENT",
    nullable: true,
    length: 5,
  })
  outArgument!: string | null;
}
