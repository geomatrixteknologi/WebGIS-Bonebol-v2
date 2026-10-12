import { Column, Entity, Index } from "typeorm";

@Index("WEWENANG_PK", ["kdWewenang"], { unique: true })
@Entity("WEWENANG", { schema: "PBB_KUTAI-BARAT" })
export class Wewenang {
  @Column("character", { name: "KD_WEWENANG", length: 2 })
  kdWewenang!: string;

  @Column("character varying", {
    name: "NM_WEWENANG",
    nullable: true,
    length: 30,
  })
  nmWewenang!: string | null;
}
