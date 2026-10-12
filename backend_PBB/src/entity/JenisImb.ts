import { Column, Entity } from "typeorm";

@Entity("JENIS_IMB", { schema: "PBB_KUTAI-BARAT" })
export class JenisImb {
  @Column("character", { name: "KD_JNS_IMB", length: 2 })
  kdJnsImb!: string;

  @Column("character varying", { name: "KET_IMB", nullable: true, length: 30 })
  ketImb!: string | null;
}
