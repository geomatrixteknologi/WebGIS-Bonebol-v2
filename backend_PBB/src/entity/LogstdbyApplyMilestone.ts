import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$APPLY_MILESTONE", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyApplyMilestone {
  @Column("numeric", { name: "SESSION_ID", precision: 1000, scale: 53 })
  sessionId!: string;

  @Column("numeric", { name: "COMMIT_SCN", precision: 1000, scale: 53 })
  commitScn!: string;

  @Column("timestamp without time zone", {
    name: "COMMIT_TIME",
    nullable: true,
  })
  commitTime!: Date | null;

  @Column("numeric", { name: "SYNCH_SCN", precision: 1000, scale: 53 })
  synchScn!: string;

  @Column("numeric", { name: "EPOCH", precision: 1000, scale: 53 })
  epoch!: string;

  @Column("numeric", { name: "PROCESSED_SCN", precision: 1000, scale: 53 })
  processedScn!: string;

  @Column("timestamp without time zone", {
    name: "PROCESSED_TIME",
    nullable: true,
  })
  processedTime!: Date | null;

  @Column("numeric", { name: "FETCHLWM_SCN", precision: 1000, scale: 53 })
  fetchlwmScn!: string;

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

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("timestamp without time zone", {
    name: "LWM_UPD_TIME",
    nullable: true,
  })
  lwmUpdTime!: Date | null;

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
    name: "SPARE6",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  spare6!: string | null;

  @Column("timestamp without time zone", { name: "SPARE7", nullable: true })
  spare7!: Date | null;

  @Column("numeric", {
    name: "PTO_RECOVERY_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ptoRecoveryScn!: string | null;

  @Column("numeric", {
    name: "PTO_RECOVERY_INCARNATION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  ptoRecoveryIncarnation!: string | null;
}
