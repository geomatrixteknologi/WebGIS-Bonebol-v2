import { Column, Entity, Index } from "typeorm";

@Index("pbb_kelas_bangunan_pkey3", ["kode"], { unique: true })
@Entity("pbb_kelas_bangunan", { schema: "PBB_MATARAM" })
export class PbbKelasBangunan {
  @Column("character varying", {
    primary: true,
    name: "kode",
    length: 3,
    default: () => "NULL::character varying",
  })
  kode!: string;

  @Column("double precision", {
    name: "nilai_per_m2_batas_bawah",
    nullable: true,
    precision: 53,
  })
  nilaiPerM2BatasBawah!: number | null;

  @Column("double precision", {
    name: "nilai_per_m2_batas_atas",
    nullable: true,
    precision: 53,
  })
  nilaiPerM2BatasAtas!: number | null;

  @Column("double precision", {
    name: "nilai_per_m2",
    nullable: true,
    precision: 53,
  })
  nilaiPerM2!: number | null;

  @Column("character varying", {
    name: "tahun_awal_kls_bangunan",
    nullable: true,
    length: 10,
  })
  tahunAwalKlsBangunan!: string | null;

  @Column("character varying", {
    name: "tahun_akhir_kls_bangunan",
    nullable: true,
    length: 10,
  })
  tahunAkhirKlsBangunan!: string | null;
}
