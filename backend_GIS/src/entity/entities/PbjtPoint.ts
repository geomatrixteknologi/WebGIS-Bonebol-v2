import { Column, Entity } from "typeorm";

@Entity("pbjt", { schema: "GIS_BONEBOL" })
export class PbjtPoint {
  @Column("character varying", { primary: true, name: "npwpd", length: 20 })
  npwpd!: string;

  @Column("character varying", { name: "tipe_op", nullable: true, length: 20 })
  tipeOp!: string | null;

  @Column("character varying", { name: "nama_wp", nullable: true, length: 100 })
  namaWp!: string | null;

  @Column("text", { name: "koordinat", nullable: true })
  koordinat!: string | null;

  @Column("text", { name: "keterangan", nullable: true })
  keterangan!: string | null;

  @Column("geometry", { name: "geom", nullable: true })
  geom!: string | null;
}
