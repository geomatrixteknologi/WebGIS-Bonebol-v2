import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SESSION_EVOLVE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrSessionEvolve {
  @Column("numeric", {
    name: "BRANCH_LEVEL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  branchLevel!: string | null;

  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", { name: "DB_ID", precision: 1000, scale: 53 })
  dbId!: string;

  @Column("numeric", { name: "RESET_SCN", precision: 1000, scale: 53 })
  resetScn!: string;

  @Column("numeric", { name: "RESET_TIMESTAMP", precision: 1000, scale: 53 })
  resetTimestamp!: string;

  @Column("numeric", {
    name: "PREV_RESET_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prevResetScn!: string | null;

  @Column("numeric", {
    name: "PREV_RESET_TIMESTAMP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  prevResetTimestamp!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

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

  @Column("timestamp without time zone", { name: "SPARE4", nullable: true })
  spare4!: Date | null;
}
