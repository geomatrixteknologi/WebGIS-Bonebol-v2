import { Column, Entity } from "typeorm";

@Entity("JNS_USAHA", { schema: "PBB_KUTAI-BARAT" })
export class JnsUsaha {
  @Column("character", { name: "KD_JNS_USAHA", length: 2 })
  kdJnsUsaha!: string;

  @Column("character varying", {
    name: "KET_JNS_USAHA",
    nullable: true,
    length: 50,
  })
  ketJnsUsaha!: string | null;
}
