import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PROCESSED_LOG$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrProcessedLog {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("numeric", { name: "THREAD#", precision: 1000, scale: 53 })
  thread!: string;

  @Column("numeric", {
    name: "SEQUENCE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sequence!: string | null;

  @Column("numeric", {
    name: "FIRST_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  firstChange!: string | null;

  @Column("numeric", {
    name: "NEXT_CHANGE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nextChange!: string | null;

  @Column("timestamp without time zone", { name: "FIRST_TIME", nullable: true })
  firstTime!: Date | null;

  @Column("timestamp without time zone", { name: "NEXT_TIME", nullable: true })
  nextTime!: Date | null;

  @Column("character varying", {
    name: "FILE_NAME",
    nullable: true,
    length: 513,
  })
  fileName!: string | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("character varying", { name: "INFO", nullable: true, length: 32 })
  info!: string | null;

  @Column("timestamp without time zone", { name: "TIMESTAMP", nullable: true })
  timestamp!: Date | null;
}
