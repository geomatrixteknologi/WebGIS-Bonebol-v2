import { Column, Entity } from "typeorm";

@Entity("KELAS_TANAH", { schema: process.env.DB_SCHEMA })
export class KelasTanah {
  @Column("char", { primary: true, name: "KD_KLS_TANAH", length: 3 })
  kdKlsTanah!: string;

  @Column("char", { primary: true, name: "THN_AWAL_KLS_TANAH", length: 4 })
  thnAwalKlsTanah!: string;

  @Column("char", {
    name: "THN_AKHIR_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  thnAkhirKlsTanah!: string | null;

  @Column("number", {
    name: "NILAI_MIN_TANAH",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiMinTanah!: string | null;

  @Column("number", {
    name: "NILAI_MAX_TANAH",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiMaxTanah!: string | null;

  @Column("number", {
    name: "NILAI_PER_M2_TANAH",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiPerM2Tanah!: string | null;
}
