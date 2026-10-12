import { Column, Entity } from "typeorm";

@Entity("REF_KELURAHAN", { schema: process.env.DB_SCHEMA })
export class RefKelurahan {
  @Column("char", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("char", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("char", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("char", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("char", { name: "KD_SEKTOR", nullable: true, length: 2 })
  kdSektor!: string | null;

  @Column("varchar2", {
    name: "NM_KELURAHAN",
    nullable: true,
    length: 30,
  })
  nmKelurahan!: string | null;

  @Column("number", {
    name: "NO_KELURAHAN",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  noKelurahan!: string | null;

  @Column("varchar2", {
    name: "KD_POS_KELURAHAN",
    nullable: true,
    length: 5,
  })
  kdPosKelurahan!: string | null;
}
