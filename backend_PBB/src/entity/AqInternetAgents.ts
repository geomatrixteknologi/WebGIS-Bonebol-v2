import { Column, Entity } from "typeorm";

@Entity("AQ$_INTERNET_AGENTS", { schema: "PBB_KUTAI-BARAT" })
export class AqInternetAgents {
  @Column("character varying", { name: "AGENT_NAME", length: 512 })
  agentName!: string;

  @Column("numeric", { name: "PROTOCOL", precision: 1000, scale: 53 })
  protocol!: string;

  @Column("character varying", { name: "SPARE1", nullable: true, length: 128 })
  spare1!: string | null;
}
