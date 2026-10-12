import { Column, Entity } from "typeorm";

@Entity("ref_warna_status_pendaftaran", { schema: "GIS_BONEBOL" })
export class RefWarnaStatusPendaftaran {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("character varying", { name: "STATUS" })
  STATUS!: string;

  @Column("character varying", { name: "WARNA" })
  WARNA!: string;
}
