import { Column, Entity, Index } from "typeorm";

@Index("VOL_KEGIATAN_PK", ["kdBngLantai", "kdJpb", "kdKegiatan", "kdPekerjaan", "tipeBng"], { unique: true })
@Entity("VOL_KEGIATAN", { schema: "PBB_KUTAI-BARAT" })
export class VolKegiatan {
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
    name: "VOL_KEGIATAN",
    nullable: true,
    precision: 10,
    scale: 4,
  })
  volKegiatan!: string | null;
}
