import { Column, Entity, Index } from "typeorm";

@Index("VOL_KEGIATAN_JPB8_PK", ["kdKegiatan", "kdPekerjaan", "lbrBentMaxHrgJpb8", "lbrBentMinHrgJpb8", "tingKolomMaxHrgJpb8", "tingKolomMinHrgJpb8"], { unique: true })
@Entity("VOL_KEGIATAN_JPB8", { schema: "PBB_KUTAI-BARAT" })
export class VolKegiatanJpb8 {
  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("numeric", { name: "LBR_BENT_MIN_HRG_JPB8", precision: 4, scale: 0 })
  lbrBentMinHrgJpb8!: string;

  @Column("numeric", { name: "LBR_BENT_MAX_HRG_JPB8", precision: 4, scale: 0 })
  lbrBentMaxHrgJpb8!: string;

  @Column("numeric", {
    name: "TING_KOLOM_MIN_HRG_JPB8",
    precision: 4,
    scale: 0,
  })
  tingKolomMinHrgJpb8!: string;

  @Column("numeric", {
    name: "TING_KOLOM_MAX_HRG_JPB8",
    precision: 4,
    scale: 0,
  })
  tingKolomMaxHrgJpb8!: string;

  @Column("numeric", {
    name: "VOL_KEGIATAN_JPB8",
    nullable: true,
    precision: 10,
    scale: 4,
  })
  volKegiatanJpb8!: string | null;
}
