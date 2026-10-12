import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PDB_INFO$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrPdbInfo {
  @Column("numeric", { name: "LOGMNR_DID", precision: 1000, scale: 53 })
  logmnrDid!: string;

  @Column("numeric", { name: "LOGMNR_MDH", precision: 1000, scale: 53 })
  logmnrMdh!: string;

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 384,
  })
  pdbName!: string | null;

  @Column("numeric", {
    name: "PDB_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbId!: string | null;

  @Column("numeric", {
    name: "PDB_UID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbUid!: string | null;

  @Column("numeric", { name: "PLUGIN_SCN", precision: 1000, scale: 53 })
  pluginScn!: string;

  @Column("numeric", {
    name: "UNPLUG_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  unplugScn!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

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

  @Column("timestamp without time zone", { name: "SPARE4", nullable: true })
  spare4!: Date | null;

  @Column("character varying", {
    name: "PDB_GLOBAL_NAME",
    nullable: true,
    length: 384,
  })
  pdbGlobalName!: string | null;
}
