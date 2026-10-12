import { Column, Entity } from "typeorm";

@Entity("HRG_KEGIATAN_JPB8", { schema: "PBB_KUTAI-BARAT" })
export class HrgKegiatanJpb8 {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_HRG_PEKERJAAN_JPB8", length: 4 })
  thnHrgPekerjaanJpb8!: string;

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
    name: "HRG_KEGIATAN_JPB8",
    nullable: true,
    precision: 11,
    scale: 4,
  })
  hrgKegiatanJpb8!: string | null;
}
