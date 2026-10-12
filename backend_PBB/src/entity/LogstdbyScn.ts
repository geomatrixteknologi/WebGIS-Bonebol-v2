import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$SCN", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyScn {
  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("character varying", {
    name: "OBJNAME",
    nullable: true,
    length: 4000,
  })
  objname!: string | null;

  @Column("character varying", { name: "SCHEMA", nullable: true, length: 128 })
  schema!: string | null;

  @Column("character varying", { name: "TYPE", nullable: true, length: 20 })
  type!: string | null;

  @Column("numeric", {
    name: "SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  scn!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 2000 })
  spare3!: string | null;
}
