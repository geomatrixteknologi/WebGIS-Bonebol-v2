import { Column, Entity } from "typeorm";

@Entity("REF_JPB", { schema: "PBB_KUTAI-BARAT" })
export class RefJpb {
  @Column("character", { name: "KD_JPB", length: 2 })
  kdJpb!: string;

  @Column("character varying", { name: "NM_JPB", nullable: true, length: 50 })
  nmJpb!: string | null;
}
