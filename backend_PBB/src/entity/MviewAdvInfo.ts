import { Column, Entity } from "typeorm";

@Entity("MVIEW$_ADV_INFO", { schema: "PBB_KUTAI-BARAT" })
export class MviewAdvInfo {
  @Column("numeric", { name: "RUNID#", precision: 1000, scale: 53 })
  runid!: string;

  @Column("numeric", { name: "SEQ#", precision: 1000, scale: 53 })
  seq!: string;

  @Column("numeric", { name: "TYPE", precision: 1000, scale: 53 })
  type!: string;

  @Column("numeric", { name: "INFOLEN", precision: 1000, scale: 53 })
  infolen!: string;

  @Column("bytea", { name: "INFO", nullable: true })
  info!: Buffer | null;

  @Column("numeric", {
    name: "STATUS",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  status!: string | null;

  @Column("numeric", {
    name: "FLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flag!: string | null;
}
