import { Column, Entity } from "typeorm";

@Entity("REF_MAP", { schema: "PBB_KUTAI-BARAT" })
export class RefMap {
  @Column("character", { name: "KD_SEKTOR", length: 2 })
  kdSektor!: string;

  @Column("character varying", { name: "KD_MAP", nullable: true, length: 6 })
  kdMap!: string | null;
}
