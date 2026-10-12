import { Column, Entity } from "typeorm";

@Entity("LOGMNR_GT_TAB_INCLUDE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrGtTabInclude {
  @Column("character varying", {
    name: "SCHEMA_NAME",
    nullable: true,
    length: 390,
  })
  schemaName!: string | null;

  @Column("character varying", {
    name: "TABLE_NAME",
    nullable: true,
    length: 390,
  })
  tableName!: string | null;

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 390,
  })
  pdbName!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 4000 })
  spare3!: string | null;
}
