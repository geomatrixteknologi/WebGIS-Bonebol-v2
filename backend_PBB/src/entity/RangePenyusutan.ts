import { Column, Entity } from "typeorm";

@Entity("RANGE_PENYUSUTAN", { schema: "PBB_KUTAI-BARAT" })
export class RangePenyusutan {
  @Column("character", { name: "KD_RANGE_PENYUSUTAN", length: 1 })
  kdRangePenyusutan!: string;

  @Column("numeric", {
    name: "NILAI_MIN_PENYUSUTAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMinPenyusutan!: string | null;

  @Column("numeric", {
    name: "NILAI_MAX_PENYUSUTAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMaxPenyusutan!: string | null;
}
