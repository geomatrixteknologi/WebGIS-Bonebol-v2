import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB12", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb12 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB12", length: 4 })
  thnDbkbJpb12!: string;

  @Column("character", { primary: true, name: "TYPE_DBKB_JPB12", length: 1 })
  typeDbkbJpb12!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB12",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb12!: string | null;
}
