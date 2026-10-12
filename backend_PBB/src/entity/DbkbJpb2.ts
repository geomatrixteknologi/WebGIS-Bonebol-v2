import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB2", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb2 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB2", length: 4 })
  thnDbkbJpb2!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB2", length: 1 })
  klsDbkbJpb2!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB2", precision: 2, scale: 0 })
  lantaiMinJpb2!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB2", precision: 2, scale: 0 })
  lantaiMaxJpb2!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB2",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb2!: string | null;
}
