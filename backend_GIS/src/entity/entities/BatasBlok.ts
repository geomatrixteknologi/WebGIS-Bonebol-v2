import { Column, Entity } from "typeorm";
import { Geometry } from "geojson";

@Entity("batas_blok", { schema: "GIS_BONEBOL" })
export class BatasBlok {
  @Column({
    type: "geometry",
    spatialFeatureType: "MultiPolygon",
    srid: 3857,
  })
  geom!: Geometry | null;

  @Column("character varying", { primary: true, name: "KD_PROV" })
  KD_PROV!: string;

  @Column("character varying", { primary: true, name: "KD_KAB" })
  KD_KAB!: string;

  @Column("character varying", { primary: true, name: "KD_KEC" })
  KD_KEC!: string;

  @Column("character varying", { primary: true, name: "KD_KEL" })
  KD_KEL!: string;

  @Column("character varying", { primary: true, name: "KD_BLOK" })
  KD_BLOK!: string;
}
