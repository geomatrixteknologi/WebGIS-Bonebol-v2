import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$PLSQL", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyPlsql {
  @Column("numeric", {
    name: "SESSION_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sessionId!: string | null;

  @Column("numeric", {
    name: "START_FINISH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startFinish!: string | null;

  @Column("text", { name: "CALL_TEXT", nullable: true })
  callText!: string | null;

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
