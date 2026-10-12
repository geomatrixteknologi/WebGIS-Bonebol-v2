import { Column, Entity } from "typeorm";

@Entity("JNS_STATUS_KANTOR", { schema: "PBB_KUTAI-BARAT" })
export class JnsStatusKantor {
  @Column("character", { name: "KD_STAT_KANTOR", length: 2 })
  kdStatKantor!: string;

  @Column("character varying", {
    name: "KET_STAT_KANTOR",
    nullable: true,
    length: 30,
  })
  ketStatKantor!: string | null;
}
