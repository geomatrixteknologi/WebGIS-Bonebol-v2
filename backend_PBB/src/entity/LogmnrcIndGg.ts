import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_IND_GG", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcIndGg {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("character varying", { name: "NAME", length: 384 })
  name!: string;

  @Column("numeric", { name: "COMMIT_SCN", precision: 1000, scale: 53 })
  commitScn!: string;

  @Column("numeric", {
    name: "DROP_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropScn!: string | null;

  @Column("numeric", { name: "BASEOBJ#", precision: 1000, scale: 53 })
  baseobj!: string;

  @Column("numeric", { name: "BASEOBJV#", precision: 1000, scale: 53 })
  baseobjv!: string;

  @Column("numeric", { name: "FLAGS", precision: 1000, scale: 53 })
  flags!: string;

  @Column("numeric", { name: "OWNER#", precision: 1000, scale: 53 })
  owner!: string;

  @Column("character varying", { name: "OWNERNAME", length: 384 })
  ownername!: string;

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

  @Column("character varying", { name: "SPARE4", nullable: true, length: 4000 })
  spare4!: string | null;

  @Column("character varying", { name: "SPARE5", nullable: true, length: 4000 })
  spare5!: string | null;

  @Column("character varying", { name: "SPARE6", nullable: true, length: 4000 })
  spare6!: string | null;
}
