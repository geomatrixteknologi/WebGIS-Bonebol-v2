import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_PARAMETERS", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvParameters {
  @Column("character varying", { name: "PARAMETER_NAME", length: 128 })
  parameterName!: string;

  @Column("numeric", { name: "PARAMETER_TYPE", precision: 1000, scale: 53 })
  parameterType!: string;

  @Column("character varying", {
    name: "STRING_VALUE",
    nullable: true,
    length: 30,
  })
  stringValue!: string | null;

  @Column("timestamp without time zone", { name: "DATE_VALUE", nullable: true })
  dateValue!: Date | null;

  @Column("numeric", {
    name: "NUMERICAL_VALUE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  numericalValue!: string | null;
}
