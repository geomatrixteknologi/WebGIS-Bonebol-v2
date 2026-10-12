import { Column, Entity } from "typeorm";

@Entity("ref_warna_status_pembayaran", { schema: "PBB_MATARAM" })
export class RefWarnaStatusPembayaran {
  @Column("integer", { primary: true, name: "id" })
  id!: number;

  @Column("character varying", { name: "STATUS" })
  status!: string;

  @Column("character varying", { name: "WARNA" })
  warna!: string;
}
