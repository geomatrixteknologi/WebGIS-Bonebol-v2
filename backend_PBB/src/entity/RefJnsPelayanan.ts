import { Column, Entity } from "typeorm";

@Entity("REF_JNS_PELAYANAN", { schema: "PBB_KUTAI-BARAT" })
export class RefJnsPelayanan {
  @Column("character", { name: "KD_JNS_PELAYANAN", length: 2 })
  kdJnsPelayanan!: string;

  @Column("character varying", {
    name: "NM_JENIS_PELAYANAN",
    nullable: true,
    length: 50,
  })
  nmJenisPelayanan!: string | null;
}
