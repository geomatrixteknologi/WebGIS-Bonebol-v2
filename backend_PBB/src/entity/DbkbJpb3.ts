import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB3", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb3 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB3", length: 4 })
  thnDbkbJpb3!: string;

  @Column("numeric", { primary: true, name: "LBR_BENT_MIN_DBKB_JPB3", precision: 4, scale: 0 })
  lbrBentMinDbkbJpb3!: string;

  @Column("numeric", { primary: true, name: "LBR_BENT_MAX_DBKB_JPB3", precision: 4, scale: 0 })
  lbrBentMaxDbkbJpb3!: string;

  @Column("numeric", {
    primary: true,
    name: "TING_KOLOM_MIN_DBKB_JPB3",
    precision: 4,
    scale: 0,
  })
  tingKolomMinDbkbJpb3!: string;

  @Column("numeric", {
    primary: true,
    name: "TING_KOLOM_MAX_DBKB_JPB3",
    precision: 4,
    scale: 0,
  })
  tingKolomMaxDbkbJpb3!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB3",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  nilaiDbkbJpb3!: string | null;
}
