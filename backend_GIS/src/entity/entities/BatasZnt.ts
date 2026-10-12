import { Geometry } from "geojson";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("batas_znt", { schema: "GIS_BONEBOL" })
export class BatasZnt {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 3857,
  })
  geom!: Geometry | null;

  @Column("character varying", { name: "KD_PROV" })
  KD_PROV!: string;

  @Column("character varying", { name: "KD_KAB" })
  KD_KAB!: string;

  @Column("character varying", { name: "KD_KEC" })
  KD_KEC!: string;

  @Column("character varying", { name: "KD_KEL" })
  KD_KEL!: string;

  @Column("character varying", { name: "KD_ZNT" })
  KD_ZNT!: string;

  @Column("character varying", { name: "TAHUN" })
  TAHUN!: string;

  @Column("integer", { name: "NIR_EKS" })
  NIR_EKS!: number;

  @Column("integer", { name: "NIR_ANAL" })
  NIR_ANAL!: number;

  @Column("integer", { name: "KLS_EKS" })
  KLS_EKS!: number;

  @Column("integer", { name: "KLS_ANAL" })
  KLS_ANAL!: number;

  @Column("character varying", { name: "LABEL_EKS" })
  LABEL_EKS!: string;

  @Column("character varying", { name: "LABEL_ANAL" })
  LABEL_ANAL!: string;

  @Column("character varying", { name: "WARNA_ANAL", nullable: true })
  WARNA_ANAL!: string | null;
}
