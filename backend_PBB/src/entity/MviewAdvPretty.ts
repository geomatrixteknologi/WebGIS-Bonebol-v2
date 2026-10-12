import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_PRETTY", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvPretty {
  @Column("numeric", {
    name: "QUERYID#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  queryid!: string | null;

  @Column("text", { name: "SQL_TEXT", nullable: true })
  sqlText!: string | null;
}
