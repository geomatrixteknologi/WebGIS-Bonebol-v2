import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_FILTERINSTANCE", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvFilterinstance {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", {
    name: "FILTERID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  filterid!: string | null;

  @Column("numeric", {
    name: "SUBFILTERNUM#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  subfilternum!: string | null;

  @Column("numeric", {
    name: "SUBFILTERTYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  subfiltertype!: string | null;

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
