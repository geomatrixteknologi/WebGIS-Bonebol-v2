import { Column, Entity } from "typeorm";

@Entity("REF_PEBIN", { schema: "PBB_KUTAI-BARAT" })
export class RefPebin {
  @Column("character", { name: "KD_PEBIN", length: 2 })
  kdPebin!: string;

  @Column("character varying", { name: "NM_PEBIN", nullable: true, length: 50 })
  nmPebin!: string | null;
}
