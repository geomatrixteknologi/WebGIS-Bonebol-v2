import { Geometry } from "geojson";
import { Column, Entity } from "typeorm";

@Entity("batas_kelurahan", { schema: "GIS_BONEBOL" })
export class BatasKelurahan {
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

  @Column("character varying", { name: "NM_KEL" })
  NM_KEL!: string;
}
