import { Column, Entity } from "typeorm";

@Entity("LOGMNR_ERROR$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrError {
  @Column("numeric", {
    name: "SESSION#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  session!: string | null;

  @Column("timestamp without time zone", {
    name: "TIME_OF_ERROR",
    nullable: true,
  })
  timeOfError!: Date | null;

  @Column("numeric", {
    name: "CODE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  code!: string | null;

  @Column("character varying", {
    name: "MESSAGE",
    nullable: true,
    length: 4000,
  })
  message!: string | null;

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
}
