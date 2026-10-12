import { Column, Entity } from "typeorm";

@Entity("LOGMNR_FILTER$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrFilter {
  @Column("numeric", {
    name: "SESSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  session!: string | null;

  @Column("character varying", {
    name: "FILTER_TYPE",
    nullable: true,
    length: 30,
  })
  filterType!: string | null;

  @Column("numeric", {
    name: "ATTR1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr1!: string | null;

  @Column("numeric", {
    name: "ATTR2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr2!: string | null;

  @Column("numeric", {
    name: "ATTR3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr3!: string | null;

  @Column("numeric", {
    name: "ATTR4",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr4!: string | null;

  @Column("numeric", {
    name: "ATTR5",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr5!: string | null;

  @Column("numeric", {
    name: "ATTR6",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attr6!: string | null;

  @Column("numeric", {
    name: "FILTER_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  filterScn!: string | null;

  @Column("numeric", {
    name: "SPARE1",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare1!: string | null;

  @Column("numeric", {
    name: "SPARE2",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare2!: string | null;

  @Column("timestamp without time zone", { name: "SPARE3", nullable: true })
  spare3!: Date | null;

  @Column("character varying", { name: "ATTR7", nullable: true, length: 128 })
  attr7!: string | null;

  @Column("character varying", { name: "ATTR8", nullable: true, length: 128 })
  attr8!: string | null;

  @Column("character varying", { name: "ATTR9", nullable: true, length: 128 })
  attr9!: string | null;

  @Column("character varying", { name: "ATTR10", nullable: true, length: 128 })
  attr10!: string | null;

  @Column("character varying", { name: "ATTR11", nullable: true, length: 128 })
  attr11!: string | null;
}
