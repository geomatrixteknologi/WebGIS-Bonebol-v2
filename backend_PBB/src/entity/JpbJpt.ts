import { Column, Entity } from "typeorm";

@Entity("JPB_JPT", { schema: "PBB_KUTAI-BARAT" })
export class JpbJpt {
  @Column("character", { name: "KD_JPB_JPT", length: 2 })
  kdJpbJpt!: string;

  @Column("character varying", {
    name: "NM_JPB_JPT",
    nullable: true,
    length: 30,
  })
  nmJpbJpt!: string | null;
}
