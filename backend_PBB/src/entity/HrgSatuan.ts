import { Column, Entity } from "typeorm";

@Entity("HRG_SATUAN", { schema: "PBB_KUTAI-BARAT" })
export class HrgSatuan {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_HRG_SATUAN", length: 4 })
  thnHrgSatuan!: string;

  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character", { name: "KD_KEGIATAN", length: 2 })
  kdKegiatan!: string;

  @Column("numeric", {
    name: "HRG_SATUAN",
    nullable: true,
    precision: 11,
    scale: 4,
  })
  hrgSatuan!: string | null;
}
