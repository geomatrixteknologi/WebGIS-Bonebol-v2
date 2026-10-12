import { Column, Entity } from "typeorm";

@Entity("LOG_PEMBAYARAN", { schema: "PBB_KUTAI-BARAT" })
export class LogPembayaran {
  @Column("character varying", { name: "LOG", nullable: true, length: 500 })
  log!: string | null;

  @Column("timestamp without time zone", { name: "TANGGAL", nullable: true })
  tanggal!: Date | null;
}
