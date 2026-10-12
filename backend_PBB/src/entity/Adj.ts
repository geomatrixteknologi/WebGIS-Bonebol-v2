import { Column, Entity } from "typeorm";

@Entity("ADJ", { schema: "PBB_KUTAI-BARAT" })
export class Adj {
  @Column("character", { name: "KD_ADJ", length: 2 })
  kdAdj!: string;

  @Column("character varying", { name: "NM_ADJ", nullable: true, length: 30 })
  nmAdj!: string | null;
}
