import { Column, Entity } from "typeorm";

@Entity("SQLPLUS_PRODUCT_PROFILE", { schema: "PBB_KUTAI-BARAT" })
export class SqlplusProductProfile {
  @Column("character varying", { name: "PRODUCT", length: 30 })
  product!: string;

  @Column("character varying", { name: "USERID", nullable: true, length: 128 })
  userid!: string | null;

  @Column("character varying", {
    name: "ATTRIBUTE",
    nullable: true,
    length: 240,
  })
  attribute!: string | null;

  @Column("character varying", { name: "SCOPE", nullable: true, length: 240 })
  scope!: string | null;

  @Column("numeric", {
    name: "NUMERIC_VALUE",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  numericValue!: string | null;

  @Column("character varying", {
    name: "CHAR_VALUE",
    nullable: true,
    length: 240,
  })
  charValue!: string | null;

  @Column("timestamp without time zone", { name: "DATE_VALUE", nullable: true })
  dateValue!: Date | null;

  @Column("text", { name: "LONG_VALUE", nullable: true })
  longValue!: string | null;
}
