import { Column, Entity } from "typeorm";

@Entity("LOGSTDBY$SKIP_SUPPORT", { schema: "PBB_KUTAI-BARAT" })
export class LogstdbySkipSupport {
  @Column("numeric", { name: "ACTION", precision: 1000, scale: 53 })
  action!: string;

  @Column("character varying", { name: "NAME", length: 128 })
  name!: string;

  @Column("character varying", { name: "NAME2", nullable: true, length: 128 })
  name2!: string | null;

  @Column("character varying", { name: "NAME3", nullable: true, length: 128 })
  name3!: string | null;

  @Column("character varying", { name: "NAME4", nullable: true, length: 128 })
  name4!: string | null;

  @Column("character varying", { name: "NAME5", nullable: true, length: 128 })
  name5!: string | null;

  @Column("numeric", {
    name: "REG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  reg!: string | null;

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
