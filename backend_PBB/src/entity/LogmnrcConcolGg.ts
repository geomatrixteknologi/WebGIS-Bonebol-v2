import { Column, Entity } from "typeorm";

@Entity("LOGMNRC_CONCOL_GG", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrcConcolGg {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "CON#", precision: 1000, scale: 53 })
  con!: string;

  @Column("numeric", { name: "COMMIT_SCN", precision: 1000, scale: 53 })
  commitScn!: string;

  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

  @Column("numeric", {
    name: "POS#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pos!: string | null;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 4000 })
  spare3!: string | null;
}
