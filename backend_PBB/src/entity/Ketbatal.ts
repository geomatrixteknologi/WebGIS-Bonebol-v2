import { Column, Entity } from "typeorm";

@Entity("KETBATAL", { schema: "PBB_KUTAI-BARAT" })
export class Ketbatal {
  @Column("character", { name: "KD_BATAL", length: 2 })
  kdBatal!: string;

  @Column("character varying", {
    name: "KET_BATAL",
    nullable: true,
    length: 30,
  })
  ketBatal!: string | null;
}
