import { Column, Entity } from "typeorm";

@Entity("ROLLING$DIRECTIVES", { schema: "PBB_KUTAI-BARAT" })
export class RollingDirectives {
  @Column("numeric", {
    name: "DIRECTID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  directid!: string | null;

  @Column("numeric", {
    name: "PHASE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  phase!: string | null;

  @Column("numeric", {
    name: "TASKID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  taskid!: string | null;

  @Column("character varying", { name: "FEATURE", nullable: true, length: 32 })
  feature!: string | null;

  @Column("character varying", {
    name: "DESCRIPTION",
    nullable: true,
    length: 256,
  })
  description!: string | null;

  @Column("numeric", {
    name: "TARGET",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  target!: string | null;

  @Column("character varying", { name: "FLAGS", nullable: true, length: 64 })
  flags!: string | null;

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
