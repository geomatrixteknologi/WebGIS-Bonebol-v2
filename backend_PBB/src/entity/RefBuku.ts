import { Column, Entity } from "typeorm";

@Entity("REF_BUKU", { schema: "PBB_KUTAI-BARAT" })
export class RefBuku {
  @Column("character", { name: "THN_AWAL", length: 4 })
  thnAwal!: string;

  @Column("character", { name: "THN_AKHIR", length: 4 })
  thnAkhir!: string;

  @Column("character", { name: "KD_BUKU", length: 1 })
  kdBuku!: string;

  @Column("numeric", {
    name: "NILAI_MIN_BUKU",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMinBuku!: string | null;

  @Column("numeric", {
    name: "NILAI_MAX_BUKU",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMaxBuku!: string | null;
}
