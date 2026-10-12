import { Column, Entity } from "typeorm";

@Entity("HIS_PROSES_PEMEKARAN", { schema: "PBB_KUTAI-BARAT" })
export class HisProsesPemekaran {
  @Column("character varying", { name: "ID_PROSES", length: 17 })
  idProses!: string;

  @Column("timestamp without time zone", { name: "WAKTU" })
  waktu!: Date;

  @Column("character varying", { name: "KETERANGAN", length: 500 })
  keterangan!: string;
}
