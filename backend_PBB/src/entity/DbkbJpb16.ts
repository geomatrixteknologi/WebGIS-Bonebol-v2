import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB16", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb16 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB16", length: 4 })
  thnDbkbJpb16!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB16", length: 1 })
  klsDbkbJpb16!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB16", precision: 2, scale: 0 })
  lantaiMinJpb16!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB16", precision: 2, scale: 0 })
  lantaiMaxJpb16!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB16",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb16!: string | null;
}
