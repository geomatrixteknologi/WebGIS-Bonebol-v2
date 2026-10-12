import { Column, Entity, Index } from "typeorm";

@Index("TEMP_ZNT_MASSAL_PK", ["jnsZntMassal", "kdBlok", "kdDati2", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noZntMassal"], { unique: true })
@Entity("TEMP_ZNT_MASSAL", { schema: "PBB_KUTAI-BARAT" })
export class TempZntMassal {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_ZNT_MASSAL", length: 4 })
  noZntMassal!: string;

  @Column("character", { name: "JNS_ZNT_MASSAL", length: 1 })
  jnsZntMassal!: string;

  @Column("character", { name: "KD_ZNT_MASSAL", nullable: true, length: 2 })
  kdZntMassal!: string | null;

  @Column("numeric", {
    name: "STATUS_ZNT_MASSAL",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusZntMassal!: string | null;
}
