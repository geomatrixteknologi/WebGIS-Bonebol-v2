import { Column, Entity } from "typeorm";

@Entity("LOGMNR_DICTSTATE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrDictstate {
  @Column("numeric", {
    name: "LOGMNR_UID",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrUid!: string | null;

  @Column("numeric", {
    name: "START_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnbas!: string | null;

  @Column("numeric", {
    name: "START_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  startScnwrp!: string | null;

  @Column("numeric", {
    name: "END_SCNBAS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endScnbas!: string | null;

  @Column("numeric", {
    name: "END_SCNWRP",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  endScnwrp!: string | null;

  @Column("numeric", {
    name: "REDO_THREAD",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  redoThread!: string | null;

  @Column("numeric", {
    name: "RBASQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbasqn!: string | null;

  @Column("numeric", {
    name: "RBABLK",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbablk!: string | null;

  @Column("numeric", {
    name: "RBABYTE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  rbabyte!: string | null;

  @Column("numeric", {
    name: "LOGMNR_FLAGS",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  logmnrFlags!: string | null;
}
