import { Column, Entity } from "typeorm";

@Entity("REF_PBI", { schema: "PBB_KUTAI-BARAT" })
export class RefPbi {
  @Column("character", { name: "KD_PEBIN", length: 2 })
  kdPebin!: string;

  @Column("character", { name: "KD_PBI", length: 2 })
  kdPbi!: string;

  @Column("character varying", { name: "NM_PBI", nullable: true, length: 50 })
  nmPbi!: string | null;
}
