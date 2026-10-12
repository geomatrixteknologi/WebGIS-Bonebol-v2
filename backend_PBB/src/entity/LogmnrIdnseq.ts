import { Column, Entity } from "typeorm";

@Entity("LOGMNR_IDNSEQ$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrIdnseq {
  @Column("numeric", { name: "OBJ#", precision: 1000, scale: 53 })
  obj!: string;

  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

  @Column("numeric", { name: "SEQOBJ#", precision: 1000, scale: 53 })
  seqobj!: string;

  @Column("numeric", { name: "STARTWITH", precision: 1000, scale: 53 })
  startwith!: string;

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
