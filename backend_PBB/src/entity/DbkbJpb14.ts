import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB14", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb14 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB14", length: 4 })
  thnDbkbJpb14!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB14",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb14!: string | null;
}
