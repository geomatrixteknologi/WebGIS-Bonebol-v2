import { Column, Entity } from "typeorm";

@Entity("HELP", { schema: "PBB_KUTAI-BARAT" })
export class Help {
  @Column("character varying", { name: "TOPIC", length: 50 })
  topic!: string;

  @Column("numeric", { name: "SEQ", precision: 1000, scale: 53 })
  seq!: string;

  @Column("character varying", { name: "INFO", nullable: true, length: 80 })
  info!: string | null;
}
