import { Column, Entity } from "typeorm";

@Entity("ROLE_AKSES", { schema: "PBB_KUTAI-BARAT" })
export class RoleAkses {
  @Column("character varying", { name: "ROLE_ID", length: 5 })
  roleId!: string;

  @Column("character varying", { name: "AKSES_ID", length: 15 })
  aksesId!: string;

  @Column("character", { name: "ALLOWED", nullable: true, length: 1 })
  allowed!: string | null;
}
