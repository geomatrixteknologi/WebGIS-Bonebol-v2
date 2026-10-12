import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB5", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb5 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB5", length: 4 })
  thnDbkbJpb5!: string;

  @Column("character", { primary: true, name: "KLS_DBKB_JPB5", length: 1 })
  klsDbkbJpb5!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB5", precision: 2, scale: 0 })
  lantaiMinJpb5!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB5", precision: 2, scale: 0 })
  lantaiMaxJpb5!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB5",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb5!: string | null;
}
