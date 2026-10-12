import { Column, Entity } from "typeorm";

@Entity("LOOKUP_GROUP", { schema: "PBB_KUTAI-BARAT" })
export class LookupGroup {
  @Column("character", { name: "KD_LOOKUP_GROUP", length: 2 })
  kdLookupGroup!: string;

  @Column("character varying", {
    name: "NM_LOOKUP_GROUP",
    nullable: true,
    length: 50,
  })
  nmLookupGroup!: string | null;
}
