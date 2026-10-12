import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_SEQ_GG", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcSeqGg {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", { name: "COMMIT_SCN", precision: 1000, scale: 53 })
  commitScn!: string;

  @Column("numeric", {
    name: "DROP_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dropScn!: string | null;

  @Column("numeric", { name: "SEQ_FLAGS", precision: 1000, scale: 53 })
  seqFlags!: string;

  @Column("numeric", { name: "OWNER#", precision: 1000, scale: 53 })
  owner!: string;

  @Column("character varying", { name: "OWNERNAME", length: 384 })
  ownername!: string;

  @Column("character varying", { name: "OBJNAME", length: 384 })
  objname!: string;

  @Column("numeric", {
    name: "SEQCACHE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqcache!: string | null;

  @Column("numeric", {
    name: "SEQINC",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  seqinc!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 4000 })
  spare3!: string | null;

  @Column("character varying", { name: "SPARE4", nullable: true, length: 4000 })
  spare4!: string | null;
}
