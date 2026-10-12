import { Column, Entity } from "typeorm";

@Entity("REF_PROPINSI", { schema: "PBB_KUTAI-BARAT" })
export class RefPropinsi {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character varying", {
    name: "NM_PROPINSI",
    nullable: true,
    length: 30,
  })
  nmPropinsi!: string | null;
}
