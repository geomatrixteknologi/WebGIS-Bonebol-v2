import { Column, Entity } from "typeorm";

@Entity("REF_BUKU_STIMULUS_MASSAL", { schema: "PBB_KUTAI-BARAT" })
export class RefBukuStimulusMassal {
  @Column("character", { name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

  @Column("character", { name: "KD_BUKU", length: 1 })
  kdBuku!: string;

  @Column("numeric", {
    name: "PROSENTASE",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  prosentase!: string | null;
}
