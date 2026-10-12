import { Column, Entity } from "typeorm";

@Entity("PEKERJAAN", { schema: "PBB_KUTAI-BARAT" })
export class Pekerjaan {
  @Column("character", { name: "KD_PEKERJAAN", length: 2 })
  kdPekerjaan!: string;

  @Column("character varying", {
    name: "NM_PEKERJAAN",
    nullable: true,
    length: 30,
  })
  nmPekerjaan!: string | null;

  @Column("character", { name: "STATUS_PEKERJAAN", nullable: true, length: 1 })
  statusPekerjaan!: string | null;
}
