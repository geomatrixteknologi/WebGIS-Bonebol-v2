import { Column, Entity } from "typeorm";

@Entity("REF_PROPINSI_ALL", { schema: "PBB_KUTAI-BARAT" })
export class RefPropinsiAll {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character varying", {
    name: "NM_PROPINSI",
    nullable: true,
    length: 30,
  })
  nmPropinsi!: string | null;
}
