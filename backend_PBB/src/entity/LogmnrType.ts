import { Column, Entity } from "typeorm";

@Entity("LOGMNR_TYPE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrType {
  @Column("numeric", {
    name: "VERSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  versionA!: string | null;

  @Column("character varying", { name: "VERSION", nullable: true, length: 384 })
  version!: string | null;

  @Column("bytea", { name: "TVOID", nullable: true })
  tvoid!: Buffer | null;

  @Column("numeric", {
    name: "TYPECODE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  typecode!: string | null;

  @Column("numeric", {
    name: "PROPERTIES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  properties!: string | null;

  @Column("numeric", {
    name: "ATTRIBUTES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  attributes!: string | null;

  @Column("numeric", {
    name: "METHODS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  methods!: string | null;

  @Column("numeric", {
    name: "HIDDENMETHODS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  hiddenmethods!: string | null;

  @Column("numeric", {
    name: "SUPERTYPES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  supertypes!: string | null;

  @Column("numeric", {
    name: "SUBTYPES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  subtypes!: string | null;

  @Column("numeric", {
    name: "EXTERNTYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  externtype!: string | null;

  @Column("character varying", {
    name: "EXTERNNAME",
    nullable: true,
    length: 4000,
  })
  externname!: string | null;

  @Column("character varying", {
    name: "HELPERCLASSNAME",
    nullable: true,
    length: 4000,
  })
  helperclassname!: string | null;

  @Column("numeric", {
    name: "LOCAL_ATTRS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  localAttrs!: string | null;

  @Column("numeric", {
    name: "LOCAL_METHODS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  localMethods!: string | null;

  @Column("bytea", { name: "TYPEID", nullable: true })
  typeid!: Buffer | null;

  @Column("bytea", { name: "ROOTTOID", nullable: true })
  roottoid!: Buffer | null;

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

  @Column("bytea", { name: "SUPERTOID", nullable: true })
  supertoid!: Buffer | null;

  @Column("bytea", { name: "HASHCODE", nullable: true })
  hashcode!: Buffer | null;

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
