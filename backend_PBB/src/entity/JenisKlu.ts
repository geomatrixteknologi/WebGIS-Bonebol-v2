import { Column, Entity } from "typeorm";

@Entity("JENIS_KLU", { schema: "PBB_KUTAI-BARAT" })
export class JenisKlu {
  @Column("character", { name: "KD_KLU", length: 5 })
  kdKlu!: string;

  @Column("character varying", { name: "KET_KLU", nullable: true, length: 110 })
  ketKlu!: string | null;
}
