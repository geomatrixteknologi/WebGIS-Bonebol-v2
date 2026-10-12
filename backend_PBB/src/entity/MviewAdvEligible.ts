import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_ELIGIBLE", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvEligible {
  @Column("numeric", { name: "SUMOBJN#", precision: 1000, scale: 53 })
  sumobjn!: string;

  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "BYTECOST", precision: 1000, scale: 53 })
  bytecost!: string;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;

  @Column("numeric", { name: "FREQUENCY", precision: 1000, scale: 53 })
  frequency!: string;
}
