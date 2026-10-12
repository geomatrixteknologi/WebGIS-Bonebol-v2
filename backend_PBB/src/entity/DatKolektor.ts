import { Column, Entity } from "typeorm";

@Entity("DAT_KOLEKTOR", { schema: "PBB_KUTAI-BARAT" })
export class DatKolektor {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_KOLEKTOR", length: 3 })
  kdKolektor!: string;

  @Column("character varying", {
    name: "NM_KOLEKTOR",
    nullable: true,
    length: 50,
  })
  nmKolektor!: string | null;

  @Column("character varying", {
    name: "NM_LINGKUNGAN",
    nullable: true,
    length: 50,
  })
  nmLingkungan!: string | null;
}
