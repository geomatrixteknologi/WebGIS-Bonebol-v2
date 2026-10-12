import { Column, Entity } from "typeorm";

@Entity("PENYUSUTAN", { schema: "PBB_KUTAI-BARAT" })
export class Penyusutan {
  @Column("numeric", { name: "UMUR_EFEKTIF", precision: 2, scale: 0 })
  umurEfektif!: string;

  @Column("character", { name: "KD_RANGE_PENYUSUTAN", length: 1 })
  kdRangePenyusutan!: string;

  @Column("character", { name: "KONDISI_BNG_SUSUT", length: 1 })
  kondisiBngSusut!: string;

  @Column("numeric", {
    name: "NILAI_PENYUSUTAN",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  nilaiPenyusutan!: string | null;
}
