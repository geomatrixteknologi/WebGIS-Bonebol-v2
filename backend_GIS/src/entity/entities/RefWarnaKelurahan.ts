import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ref_warna_kelurahan", { schema: "GIS_BONEBOL" })
export class RefWarnaKelurahan {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "WARNA" })
  WARNA!: string;

  @Column("character varying", { name: "KD_PROV", nullable: true })
  KD_PROV!: string | null;

  @Column("character varying", { name: "KD_KAB", nullable: true })
  KD_KAB!: string | null;

  @Column("character varying", { name: "KD_KEC", nullable: true })
  KD_KEC!: string | null;

  @Column("character varying", { name: "KD_KEL", nullable: true })
  KD_KEL!: string | null;

  @Column("character varying", { name: "NM_KEL", nullable: true })
  NM_KEL!: string | null;
}
