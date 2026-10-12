import { Column, Entity } from "typeorm";

@Entity("KAYU_ULIN", { schema: "PBB_KUTAI-BARAT" })
export class KayuUlin {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_STATUS_KAYU_ULIN", length: 4 })
  thnStatusKayuUlin!: string;

  @Column("numeric", {
    name: "STATUS_KAYU_ULIN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusKayuUlin!: string | null;
}
