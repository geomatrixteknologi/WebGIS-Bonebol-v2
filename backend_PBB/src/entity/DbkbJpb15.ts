import { Column, Entity } from "typeorm";

@Entity("DBKB_JPB15", { schema: "PBB_KUTAI-BARAT" })
export class DbkbJpb15 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_JPB15", length: 4 })
  thnDbkbJpb15!: string;

  @Column("character", { primary: true, name: "JNS_TANGKI_DBKB_JPB15", length: 1 })
  jnsTangkiDbkbJpb15!: string;

  @Column("numeric", {
    primary: true,
    name: "KAPASITAS_MIN_DBKB_JPB15",
    precision: 9,
    scale: 4,
  })
  kapasitasMinDbkbJpb15!: string;

  @Column("numeric", {
    primary: true,
    name: "KAPASITAS_MAX_DBKB_JPB15",
    precision: 9,
    scale: 4,
  })
  kapasitasMaxDbkbJpb15!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_JPB15",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbJpb15!: string | null;
}
