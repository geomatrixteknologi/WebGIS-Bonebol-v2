import { Column, Entity } from "typeorm";

@Entity("PBB_MINIMAL", { schema: "PBB_KUTAI-BARAT" })
export class PbbMinimal {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_PBB_MINIMAL", length: 4 })
  thnPbbMinimal!: string;

  @Column("character varying", {
    name: "NO_SK_PBB_MINIMAL",
    nullable: true,
    length: 100,
  })
  noSkPbbMinimal!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_SK_PBB_MINIMAL",
    nullable: true,
  })
  tglSkPbbMinimal!: Date | null;

  @Column("numeric", {
    name: "NILAI_PBB_MINIMAL",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  nilaiPbbMinimal!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_PBB_MINIMAL",
    nullable: true,
  })
  tglRekamPbbMinimal!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_PBB_MINIMAL",
    nullable: true,
    length: 30,
  })
  nipPerekamPbbMinimal!: string | null;
}
