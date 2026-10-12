import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_GC", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvGc {
  @Column("numeric", { name: "GCID#", precision: 1000, scale: 53 })
  gcid!: string;

  @Column("numeric", { name: "FJGID#", precision: 1000, scale: 53 })
  fjgid!: string;

  @Column("numeric", { name: "GCDESLEN", precision: 1000, scale: 53 })
  gcdeslen!: string;

  @Column("bytea", { name: "GCDES" })
  gcdes!: Buffer;

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
