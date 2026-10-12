import { Column, Entity } from "typeorm";

@Entity("LOGMNR_ATTRIBUTE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrAttribute {
  @Column("numeric", {
    name: "VERSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  version!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 384 })
  name!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attribute!: string | null;

  @Column("bytea", { name: "ATTR_TOID", nullable: true })
  attrToid!: Buffer | null;

  @Column("numeric", {
    name: "ATTR_VERSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attrVersion!: string | null;

  @Column("numeric", {
    name: "SYNOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  synobj!: string | null;

  @Column("numeric", {
    name: "PROPERTIES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  properties!: string | null;

  @Column("numeric", {
    name: "CHARSETID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  charsetid!: string | null;

  @Column("numeric", {
    name: "CHARSETFORM",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  charsetform!: string | null;

  @Column("numeric", {
    name: "LENGTH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  length!: string | null;

  @Column("numeric", {
    name: "PRECISION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  precision!: string | null;

  @Column("numeric", {
    name: "SCALE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  scale!: string | null;

  @Column("character varying", {
    name: "EXTERNNAME",
    nullable: true,
    length: 4000,
  })
  externname!: string | null;

  @Column("numeric", {
    name: "XFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xflags!: string | null;

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

  @Column("numeric", {
    name: "SPARE3",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare3!: string | null;

  @Column("numeric", {
    name: "SPARE4",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare4!: string | null;

  @Column("numeric", {
    name: "SPARE5",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare5!: string | null;

  @Column("numeric", {
    name: "SETTER",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  setter!: string | null;

  @Column("numeric", {
    name: "GETTER",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  getter!: string | null;

  @Column("bytea", { name: "TOID" })
  toid!: Buffer;

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
