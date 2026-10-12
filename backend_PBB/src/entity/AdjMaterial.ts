import { Column, Entity } from "typeorm";

@Entity("ADJ_MATERIAL", { schema: "PBB_KUTAI-BARAT" })
export class AdjMaterial {
  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("numeric", {
    name: "PCT_ADJ_MTRL_1",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctAdjMtrl_1!: string | null;

  @Column("numeric", {
    name: "PCT_ADJ_MTRL_2",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctAdjMtrl_2!: string | null;

  @Column("character varying", {
    name: "DESKRIPSI_ADJ",
    nullable: true,
    length: 50,
  })
  deskripsiAdj!: string | null;
}
