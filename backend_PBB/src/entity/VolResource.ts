import { Column, Entity, Index } from "typeorm";

@Index("VOL_RESOURCE_PK", ["kdGroupResource", "kdKegiatan", "kdPekerjaan", "kdResource"], { unique: true })
@Entity("VOL_RESOURCE", { schema: "PBB_KUTAI-BARAT" })
export class VolResource {
  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("character", { name: "KD_GROUP_RESOURCE", length: 2 })
  kdGroupResource!: string;

  @Column("character", { name: "KD_RESOURCE", length: 2 })
  kdResource!: string;

  @Column("numeric", {
    name: "VOL_RESOURCE",
    nullable: true,
    precision: 10,
    scale: 4,
  })
  volResource!: string | null;
}
