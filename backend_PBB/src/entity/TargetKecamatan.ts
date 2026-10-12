import { Column, Entity, Index } from "typeorm";

@Index("SYS_C008891", ["kdDati2", "kdKecamatan", "kdPropinsi", "thnTarget"], {
  unique: true,
})
@Entity("TARGET_KECAMATAN", { schema: "PBB_KUTAI-BARAT" })
export class TargetKecamatan {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "THN_TARGET", length: 4 })
  thnTarget!: string;

  @Column("numeric", { name: "JML_TARGET", precision: 11, scale: 0 })
  jmlTarget!: string;

  @Column("character varying", { name: "NM_CAMAT", length: 50 })
  nmCamat!: string;
}
