import { Geometry } from "geojson";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("batas_persil", { schema: "GIS_BONEBOL" })
export class BatasPersil {
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

  @Column("character varying", { name: "KD_BLOK" })
  KD_BLOK!: string;

  @Column("character varying", { name: "NO_URUT", nullable: true })
  NO_URUT!: string | null;

  @Column("character varying", { name: "KD_JNS_OP", nullable: true })
  KD_JNS_OP!: string | null;

  @Column("text", { name: "FOTO_PERSIL", nullable: true, array: true })
  FOTO_PERSIL!: string[] | null;
}
