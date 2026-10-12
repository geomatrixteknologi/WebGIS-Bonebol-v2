import { Column, Entity } from "typeorm";

@Entity("FAS_NON_DEP", { schema: "PBB_KUTAI-BARAT" })
export class FasNonDep {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_NON_DEP", length: 4 })
  thnNonDep!: string;

  @Column("character", { primary: true, name: "KD_FASILITAS", length: 2 })
  kdFasilitas!: string;

  @Column("numeric", {
    name: "NILAI_NON_DEP",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  nilaiNonDep!: string | null;
}
