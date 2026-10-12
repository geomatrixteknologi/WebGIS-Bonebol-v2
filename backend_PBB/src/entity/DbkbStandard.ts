import { Column, Entity } from "typeorm";

@Entity("DBKB_STANDARD", { schema: "PBB_KUTAI-BARAT" })
export class DbkbStandard {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_STANDARD", length: 4 })
  thnDbkbStandard!: string;

  @Column("character", { primary: true, name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { primary: true, name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character", { primary: true, name: "KD_BNG_LANTAI", length: 8 })
  kdBngLantai!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_STANDARD",
    nullable: true,
    precision: 11,
    scale: 4,
  })
  nilaiDbkbStandard!: string | null;
}
