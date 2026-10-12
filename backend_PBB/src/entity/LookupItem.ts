import { Column, Entity } from "typeorm";

@Entity("LOOKUP_ITEM", { schema: "PBB_KUTAI-BARAT" })
export class LookupItem {
  @Column("character", { name: "KD_LOOKUP_GROUP", length: 2 })
  kdLookupGroup!: string;

  @Column("character", { name: "KD_LOOKUP_ITEM", length: 1 })
  kdLookupItem!: string;

  @Column("character varying", {
    name: "NM_LOOKUP_ITEM",
    nullable: true,
    length: 225,
  })
  nmLookupItem!: string | null;
}
