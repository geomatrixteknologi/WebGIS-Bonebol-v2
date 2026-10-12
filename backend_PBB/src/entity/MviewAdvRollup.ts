import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_ROLLUP", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvRollup {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "CLEVELID#", precision: 1000, scale: 53 })
  clevelid!: string;

  @Column("numeric", { name: "PLEVELID#", precision: 1000, scale: 53 })
  plevelid!: string;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;
}
