import { Column, Entity } from "typeorm";

@Entity("SCHEDULER_PROGRAM_ARGS_TBL", { schema: "PBB_KUTAI-BARAT" })
export class SchedulerProgramArgsTbl {
  @Column("character varying", { name: "OWNER", length: 128 })
  owner!: string;

  @Column("character varying", { name: "PROGRAM_NAME", length: 128 })
  programName!: string;

  @Column("character varying", {
    name: "ARGUMENT_NAME",
    nullable: true,
    length: 128,
  })
  argumentName!: string | null;

  @Column("numeric", { name: "ARGUMENT_POSITION", precision: 1000, scale: 53 })
  argumentPosition!: string;

  @Column("character varying", {
    name: "ARGUMENT_TYPE",
    nullable: true,
    length: 257,
  })
  argumentType!: string | null;

  @Column("character varying", {
    name: "METADATA_ATTRIBUTE",
    nullable: true,
    length: 19,
  })
  metadataAttribute!: string | null;

  @Column("character varying", {
    name: "DEFAULT_VALUE",
    nullable: true,
    length: 4000,
  })
  defaultValue!: string | null;

  @Column("character varying", {
    name: "DEFAULT_ANYDATA_VALUE",
    nullable: true,
    length: 3752,
  })
  defaultAnydataValue!: string | null;

  @Column("character varying", {
    name: "OUT_ARGUMENT",
    nullable: true,
    length: 5,
  })
  outArgument!: string | null;
}
