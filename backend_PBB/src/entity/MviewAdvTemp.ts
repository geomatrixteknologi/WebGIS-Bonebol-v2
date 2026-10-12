import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_TEMP", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvTemp {
  @Column("numeric", {
    name: "ID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  id!: string | null;

  @Column("numeric", {
    name: "SEQ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seq!: string | null;

  @Column("text", { name: "TEXT", nullable: true })
  text!: string | null;
}
