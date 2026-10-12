import { Column, Entity } from "typeorm";

@Entity("ROLLING$PLAN", { schema: "PBB_KUTAI-BARAT" })
export class RollingPlan {
  @Column("numeric", {
    name: "INSTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  instid!: string | null;

  @Column("numeric", {
    name: "BATCHID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  batchid!: string | null;

  @Column("numeric", {
    name: "DIRECTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  directid!: string | null;

  @Column("numeric", {
    name: "TASKID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  taskid!: string | null;

  @Column("numeric", {
    name: "REVISION",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  revision!: string | null;

  @Column("numeric", {
    name: "PHASE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  phase!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("numeric", {
    name: "PROGRESS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  progress!: string | null;

  @Column("numeric", {
    name: "SOURCE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  source!: string | null;

  @Column("numeric", {
    name: "TARGET",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  target!: string | null;

  @Column("numeric", {
    name: "RFLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rflags!: string | null;

  @Column("numeric", {
    name: "OPCODE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  opcode!: string | null;

  @Column("character varying", { name: "P1", nullable: true, length: 256 })
  p1!: string | null;

  @Column("character varying", { name: "P2", nullable: true, length: 256 })
  p2!: string | null;

  @Column("character varying", { name: "P3", nullable: true, length: 256 })
  p3!: string | null;

  @Column("character varying", { name: "P4", nullable: true, length: 256 })
  p4!: string | null;

  @Column("character varying", {
    name: "DESCRIPTION",
    nullable: true,
    length: 256,
  })
  description!: string | null;

  @Column("numeric", {
    name: "EXEC_STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  execStatus!: string | null;

  @Column("character varying", {
    name: "EXEC_INFO",
    nullable: true,
    length: 256,
  })
  execInfo!: string | null;

  @Column("timestamp without time zone", { name: "EXEC_TIME", nullable: true })
  execTime!: Date | null;

  @Column("timestamp without time zone", {
    name: "FINISH_TIME",
    nullable: true,
  })
  finishTime!: Date | null;

  @Column("numeric", {
    name: "POST_STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  postStatus!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 256 })
  spare3!: string | null;
}
