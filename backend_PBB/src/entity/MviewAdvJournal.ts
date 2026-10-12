import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_JOURNAL", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvJournal {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "SEQ#", precision: 1000, scale: 53 })
  seq!: string;

  @Column("timestamp without time zone", { name: "TIMESTAMP" })
  timestamp!: Date;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;

  @Column("numeric", {
    name: "NUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  num!: string | null;

  @Column("text", { name: "TEXT", nullable: true })
  text!: string | null;

  @Column("numeric", {
    name: "TEXTLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  textlen!: string | null;
}
