import { Column, Entity } from "typeorm";
import { Geometry } from "geojson";

@Entity("batas_kecamatan", { schema: "GIS_BONEBOL" })
export class BatasKecamatan {
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

  @Column("character varying", { name: "NM_KEC" })
  NM_KEC!: string;
}
