import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("migrations", { schema: "PBB_MATARAM" })
export class Migrations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("bigint", { name: "timestamp" })
  timestamp!: string;

  @Column("character varying", { name: "name" })
  name!: string;
}
