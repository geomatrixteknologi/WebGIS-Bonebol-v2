import { Column, Entity } from "typeorm";

@Entity("M_BAYAR", { schema: "PBB_KUTAI-BARAT" })
export class MBayar {
  @Column("numeric", { name: "ID", precision: 1000, scale: 53 })
  id!: string;

  @Column("character varying", { name: "BYR_TITLE", length: 100 })
  byrTitle!: string;

  @Column("character varying", { name: "BYR_CONTENT", length: 100 })
  byrContent!: string;

  @Column("timestamp without time zone", { name: "BYR_DATE" })
  byrDate!: Date;
}
