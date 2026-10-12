import { Column, Entity } from "typeorm";

@Entity("LOGMNR_GT_XID_INCLUDE$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrGtXidInclude {
  @Column("numeric", {
    name: "XIDUSN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidusn!: string | null;

  @Column("numeric", {
    name: "XIDSLT",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidslt!: string | null;

  @Column("numeric", {
    name: "XIDSQN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  xidsqn!: string | null;

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

  @Column("numeric", {
    name: "PDBID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pdbid!: string | null;

  @Column("character varying", {
    name: "PDB_NAME",
    nullable: true,
    length: 390,
  })
  pdbName!: string | null;
}
