import { Column, Entity } from "typeorm";

@Entity("ITEM_RESOURCE", { schema: "PBB_KUTAI-BARAT" })
export class ItemResource {
  @Column("character", { name: "KD_GROUP_RESOURCE", length: 2 })
  kdGroupResource!: string;

  @Column("character", { name: "KD_RESOURCE", length: 2 })
  kdResource!: string;

  @Column("character varying", {
    name: "NM_RESOURCE",
    nullable: true,
    length: 45,
  })
  nmResource!: string | null;

  @Column("character varying", {
    name: "SATUAN_RESOURCE",
    nullable: true,
    length: 15,
  })
  satuanResource!: string | null;
}
