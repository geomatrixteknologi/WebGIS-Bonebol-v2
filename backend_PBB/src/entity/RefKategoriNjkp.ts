import { Column, Entity } from "typeorm";

@Entity("REF_KATEGORI_NJKP", { schema: "PBB_KUTAI-BARAT" })
export class RefKategoriNjkp {
  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_PERUNTUKAN", nullable: true, length: 2 })
  kdPeruntukan!: string | null;

  @Column("character", { name: "KD_SUB_PERUNTUKAN", nullable: true, length: 2 })
  kdSubPeruntukan!: string | null;

  @Column("numeric", { name: "NJKP", nullable: true, precision: 5, scale: 2 })
  njkp!: string | null;

  @Column("character", { name: "THN_AWAL", nullable: true, length: 4 })
  thnAwal!: string | null;

  @Column("character", { name: "THN_AKHIR", nullable: true, length: 4 })
  thnAkhir!: string | null;
}
