import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_DBNAME_UID_MAP", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcDbnameUidMap {
  @Column("character varying", { name: "GLOBAL_NAME", length: 384 })
  globalName!: string;

  @Column("numeric", {
    name: "LOGMNR_UID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  logmnrUid!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 384,
  })
  pdbName!: string | null;

  @Column("numeric", { name: "LOGMNR_MDH", precision: 1000, scale: 53 })
  logmnrMdh!: string;
}
