import { Column, Entity } from "typeorm";

@Entity("GROUP_RESOURCE", { schema: "PBB_KUTAI-BARAT" })
export class GroupResource {
  @Column("character", { name: "KD_GROUP_RESOURCE", length: 2 })
  kdGroupResource!: string;

  @Column("character varying", {
    name: "NM_GROUP_RESOURCE",
    nullable: true,
    length: 45,
  })
  nmGroupResource!: string | null;
}
