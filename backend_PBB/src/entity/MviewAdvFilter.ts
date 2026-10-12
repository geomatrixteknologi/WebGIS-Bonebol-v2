import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_FILTER", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvFilter {
  @Column("numeric", { name: "FILTERID#", precision: 1000, scale: 53 })
  filterid!: string;

  @Column("numeric", { name: "SUBFILTERNUM#", precision: 1000, scale: 53 })
  subfilternum!: string;

  @Column("numeric", { name: "SUBFILTERTYPE", precision: 1000, scale: 53 })
  subfiltertype!: string;

  @Column("character varying", {
    name: "STR_VALUE",
    nullable: true,
    length: 1028,
  })
  strValue!: string | null;

  @Column("numeric", {
    name: "NUM_VALUE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  numValue1!: string | null;

  @Column("numeric", {
    name: "NUM_VALUE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  numValue2!: string | null;

  @Column("timestamp without time zone", {
    name: "DATE_VALUE1",
    nullable: true,
  })
  dateValue1!: Date | null;

  @Column("timestamp without time zone", {
    name: "DATE_VALUE2",
    nullable: true,
  })
  dateValue2!: Date | null;
}
