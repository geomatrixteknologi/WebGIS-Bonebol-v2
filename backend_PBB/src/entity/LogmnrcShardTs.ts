import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_SHARD_TS", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcShardTs {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("character varying", { name: "TABLESPACE_NAME", length: 90 })
  tablespaceName!: string;

  @Column("numeric", { name: "CHUNK_NUMBER", precision: 1000, scale: 53 })
  chunkNumber!: string;

  @Column("numeric", { name: "START_SCN", precision: 1000, scale: 53 })
  startScn!: string;

  @Column("numeric", {
    name: "DROP_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropScn!: string | null;

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
