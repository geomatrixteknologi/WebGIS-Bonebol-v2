import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB8", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb8 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB8", length: 4 })
  thnDbkbJpb8!: string;

  @Column("numeric", { primary: true, name: "LBR_BENT_MIN_DBKB_JPB8", precision: 4, scale: 0 })
  lbrBentMinDbkbJpb8!: string;

  @Column("numeric", { primary: true, name: "LBR_BENT_MAX_DBKB_JPB8", precision: 4, scale: 0 })
  lbrBentMaxDbkbJpb8!: string;

  @Column("numeric", {
    primary: true,
    name: "TING_KOLOM_MIN_DBKB_JPB8",
    precision: 4,
    scale: 0,
  })
  tingKolomMinDbkbJpb8!: string;

  @Column("numeric", {
    primary: true,
    name: "TING_KOLOM_MAX_DBKB_JPB8",
    precision: 4,
    scale: 0,
  })
  tingKolomMaxDbkbJpb8!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB8",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  nilaiDbkbJpb8!: string | null;
}
