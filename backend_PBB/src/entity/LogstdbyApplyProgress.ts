import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$APPLY_PROGRESS", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyApplyProgress {
  @Column("numeric", {
    name: "XIDUSN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidusn!: string | null;

  @Column("numeric", {
    name: "XIDSLT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidslt!: string | null;

  @Column("numeric", {
    name: "XIDSQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidsqn!: string | null;

  @Column("numeric", {
    name: "COMMIT_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  commitScn!: string | null;

  @Column("timestamp without time zone", {
    name: "COMMIT_TIME",
    nullable: true,
  })
  commitTime!: Date | null;

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
}
