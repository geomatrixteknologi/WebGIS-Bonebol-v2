import { Column, Entity } from "typeorm";

@Entity("REF_THN_NJKP_NJOPTKP_TARIF", { schema: "PBB_KUTAI-BARAT" })
export class RefThnNjkpNjoptkpTarif {
  @Column("numeric", { name: "INDEKS_RANGE", precision: 2, scale: 0 })
  indeksRange!: string;

  @Column("character", { name: "KD_JNS_RANGE", length: 1 })
  kdJnsRange!: string;

  @Column("numeric", {
    name: "KD_SK_NJOP_NJKP",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  kdSkNjopNjkp!: string | null;

  @Column("character", { name: "RANGE_THN_AWAL", nullable: true, length: 4 })
  rangeThnAwal!: string | null;

  @Column("character", { name: "RANGE_THN_AKHIR", nullable: true, length: 4 })
  rangeThnAkhir!: string | null;
}
