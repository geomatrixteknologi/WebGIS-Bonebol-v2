import { Column, Entity } from "typeorm";

@Entity("FAS_DEP_JPB_KLS_BINTANG", { schema: "PBB_KUTAI-BARAT" })
export class FasDepJpbKlsBintang {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DEP_JPB_KLS_BINTANG", length: 4 })
  thnDepJpbKlsBintang!: string;

  @Column("character", { primary: true, name: "KD_FASILITAS", length: 2 })
  kdFasilitas!: string;

  @Column("character", { primary: true, name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { primary: true, name: "KLS_BINTANG", length: 4 })
  klsBintang!: string;

  @Column("numeric", {
    name: "NILAI_FASILITAS_KLS_BINTANG",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  nilaiFasilitasKlsBintang!: string | null;
}
