import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_SQLDEPEND", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvSqldepend {
  @Column("numeric", {
    name: "COLLECTIONID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  collectionid!: string | null;

  @Column("numeric", {
    name: "INST_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  instId!: string | null;

  @Column("bytea", { name: "FROM_ADDRESS", nullable: true })
  fromAddress!: Buffer | null;

  @Column("numeric", {
    name: "FROM_HASH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fromHash!: string | null;

  @Column("character varying", {
    name: "TO_OWNER",
    nullable: true,
    length: 128,
  })
  toOwner!: string | null;

  @Column("character varying", {
    name: "TO_NAME",
    nullable: true,
    length: 1000,
  })
  toName!: string | null;

  @Column("numeric", {
    name: "TO_TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  toType!: string | null;

  @Column("numeric", {
    name: "CARDINALITY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cardinality!: string | null;
}
