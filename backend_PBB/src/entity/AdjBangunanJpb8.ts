import { Column, Entity } from "typeorm";

@Entity("ADJ_BANGUNAN_JPB8", { schema: "PBB_KUTAI-BARAT" })
export class AdjBangunanJpb8 {
  @Column("character", { name: "KD_ADJ", length: 2 })
  kdAdj!: string;

  @Column("numeric", { name: "LBR_BENT_MIN_ADJ", precision: 4, scale: 0 })
  lbrBentMinAdj!: string;

  @Column("numeric", { name: "LBR_BENT_MAX_ADJ", precision: 4, scale: 0 })
  lbrBentMaxAdj!: string;

  @Column("numeric", { name: "TING_KOLOM_MIN_ADJ", precision: 4, scale: 0 })
  tingKolomMinAdj!: string;

  @Column("numeric", { name: "TING_KOLOM_MAX_ADJ", precision: 4, scale: 0 })
  tingKolomMaxAdj!: string;

  @Column("numeric", {
    name: "PCT_ADJ_BNG_JPB8",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctAdjBngJpb8!: string | null;
}
