import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB6", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb6 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB6", length: 4 })
  thnDbkbJpb6!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB6", length: 1 })
  klsDbkbJpb6!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB6",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb6!: string | null;
}
