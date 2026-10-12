import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_Account", { schema: "GIS_BONEBOL" })
export class UserAccount {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "username", unique: true })
  username!: string;

  @Column("character varying", { name: "password" })
  password!: string;

  @Column("character varying", { name: "role", default: () => "'user'" })
  role!: string;
}
