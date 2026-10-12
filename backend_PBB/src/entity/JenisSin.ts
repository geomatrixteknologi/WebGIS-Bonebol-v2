import { Column, Entity } from "typeorm";

@Entity("JENIS_SIN", { schema: "PBB_KUTAI-BARAT" })
export class JenisSin {
  @Column("character", { name: "KD_JNS_SIN", length: 2 })
  kdJnsSin!: string;

  @Column("character varying", {
    name: "KET_JNS_SIN",
    nullable: true,
    length: 30,
  })
  ketJnsSin!: string | null;
}
