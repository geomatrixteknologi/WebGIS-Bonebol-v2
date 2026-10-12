import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SHARD_TS", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrShardTs {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("character varying", { name: "TABLESPACE_NAME", length: 90 })
  tablespaceName!: string;

  @Column("numeric", { name: "CHUNK_NUMBER", precision: 1000, scale: 53 })
  chunkNumber!: string;

  @Column("numeric", {
    name: "START_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnbas!: string | null;

  @Column("numeric", {
    name: "START_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnwrp!: string | null;
}
