import { Column, Entity } from "typeorm";

@Entity("KELAS_BANGUNAN", { schema: "PBB_KUTAI-BARAT" })
export class KelasBangunan {
  @Column("character", { primary: true, name: "KD_KLS_BNG", length: 3 })
  kdKlsBng!: string;

  @Column("character", { primary: true, name: "THN_AWAL_KLS_BNG", length: 4 })
  thnAwalKlsBng!: string;

  @Column("character", { name: "THN_AKHIR_KLS_BNG", nullable: true, length: 4 })
  thnAkhirKlsBng!: string | null;

  @Column("numeric", {
    name: "NILAI_MIN_BNG",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiMinBng!: string | null;

  @Column("numeric", {
    name: "NILAI_MAX_BNG",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiMaxBng!: string | null;

  @Column("numeric", {
    name: "NILAI_PER_M2_BNG",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  nilaiPerM2Bng!: string | null;
}
