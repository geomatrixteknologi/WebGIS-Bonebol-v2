import { Column, Entity } from "typeorm";

@Entity("OL$", { schema: "PBB_KUTAI-BARAT" })
export class Ol {
  @Column("character varying", { name: "OL_NAME", nullable: true, length: 128 })
  olName!: string | null;

  @Column("text", { name: "SQL_TEXT", nullable: true })
  sqlText!: string | null;

  @Column("numeric", {
    name: "TEXTLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  textlen!: string | null;

  @Column("bytea", { name: "SIGNATURE", nullable: true })
  signature!: Buffer | null;

  @Column("numeric", {
    name: "HASH_VALUE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hashValue!: string | null;

  @Column("numeric", {
    name: "HASH_VALUE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hashValue2!: string | null;

  @Column("character varying", {
    name: "CATEGORY",
    nullable: true,
    length: 128,
  })
  category!: string | null;

  @Column("character varying", { name: "VERSION", nullable: true, length: 64 })
  version!: string | null;

  @Column("character varying", { name: "CREATOR", nullable: true, length: 128 })
  creator!: string | null;

  @Column("timestamp without time zone", { name: "TIMESTAMP", nullable: true })
  timestamp!: Date | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "HINTCOUNT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hintcount!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("character varying", { name: "SPARE2", nullable: true, length: 1000 })
  spare2!: string | null;
}
