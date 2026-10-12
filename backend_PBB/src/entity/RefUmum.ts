import { Column, Entity } from "typeorm";

@Entity("REF_UMUM", { schema: "PBB_KUTAI-BARAT" })
export class RefUmum {
  @Column("numeric", { name: "KD_REF", precision: 1000, scale: 53 })
  kdRef!: string;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 100,
  })
  keterangan!: string | null;

  @Column("character varying", { name: "NM_REF", nullable: true, length: 250 })
  nmRef!: string | null;
}
