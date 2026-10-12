import { Column, Entity } from "typeorm";

@Entity("JNS_KENDARAAN", { schema: "PBB_KUTAI-BARAT" })
export class JnsKendaraan {
  @Column("character", { name: "KD_KENDARAAN", length: 2 })
  kdKendaraan!: string;

  @Column("character varying", {
    name: "KET_KENDARAAN",
    nullable: true,
    length: 30,
  })
  ketKendaraan!: string | null;
}
