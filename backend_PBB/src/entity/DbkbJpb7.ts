import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB7", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb7 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB7", length: 4 })
  thnDbkbJpb7!: string;

  @Column("character", { primary: true, name: "JNS_DBKB_JPB7", length: 1 })
  jnsDbkbJpb7!: string;

  @Column("character", { primary: true, name: "BINTANG_DBKB_JPB7", length: 1 })
  bintangDbkbJpb7!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MIN_JPB7", precision: 2, scale: 0 })
  lantaiMinJpb7!: string;

  @Column("numeric", { primary: true, name: "LANTAI_MAX_JPB7", precision: 2, scale: 0 })
  lantaiMaxJpb7!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB7",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb7!: string | null;
}
