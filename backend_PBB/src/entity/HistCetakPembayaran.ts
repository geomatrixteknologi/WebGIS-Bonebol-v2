import { Column, Entity } from "typeorm";

@Entity("HIST_CETAK_PEMBAYARAN", { schema: "PBB_KUTAI-BARAT" })
export class HistCetakPembayaran {
  @Column("character varying", { name: "NOP", length: 50 })
  nop!: string;

  @Column("character varying", { name: "JNS_CETAK", length: 20 })
  jnsCetak!: string;

  @Column("numeric", { name: "CETAKAN_KE", precision: 1000, scale: 53 })
  cetakanKe!: string;

  @Column("character varying", { name: "TAHUN", length: 4 })
  tahun!: string;
}
