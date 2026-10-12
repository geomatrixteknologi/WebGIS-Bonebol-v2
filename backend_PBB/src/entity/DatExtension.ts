import { Column, Entity } from "typeorm";

@Entity("DAT_EXTENSION", { schema: "PBB_KUTAI-BARAT" })
export class DatExtension {
  @Column("character varying", { name: "ID", length: 255 })
  id!: string;

  @Column("character varying", { name: "NAME", length: 100 })
  name!: string;

  @Column("character", { name: "IS_ACTIVE", nullable: true, length: 1 })
  isActive!: string | null;

  @Column("character varying", {
    name: "CONTENT_TYPE",
    nullable: true,
    length: 255,
  })
  contentType!: string | null;
}
