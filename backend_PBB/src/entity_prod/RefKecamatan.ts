import { Column, Entity } from "typeorm";

@Entity("REF_KECAMATAN", { schema: process.env.DB_SCHEMA })
export class RefKecamatan {
  @Column("char", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("char", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("char", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("varchar2", {
    name: "NM_KECAMATAN",
    nullable: true,
    length: 30,
  })
  nmKecamatan!: string | null;
}
