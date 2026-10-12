import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_LEVEL", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvLevel {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "LEVELID#", precision: 1000, scale: 53 })
  levelid!: string;

  @Column("numeric", {
    name: "DIMOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dimobj!: string | null;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;

  @Column("numeric", { name: "TBLOBJ#", precision: 1000, scale: 53 })
  tblobj!: string;

  @Column("bytea", { name: "COLUMNLIST" })
  columnlist!: Buffer;

  @Column("character varying", {
    name: "LEVELNAME",
    nullable: true,
    length: 128,
  })
  levelname!: string | null;
}
