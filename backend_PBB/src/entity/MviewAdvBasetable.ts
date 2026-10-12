import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_BASETABLE", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvBasetable {
  @Column("numeric", { name: "COLLECTIONID#", precision: 1000, scale: 53 })
  collectionid!: string;

  @Column("numeric", { name: "QUERYID#", precision: 1000, scale: 53 })
  queryid!: string;

  @Column("character varying", { name: "OWNER", nullable: true, length: 128 })
  owner!: string | null;

  @Column("character varying", {
    name: "TABLE_NAME",
    nullable: true,
    length: 128,
  })
  tableName!: string | null;

  @Column("numeric", {
    name: "TABLE_TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tableType!: string | null;
}
