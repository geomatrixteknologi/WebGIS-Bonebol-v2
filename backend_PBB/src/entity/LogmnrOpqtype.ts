import { Column, Entity } from "typeorm";

@Entity("LOGMNR_OPQTYPE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrOpqtype {
  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

  @Column("numeric", {
    name: "TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "LOBCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  lobcol!: string | null;

  @Column("numeric", {
    name: "OBJCOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  objcol!: string | null;

  @Column("numeric", {
    name: "EXTRACOL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  extracol!: string | null;

  @Column("bytea", { name: "SCHEMAOID", nullable: true })
  schemaoid!: Buffer | null;

  @Column("numeric", {
    name: "ELEMNUM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  elemnum!: string | null;

  @Column("character varying", {
    name: "SCHEMAURL",
    nullable: true,
    length: 4000,
  })
  schemaurl!: string | null;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", {
    name: "LOGMNR_UID",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrUid!: string | null;

  @Column("numeric", {
    name: "LOGMNR_FLAGS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrFlags!: string | null;
}
