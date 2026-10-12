import { Column, Entity } from "typeorm";

@Entity("PERSYARATAN", { schema: "PBB_KUTAI-BARAT" })
export class Persyaratan {
  @Column("numeric", { name: "ID", nullable: true, precision: 1000, scale: 53 })
  id!: string | null;

  @Column("character varying", {
    name: "NM_SYARAT",
    nullable: true,
    length: 500,
  })
  nmSyarat!: string | null;

  @Column("numeric", {
    name: "JNS_PELAYANAN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  jnsPelayanan!: string | null;
}
