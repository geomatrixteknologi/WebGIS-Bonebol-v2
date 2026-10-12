import { Column, Entity } from "typeorm";

@Entity("LOGMNRP_CTAS_PART_MAP", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrpCtasPartMap {
  @Column("numeric", { name: "LOGMNR_UID", precision: 1000, scale: 53 })
  logmnrUid!: string;

  @Column("numeric", { name: "BASEOBJ#", precision: 1000, scale: 53 })
  baseobj!: string;

  @Column("numeric", { name: "BASEOBJV#", precision: 1000, scale: 53 })
  baseobjv!: string;

  @Column("numeric", { name: "KEYOBJ#", precision: 1000, scale: 53 })
  keyobj!: string;

  @Column("numeric", { name: "PART#", precision: 1000, scale: 53 })
  part!: string;

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

  @Column("character varying", { name: "SPARE3", nullable: true, length: 1000 })
  spare3!: string | null;
}
