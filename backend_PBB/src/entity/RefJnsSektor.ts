import { Column, Entity } from "typeorm";

@Entity("REF_JNS_SEKTOR", { schema: "PBB_KUTAI-BARAT" })
export class RefJnsSektor {
  @Column("character", { name: "KD_SEKTOR", length: 2 })
  kdSektor!: string;

  @Column("character varying", {
    name: "NM_SEKTOR",
    nullable: true,
    length: 75,
  })
  nmSektor!: string | null;
}
