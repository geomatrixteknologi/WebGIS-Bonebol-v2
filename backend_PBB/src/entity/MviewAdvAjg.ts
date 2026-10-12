import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_AJG", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvAjg {
  @Column("numeric", { name: "AJGID#", precision: 1000, scale: 53 })
  ajgid!: string;

  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "AJGDESLEN", precision: 1000, scale: 53 })
  ajgdeslen!: string;

  @Column("bytea", { name: "AJGDES" })
  ajgdes!: Buffer;

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
