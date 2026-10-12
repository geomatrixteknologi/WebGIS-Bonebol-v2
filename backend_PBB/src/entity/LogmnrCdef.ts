import { Column, Entity } from "typeorm";

@Entity("LOGMNR_CDEF$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrCdef {
  @Column("numeric", {
    name: "CON#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  con!: string | null;

  @Column("numeric", {
    name: "COLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  cols!: string | null;

  @Column("numeric", {
    name: "TYPE#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("numeric", {
    name: "ROBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  robj!: string | null;

  @Column("numeric", {
    name: "RCON#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rcon!: string | null;

  @Column("numeric", {
    name: "ENABLED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  enabled!: string | null;

  @Column("numeric", {
    name: "DEFER",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  defer!: string | null;

  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", {
    name: "LOGMNR_UID",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrUid!: string | null;

  @Column("numeric", {
    name: "LOGMNR_FLAGS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrFlags!: string | null;
}
