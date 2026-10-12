import { Column, Entity } from "typeorm";

@Entity("AQ$_INTERNET_AGENT_PRIVS", { schema: "PBB_KUTAI-BARAT" })
export class AqInternetAgentPrivs {
  @Column("character varying", { name: "AGENT_NAME", length: 512 })
  agentName!: string;

  @Column("character varying", { name: "DB_USERNAME", length: 128 })
  dbUsername!: string;
}
