import { Column, Entity } from "typeorm";

@Entity("DAT_KUNJUNGAN_KEMBALI", { schema: "PBB_KUTAI-BARAT" })
export class DatKunjunganKembali {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("numeric", { name: "NO_BNG", precision: 3, scale: 0 })
  noBng!: string;

  @Column("timestamp without time zone", {
    name: "TGL_KUNJUNGAN_KEMBALI",
    nullable: true,
  })
  tglKunjunganKembali!: Date | null;

  @Column("numeric", {
    name: "STATUS_KUNJUNGAN_KEMBALI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusKunjunganKembali!: string | null;
}
