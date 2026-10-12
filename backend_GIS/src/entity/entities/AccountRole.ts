import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("account_Role", { schema: "GIS_BONEBOL" })
export class AccountRole {
  @Column("character varying", { name: "ROLE" })
  role!: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;
}
