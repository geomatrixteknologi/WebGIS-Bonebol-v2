import { Column, Entity } from "typeorm";

@Entity("MENU_PEGAWAI", { schema: "PBB_KUTAI-BARAT" })
export class MenuPegawai {
  @Column("character", { name: "NIP", length: 30 })
  nip!: string;

  @Column("character varying", { name: "MENU", nullable: true, length: 255 })
  menu!: string | null;

  @Column("timestamp without time zone", { name: "TGL_UPDATE", nullable: true })
  tglUpdate!: Date | null;
}
