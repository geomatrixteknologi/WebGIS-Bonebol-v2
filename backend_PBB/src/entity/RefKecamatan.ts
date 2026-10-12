import { Column, Entity } from "typeorm";

@Entity("REF_KECAMATAN", { schema: "PBB_KUTAI-BARAT" })
export class RefKecamatan {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character varying", {
    name: "NM_KECAMATAN",
    nullable: true,
    length: 30,
  })
  nmKecamatan!: string | null;
}
