import { Column, Entity, Index } from "typeorm";

@Index("TARIF_KHUSUS_PK", ["kdDati2", "kdPeruntukan", "kdPropinsi", "kdSubPeruntukan", "njopMax", "njopMin", "thnAkhir", "thnAwal"], { unique: true })
@Entity("TARIF_KHUSUS", { schema: "PBB_KUTAI-BARAT" })
export class TarifKhusus {
  @Column("character", { primary: true, name: "THN_AWAL", length: 4 })
  thnAwal!: string;

  @Column("character", { primary: true, name: "THN_AKHIR", length: 4 })
  thnAkhir!: string;

  @Column("character", { primary: true, name: "KD_PERUNTUKAN", length: 2 })
  kdPeruntukan!: string;

  @Column("character", { primary: true, name: "KD_SUB_PERUNTUKAN", length: 2 })
  kdSubPeruntukan!: string;

  @Column("numeric", {
    name: "NILAI_TARIF",
    nullable: true,
    precision: 3,
    scale: 3,
  })
  nilaiTarif!: string | null;

  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("numeric", {
    primary: true,
    name: "NJOP_MIN",
    precision: 15,
    scale: 0,
  })
  njopMin!: string;

  @Column("numeric", {
    primary: true,
    name: "NJOP_MAX",
    precision: 15,
    scale: 0,
  })
  njopMax!: string;
}
