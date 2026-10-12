import { Column, Entity } from "typeorm";

@Entity("REF_JNS_PEMBETULAN", { schema: "PBB_KUTAI-BARAT" })
export class RefJnsPembetulan {
  @Column("character", { name: "KD_PEMBETULAN", length: 2 })
  kdPembetulan!: string;

  @Column("character varying", {
    name: "NM_PEMBETULAN",
    nullable: true,
    length: 100,
  })
  nmPembetulan!: string | null;
}
