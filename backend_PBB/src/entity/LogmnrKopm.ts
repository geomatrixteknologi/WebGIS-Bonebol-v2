import { Column, Entity } from "typeorm";

@Entity("LOGMNR_KOPM$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrKopm {
  @Column("numeric", {
    name: "LENGTH",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  length!: string | null;

  @Column("bytea", { name: "METADATA", nullable: true })
  metadata!: Buffer | null;

  @Column("character varying", { name: "NAME", length: 384 })
  name!: string;

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
