import { Column, Entity } from "typeorm";

@Entity("REF_SUB_PERUNTUKAN", { schema: "PBB_KUTAI-BARAT" })
export class RefSubPeruntukan {
  @Column("character", { name: "KD_PERUNTUKAN", length: 2 })
  kdPeruntukan!: string;

  @Column("character", { name: "KD_SUB_PERUNTUKAN", length: 2 })
  kdSubPeruntukan!: string;

  @Column("character varying", { name: "NM_SUB_PERUNTUKAN", length: 255 })
  nmSubPeruntukan!: string;
}
