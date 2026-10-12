import { Column, Entity } from "typeorm";

@Entity("LOGMNR_SUBCOLTYPE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrSubcoltype {
  @Column("numeric", { name: "INTCOL#", precision: 1000, scale: 53 })
  intcol!: string;

  @Column("bytea", { name: "TOID" })
  toid!: Buffer;

  @Column("numeric", { name: "VERSION#", precision: 1000, scale: 53 })
  version!: string;

  @Column("numeric", {
    name: "INTCOLS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intcols!: string | null;

  @Column("bytea", { name: "INTCOL#S", nullable: true })
  intcolS!: Buffer | null;

  @Column("numeric", {
    name: "FLAGS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flags!: string | null;

  @Column("numeric", {
    name: "SYNOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  synobj!: string | null;

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
