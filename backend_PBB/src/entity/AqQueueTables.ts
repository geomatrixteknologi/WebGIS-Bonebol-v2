import { Column, Entity } from "typeorm";

@Entity("AQ$_QUEUE_TABLES", { schema: "PBB_KUTAI-BARAT" })
export class AqQueueTables {
  @Column("character varying", { name: "SCHEMA", length: 128 })
  schema!: string;

  @Column("character varying", { name: "NAME", length: 128 })
  name!: string;

  @Column("numeric", { name: "UDATA_TYPE", precision: 1000, scale: 53 })
  udataType!: string;

  @Column("numeric", { name: "OBJNO", precision: 1000, scale: 53 })
  objno!: string;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;

  @Column("numeric", { name: "SORT_COLS", precision: 1000, scale: 53 })
  sortCols!: string;

  @Column("character varying", { name: "TIMEZONE", nullable: true, length: 64 })
  timezone!: string | null;

  @Column("character varying", {
    name: "TABLE_COMMENT",
    nullable: true,
    length: 2000,
  })
  tableComment!: string | null;
}
