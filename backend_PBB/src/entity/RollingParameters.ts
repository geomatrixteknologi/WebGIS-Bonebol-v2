import { Column, Entity } from "typeorm";

@Entity("ROLLING$PARAMETERS", { schema: "PBB_KUTAI-BARAT" })
export class RollingParameters {
  @Column("numeric", {
    name: "SCOPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  scope!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 32 })
  name!: string | null;

  @Column("numeric", { name: "ID", nullable: true, precision: 1000, scale: 53 })
  id!: string | null;

  @Column("character varying", { name: "DESCRIP", nullable: true, length: 256 })
  descrip!: string | null;

  @Column("numeric", {
    name: "TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("numeric", {
    name: "DATATYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  datatype!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attributes!: string | null;

  @Column("character varying", { name: "CURVAL", nullable: true, length: 1024 })
  curval!: string | null;

  @Column("character varying", { name: "LSTVAL", nullable: true, length: 1024 })
  lstval!: string | null;

  @Column("character varying", { name: "DEFVAL", nullable: true, length: 1024 })
  defval!: string | null;

  @Column("numeric", {
    name: "MINVAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  minval!: string | null;

  @Column("numeric", {
    name: "MAXVAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  maxval!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 128 })
  spare3!: string | null;
}
