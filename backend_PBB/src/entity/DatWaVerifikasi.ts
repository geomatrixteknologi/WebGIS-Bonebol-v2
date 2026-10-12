import { Column, Entity } from "typeorm";

@Entity("DAT_WA_VERIFIKASI", { schema: "PBB_KUTAI-BARAT" })
export class DatWaVerifikasi {
  @Column("character", { name: "KODE_VERIFIKASI", length: 6 })
  kodeVerifikasi!: string;

  @Column("timestamp without time zone", { name: "TANGGAL", nullable: true })
  tanggal!: Date | null;

  @Column("character varying", { name: "TELP", length: 15 })
  telp!: string;
}
