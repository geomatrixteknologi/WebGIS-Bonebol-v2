import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_FJG", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvFjg {
  @Column("numeric", { name: "FJGID#", precision: 1000, scale: 53 })
  fjgid!: string;

  @Column("numeric", { name: "AJGID#", precision: 1000, scale: 53 })
  ajgid!: string;

  @Column("numeric", { name: "FJGDESLEN", precision: 1000, scale: 53 })
  fjgdeslen!: string;

  @Column("bytea", { name: "FJGDES" })
  fjgdes!: Buffer;

  @Column("numeric", { name: "HASHVALUE", precision: 1000, scale: 53 })
  hashvalue!: string;

  @Column("numeric", {
    name: "FREQUENCY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  frequency!: string | null;
}
