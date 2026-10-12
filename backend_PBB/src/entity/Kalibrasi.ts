import { Column, Entity } from "typeorm";

@Entity("KALIBRASI", { schema: "PBB_KUTAI-BARAT" })
export class Kalibrasi {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "THN_KALIBRASI", length: 4 })
  thnKalibrasi!: string;

  @Column("numeric", { name: "INDEKS_KALIBRASI", precision: 2, scale: 0 })
  indeksKalibrasi!: string;

  @Column("timestamp without time zone", {
    name: "TGL_KALIBRASI",
    nullable: true,
  })
  tglKalibrasi!: Date | null;

  @Column("character", {
    name: "NIP_PENGKALIBRASI",
    nullable: true,
    length: 30,
  })
  nipPengkalibrasi!: string | null;
}
