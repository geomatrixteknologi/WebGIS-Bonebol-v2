import { Column, Entity } from "typeorm";

@Entity("DAT_GAMBAR", { schema: "PBB_KUTAI-BARAT" })
export class DatGambar {
  @Column("numeric", { name: "ID", nullable: true, precision: 1000, scale: 53 })
  id!: string | null;

  @Column("character varying", { name: "URL", nullable: true, length: 500 })
  url!: string | null;

  @Column("character", { name: "CLICK", nullable: true, length: 1 })
  click!: string | null;

  @Column("character varying", {
    name: "URL_IMAGE",
    nullable: true,
    length: 500,
  })
  urlImage!: string | null;
}
