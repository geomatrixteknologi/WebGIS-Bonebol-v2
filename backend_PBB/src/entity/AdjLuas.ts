import { Column, Entity } from "typeorm";

@Entity("ADJ_LUAS", { schema: "PBB_KUTAI-BARAT" })
export class AdjLuas {
  @Column("character", { name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character", { name: "KD_BNG_LANTAI", length: 8 })
  kdBngLantai!: string;

  @Column("numeric", {
    name: "PCT_ADJ_LUAS",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctAdjLuas!: string | null;
}
