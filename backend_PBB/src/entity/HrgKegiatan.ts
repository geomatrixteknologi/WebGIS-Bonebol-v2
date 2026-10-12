import { Column, Entity } from "typeorm";

@Entity("HRG_KEGIATAN", { schema: "PBB_KUTAI-BARAT" })
export class HrgKegiatan {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_KEGIATAN", length: 4 })
  thnKegiatan!: string;

  @Column("character", { name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character", { name: "KD_BNG_LANTAI", length: 8 })
  kdBngLantai!: string;

  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("numeric", {
    name: "HRG_KEGIATAN",
    nullable: true,
    precision: 11,
    scale: 4,
  })
  hrgKegiatan!: string | null;
}
