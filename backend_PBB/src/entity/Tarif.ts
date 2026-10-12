import { Column, Entity, Index } from "typeorm";

@Index("TARIF_PK", ["kdDati2", "kdPropinsi", "njopMin", "thnAkhir", "thnAwal"], { unique: true })
@Entity("TARIF", { schema: "PBB_KUTAI-BARAT" })
export class Tarif {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_AWAL", length: 4 })
  thnAwal!: string;

  @Column("character", { name: "THN_AKHIR", length: 4 })
  thnAkhir!: string;

  @Column("numeric", { name: "NJOP_MIN", precision: 15, scale: 0 })
  njopMin!: string;

  @Column("numeric", {
    name: "NJOP_MAX",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopMax!: string | null;

  @Column("numeric", {
    name: "NILAI_TARIF",
    nullable: true,
    precision: 3,
    scale: 3,
  })
  nilaiTarif!: string | null;
}
