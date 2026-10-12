import { Column, Entity } from "typeorm";

@Entity("ADJ_BANGUNAN", { schema: "PBB_KUTAI-BARAT" })
export class AdjBangunan {
  @Column("character", { name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character", { name: "KD_BNG_LANTAI", length: 8 })
  kdBngLantai!: string;

  @Column("character", { name: "KD_ADJ", length: 2 })
  kdAdj!: string;

  @Column("numeric", {
    name: "PCT_ADJ_BNG",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctAdjBng!: string | null;
}
