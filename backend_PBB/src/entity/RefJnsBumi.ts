import { Column, Entity } from "typeorm";

@Entity("REF_JNS_BUMI", { schema: "PBB_KUTAI-BARAT" })
export class RefJnsBumi {
  @Column("character", { name: "KD_JNS_BUMI", length: 1 })
  kdJnsBumi!: string;

  @Column("character varying", {
    name: "NM_JNS_BUMI",
    nullable: true,
    length: 20,
  })
  nmJnsBumi!: string | null;
}
