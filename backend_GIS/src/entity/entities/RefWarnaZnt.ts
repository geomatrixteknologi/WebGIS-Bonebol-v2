import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ref_warna_znt", { schema: "GIS_BONEBOL" })
export class RefWarnaZnt {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "STATUS" })
  STATUS!: string;

  @Column("character varying", { name: "WARNA" })
  WARNA!: string;
}
