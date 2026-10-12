import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PARAMETER$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrParameter {
  @Column("numeric", { name: "SESSION#", precision: 1000, scale: 53 })
  session!: string;

  @Column("character varying", { name: "NAME", length: 384 })
  name!: string;

  @Column("character varying", { name: "VALUE", nullable: true, length: 2000 })
  value!: string | null;

  @Column("numeric", {
    name: "TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  type!: string | null;

  @Column("numeric", {
    name: "SCN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  scn!: string | null;

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
