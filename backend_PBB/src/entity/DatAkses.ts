import { Column, Entity } from "typeorm";

@Entity("DAT_AKSES", { schema: "PBB_KUTAI-BARAT" })
export class DatAkses {
  @Column("character varying", { name: "AKSES_ID", length: 15 })
  aksesId!: string;

  @Column("character varying", {
    name: "NM_AKSES",
    nullable: true,
    length: 200,
  })
  nmAkses!: string | null;

  @Column("character varying", {
    name: "URL_AKSES",
    nullable: true,
    length: 255,
  })
  urlAkses!: string | null;

  @Column("character varying", { name: "ICON", nullable: true, length: 200 })
  icon!: string | null;

  @Column("character", { name: "IS_ACTIVE", nullable: true, length: 1 })
  isActive!: string | null;
}
