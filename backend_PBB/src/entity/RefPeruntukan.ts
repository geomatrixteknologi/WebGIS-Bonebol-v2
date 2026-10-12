import { Column, Entity } from "typeorm";

@Entity("REF_PERUNTUKAN", { schema: "PBB_KUTAI-BARAT" })
export class RefPeruntukan {
  @Column("character", { name: "KD_PERUNTUKAN", length: 2 })
  kdPeruntukan!: string;

  @Column("character varying", { name: "NM_PERUNTUKAN", length: 255 })
  nmPeruntukan!: string;
}
