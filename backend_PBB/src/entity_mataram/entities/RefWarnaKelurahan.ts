import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ref_warna_kelurahan", { schema: "PBB_MATARAM" })
export class RefWarnaKelurahan {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "WARNA" })
  warna!: string;

  @Column("character varying", { name: "KD_PROV", nullable: true })
  kdProv!: string | null;

  @Column("character varying", { name: "KD_KAB", nullable: true })
  kdKab!: string | null;

  @Column("character varying", { name: "KD_KEC", nullable: true })
  kdKec!: string | null;

  @Column("character varying", { name: "KD_KEL", nullable: true })
  kdKel!: string | null;

  @Column("character varying", { name: "NM_KEL", nullable: true })
  nmKel!: string | null;
}
