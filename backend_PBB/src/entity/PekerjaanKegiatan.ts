import { Column, Entity } from "typeorm";

@Entity("PEKERJAAN_KEGIATAN", { schema: "PBB_KUTAI-BARAT" })
export class PekerjaanKegiatan {
  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("character varying", {
    name: "NM_KEGIATAN",
    nullable: true,
    length: 30,
  })
  nmKegiatan!: string | null;
}
