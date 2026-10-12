import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB4", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb4 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB4", length: 4 })
  thnDbkbJpb4!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB4", length: 1 })
  klsDbkbJpb4!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB4", precision: 2, scale: 0 })
  lantaiMinJpb4!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB4", precision: 2, scale: 0 })
  lantaiMaxJpb4!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB4",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb4!: string | null;
}
