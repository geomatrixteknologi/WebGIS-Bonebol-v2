import { Column, Entity } from "typeorm";

@Entity("ref_warna_status_pendaftaran", { schema: "PBB_MATARAM" })
export class RefWarnaStatusPendaftaran {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("character varying", { name: "STATUS" })
  status!: string;

  @Column("character varying", { name: "WARNA" })
  warna!: string;
}
