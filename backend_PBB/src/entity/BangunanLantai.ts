import { Column, Entity } from "typeorm";

@Entity("BANGUNAN_LANTAI", { schema: "PBB_KUTAI-BARAT" })
export class BangunanLantai {
  @Column("character", { name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character", { name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character", { name: "KD_BNG_LANTAI", length: 8 })
  kdBngLantai!: string;

  @Column("numeric", {
    name: "LANTAI_MIN_BNG_LANTAI",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  lantaiMinBngLantai!: string | null;

  @Column("numeric", {
    name: "LANTAI_MAX_BNG_LANTAI",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  lantaiMaxBngLantai!: string | null;
}
