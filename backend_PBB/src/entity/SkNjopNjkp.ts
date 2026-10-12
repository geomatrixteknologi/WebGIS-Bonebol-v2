import { Column, Entity } from "typeorm";

@Entity("SK_NJOP_NJKP", { schema: "PBB_KUTAI-BARAT" })
export class SkNjopNjkp {
  @Column("numeric", { name: "KD_SK_NJOP_NJKP", precision: 3, scale: 0 })
  kdSkNjopNjkp!: string;

  @Column("character", { name: "NO_SK_NJOP_NJKP", nullable: true, length: 100 })
  noSkNjopNjkp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_SK_NJOP_NJKP",
    nullable: true,
  })
  tglSkNjopNjkp!: Date | null;
}
