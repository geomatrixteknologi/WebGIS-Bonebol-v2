import { Column, Entity } from "typeorm";

@Entity("AQ$_KEY_SHARD_MAP", { schema: "PBB_KUTAI-BARAT" })
export class AqKeyShardMap {
  @Column("numeric", { name: "QUEUE", precision: 1000, scale: 53 })
  queue!: string;

  @Column("character varying", { name: "KEY", length: 128 })
  key!: string;

  @Column("numeric", { name: "SHARD", precision: 1000, scale: 53 })
  shard!: string;

  @Column("numeric", { name: "DELAY_SHARD", precision: 1000, scale: 53 })
  delayShard!: string;
}
