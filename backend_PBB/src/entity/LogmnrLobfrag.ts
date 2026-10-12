import { Column, Entity } from "typeorm";

@Entity("LOGMNR_LOBFRAG$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrLobfrag {
  @Column("numeric", {
    name: "FRAGOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  fragobj!: string | null;

  @Column("numeric", {
    name: "PARENTOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  parentobj!: string | null;

  @Column("numeric", {
    name: "TABFRAGOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  tabfragobj!: string | null;

  @Column("numeric", {
    name: "INDFRAGOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  indfragobj!: string | null;

  @Column("numeric", { name: "FRAG#", precision: 1000, scale: 53 })
  frag!: string;

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
