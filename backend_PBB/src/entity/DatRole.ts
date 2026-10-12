import { Column, Entity } from "typeorm";

@Entity("DAT_ROLE", { schema: "PBB_KUTAI-BARAT" })
export class DatRole {
  @Column("character varying", { name: "ROLE_ID", length: 5 })
  roleId!: string;

  @Column("character varying", { name: "NM_ROLE", nullable: true, length: 20 })
  nmRole!: string | null;

  @Column("character varying", {
    name: "DESKRIPSI",
    nullable: true,
    length: 100,
  })
  deskripsi!: string | null;
}
