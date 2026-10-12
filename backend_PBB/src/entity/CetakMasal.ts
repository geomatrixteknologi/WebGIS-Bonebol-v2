import { Column, Entity } from "typeorm";

@Entity("CETAK_MASAL", { schema: "PBB_KUTAI-BARAT" })
export class CetakMasal {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "THN_CETAK_MASAL", length: 4 })
  thnCetakMasal!: string;

  @Column("numeric", { name: "INDEKS_CETAK_MASAL", precision: 2, scale: 0 })
  indeksCetakMasal!: string;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_MASAL",
    nullable: true,
  })
  tglCetakMasal!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_MASAL",
    nullable: true,
    length: 30,
  })
  nipPencetakMasal!: string | null;

  @Column("numeric", {
    name: "JML_SPPT",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  jmlSppt!: string | null;

  @Column("numeric", {
    name: "JML_PBB_YG_HARUS_DIBAYAR",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  jmlPbbYgHarusDibayar!: string | null;
}
