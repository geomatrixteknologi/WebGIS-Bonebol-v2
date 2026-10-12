import { Column, Entity } from "typeorm";

@Entity("LOGMNR_OBJ$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrObj {
  @Column("numeric", { name: "OBJV#", nullable: true, precision: 22, scale: 0 })
  objv!: string | null;

  @Column("numeric", {
    name: "OWNER#",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  owner!: string | null;

  @Column("character varying", { name: "NAME", nullable: true, length: 384 })
  name!: string | null;

  @Column("numeric", {
    name: "NAMESPACE",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  namespace!: string | null;

  @Column("character varying", { name: "SUBNAME", nullable: true, length: 384 })
  subname!: string | null;

  @Column("numeric", { name: "TYPE#", nullable: true, precision: 22, scale: 0 })
  type!: string | null;

  @Column("bytea", { name: "OID$", nullable: true })
  oid!: Buffer | null;

  @Column("character varying", {
    name: "REMOTEOWNER",
    nullable: true,
    length: 384,
  })
  remoteowner!: string | null;

  @Column("character varying", {
    name: "LINKNAME",
    nullable: true,
    length: 384,
  })
  linkname!: string | null;

  @Column("numeric", { name: "FLAGS", nullable: true, precision: 22, scale: 0 })
  flags!: string | null;

  @Column("numeric", {
    name: "SPARE3",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  spare3!: string | null;

  @Column("timestamp without time zone", { name: "STIME", nullable: true })
  stime!: Date | null;

  @Column("numeric", { name: "OBJ#", precision: 22, scale: 0 })
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

  @Column("numeric", {
    name: "START_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnbas!: string | null;

  @Column("numeric", {
    name: "START_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnwrp!: string | null;
}
