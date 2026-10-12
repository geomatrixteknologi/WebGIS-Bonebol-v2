import { Column, Entity, Index } from "typeorm";

@Index("pbb_kelas_tanah_pkey3", ["kode"], { unique: true })
@Entity("pbb_kelas_tanah", { schema: "PBB_MATARAM" })
export class PbbKelasTanah {
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
    name: "tahun_awal_kls_tanah",
    nullable: true,
    length: 10,
  })
  tahunAwalKlsTanah!: string | null;

  @Column("character varying", {
    name: "tahun_akhir_kls_tanah",
    nullable: true,
    length: 10,
  })
  tahunAkhirKlsTanah!: string | null;
}
