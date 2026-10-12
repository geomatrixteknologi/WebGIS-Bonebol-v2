import { Column, Entity } from "typeorm";

@Entity("FAS_DEP_MIN_MAX", { schema: "PBB_KUTAI-BARAT" })
export class FasDepMinMax {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DEP_MIN_MAX", length: 4 })
  thnDepMinMax!: string;

  @Column("character", { primary: true, name: "KD_FASILITAS", length: 2 })
  kdFasilitas!: string;

  @Column("numeric", { primary: true, name: "KLS_DEP_MIN", precision: 6, scale: 0 })
  klsDepMin!: string;

  @Column("numeric", { primary: true, name: "KLS_DEP_MAX", precision: 6, scale: 0 })
  klsDepMax!: string;

  @Column("numeric", {
    name: "NILAI_DEP_MIN_MAX",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  nilaiDepMinMax!: string | null;
}
