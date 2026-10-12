import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB13", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb13 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB13", length: 4 })
  thnDbkbJpb13!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB13", length: 1 })
  klsDbkbJpb13!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB13", precision: 2, scale: 0 })
  lantaiMinJpb13!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB13", precision: 2, scale: 0 })
  lantaiMaxJpb13!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB13",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb13!: string | null;
}
