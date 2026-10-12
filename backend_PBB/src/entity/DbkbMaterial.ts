import { Column, Entity } from "typeorm";

@Entity("DBKB_MATERIAL", { schema: "PBB_KUTAI-BARAT" })
export class DbkbMaterial {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_MATERIAL", length: 4 })
  thnDbkbMaterial!: string;

  @Column("character", { primary: true, name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { primary: true, name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_MATERIAL",
    nullable: true,
    precision: 12,
    scale: 2,
  })
  nilaiDbkbMaterial!: string | null;
}
