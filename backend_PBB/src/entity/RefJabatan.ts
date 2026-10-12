import { Column, Entity } from "typeorm";

@Entity("REF_JABATAN", { schema: "PBB_KUTAI-BARAT" })
export class RefJabatan {
  @Column("character", { name: "KD_JABATAN", length: 2 })
  kdJabatan!: string;

  @Column("character varying", {
    name: "NM_JABATAN",
    nullable: true,
    length: 50,
  })
  nmJabatan!: string | null;

  @Column("character varying", {
    name: "SINGKATAN_JABATAN",
    nullable: true,
    length: 30,
  })
  singkatanJabatan!: string | null;
}
