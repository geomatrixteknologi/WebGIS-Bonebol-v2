import { Column, Entity } from "typeorm";

@Entity("JENIS_HAK", { schema: "PBB_KUTAI-BARAT" })
export class JenisHak {
  @Column("character", { name: "KD_JNS_HAK", length: 2 })
  kdJnsHak!: string;

  @Column("character varying", { name: "KET_HAK", nullable: true, length: 30 })
  ketHak!: string | null;
}
