import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ref_warna_znt", { schema: "PBB_MATARAM" })
export class RefWarnaZnt {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "STATUS" })
  status!: string;

  @Column("character varying", { name: "WARNA" })
  warna!: string;
}
