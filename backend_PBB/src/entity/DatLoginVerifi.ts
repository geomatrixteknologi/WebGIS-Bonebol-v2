import { Column, Entity } from "typeorm";

@Entity("DAT_LOGIN_VERIFI", { schema: "PBB_KUTAI-BARAT" })
export class DatLoginVerifi {
  @Column("character varying", { name: "NM_LOGIN", nullable: true, length: 18 })
  nmLogin!: string | null;

  @Column("character", { name: "NIP", nullable: true, length: 18 })
  nip!: string | null;

  @Column("character varying", { name: "PASSWORD", nullable: true, length: 50 })
  password!: string | null;

  @Column("character varying", { name: "ROLE_ID", nullable: true, length: 5 })
  roleId!: string | null;

  @Column("character varying", { name: "KD_LP", nullable: true, length: 10 })
  kdLp!: string | null;
}
