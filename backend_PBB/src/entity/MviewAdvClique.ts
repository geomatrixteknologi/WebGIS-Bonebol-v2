import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_CLIQUE", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvClique {
  @Column("numeric", { name: "CLIQUEID#", precision: 1000, scale: 53 })
  cliqueid!: string;

  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "CLIQUEDESLEN", precision: 1000, scale: 53 })
  cliquedeslen!: string;

  @Column("bytea", { name: "CLIQUEDES" })
  cliquedes!: Buffer;

  @Column("numeric", { name: "HASHVALUE", precision: 1000, scale: 53 })
  hashvalue!: string;

  @Column("numeric", { name: "FREQUENCY", precision: 1000, scale: 53 })
  frequency!: string;

  @Column("numeric", { name: "BYTECOST", precision: 1000, scale: 53 })
  bytecost!: string;

  @Column("numeric", { name: "ROWSIZE", precision: 1000, scale: 53 })
  rowsize!: string;

  @Column("numeric", { name: "NUMROWS", precision: 1000, scale: 53 })
  numrows!: string;
}
