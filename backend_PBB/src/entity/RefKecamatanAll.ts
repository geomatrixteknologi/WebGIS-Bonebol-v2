import { Column, Entity } from "typeorm";

@Entity("REF_KECAMATAN_ALL", { schema: "PBB_KUTAI-BARAT" })
export class RefKecamatanAll {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character varying", {
    name: "NM_KECAMATAN",
    nullable: true,
    length: 30,
  })
  nmKecamatan!: string | null;
}
