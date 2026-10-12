import { Column, Entity } from "typeorm";

@Entity("REF_PPBI", { schema: "PBB_KUTAI-BARAT" })
export class RefPpbi {
  @Column("character", { name: "KD_PEBIN", length: 2 })
  kdPebin!: string;

  @Column("character", { name: "KD_PBI", length: 2 })
  kdPbi!: string;

  @Column("character", { name: "KD_PPBI", length: 2 })
  kdPpbi!: string;

  @Column("character varying", { name: "NM_PPBI", nullable: true, length: 50 })
  nmPpbi!: string | null;
}
