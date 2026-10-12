import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("zoom", { schema: "GIS_BONEBOL" })
export class Zoom {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("integer", { name: "zoom" })
  zoom!: number;
}
