import { Column, Entity } from "typeorm";

@Entity("LOGMNR_GLOBAL$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrGlobal {
  @Column("numeric", {
    name: "HIGH_RECID_FOREIGN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  highRecidForeign!: string | null;

  @Column("numeric", {
    name: "HIGH_RECID_DELETED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  highRecidDeleted!: string | null;

  @Column("numeric", {
    name: "LOCAL_RESET_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  localResetScn!: string | null;

  @Column("numeric", {
    name: "LOCAL_RESET_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  localResetTimestamp!: string | null;

  @Column("numeric", {
    name: "VERSION_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  versionTimestamp!: string | null;

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

  @Column("character varying", { name: "SPARE4", nullable: true, length: 2000 })
  spare4!: string | null;

  @Column("timestamp without time zone", { name: "SPARE5", nullable: true })
  spare5!: Date | null;

  @Column("numeric", {
    name: "SESSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  session!: string | null;
}
