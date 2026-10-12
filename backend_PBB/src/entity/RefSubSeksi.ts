import { Column, Entity } from "typeorm";

@Entity("REF_SUB_SEKSI", { schema: "PBB_KUTAI-BARAT" })
export class RefSubSeksi {
  @Column("character", { name: "KD_SEKSI", length: 2 })
  kdSeksi!: string;

  @Column("character", { name: "KD_SUBSEKSI", length: 2 })
  kdSubseksi!: string;

  @Column("character varying", {
    name: "NM_SUBSEKSI",
    nullable: true,
    length: 75,
  })
  nmSubseksi!: string | null;
}
