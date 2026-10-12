import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("center_Point", { schema: "GIS_BONEBOL" })
export class CenterPoint {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "LATITUDE" })
  LATITUDE!: string;

  @Column("character varying", { name: "LONGITUDE" })
  LONGITUDE!: string;
}
