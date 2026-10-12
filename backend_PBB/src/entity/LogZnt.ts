import { Column, Entity } from "typeorm";

@Entity("LOG_ZNT", { schema: "PBB_KUTAI-BARAT" })
export class LogZnt {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("numeric", {
    name: "STATUS_LOG_ZNT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusLogZnt!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_LOG_ZNT",
    nullable: true,
  })
  tglRekamLogZnt!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_LOG_ZNT",
    nullable: true,
    length: 30,
  })
  nipPerekamLogZnt!: string | null;
}
