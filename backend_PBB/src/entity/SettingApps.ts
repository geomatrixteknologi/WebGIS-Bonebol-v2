import { Column, Entity } from "typeorm";

@Entity("SETTING_APPS", { schema: "PBB_KUTAI-BARAT" })
export class SettingApps {
  @Column("numeric", { name: "ID", nullable: true, precision: 1000, scale: 53 })
  id!: string | null;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character varying", {
    name: "NAMA_PROPINSI",
    nullable: true,
    length: 30,
  })
  namaPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character varying", {
    name: "NAMA_DATI2",
    nullable: true,
    length: 30,
  })
  namaDati2!: string | null;

  @Column("character varying", { name: "LOGO", nullable: true, length: 30 })
  logo!: string | null;

  @Column("numeric", {
    name: "CHANGE_PASSWORD",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  changePassword!: string | null;

  @Column("character varying", {
    name: "NAMA_APLIKASI",
    nullable: true,
    length: 200,
  })
  namaAplikasi!: string | null;
}
