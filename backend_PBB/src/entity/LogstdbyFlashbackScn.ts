import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$FLASHBACK_SCN", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbyFlashbackScn {
  @Column("numeric", { name: "PRIMARY_SCN", precision: 1000, scale: 53 })
  primaryScn!: string;

  @Column("timestamp without time zone", {
    name: "PRIMARY_TIME",
    nullable: true,
  })
  primaryTime!: Date | null;

  @Column("numeric", {
    name: "STANDBY_SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  standbyScn!: string | null;

  @Column("timestamp without time zone", {
    name: "STANDBY_TIME",
    nullable: true,
  })
  standbyTime!: Date | null;

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

  @Column("timestamp without time zone", { name: "SPARE3", nullable: true })
  spare3!: Date | null;
}
