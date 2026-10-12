import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_EXCEPTIONS", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvExceptions {
  @Column("numeric", {
    name: "RUNID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  runid!: string | null;

  @Column("character varying", { name: "OWNER", nullable: true, length: 128 })
  owner!: string | null;

  @Column("character varying", {
    name: "TABLE_NAME",
    nullable: true,
    length: 128,
  })
  tableName!: string | null;

  @Column("character varying", {
    name: "DIMENSION_NAME",
    nullable: true,
    length: 128,
  })
  dimensionName!: string | null;

  @Column("character varying", {
    name: "RELATIONSHIP",
    nullable: true,
    length: 11,
  })
  relationship!: string | null;

  @Column("character varying", {
    name: "BAD_ROWID",
    nullable: true,
    length: 10,
  })
  badRowid!: string | null;
}
