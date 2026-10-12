import { Column, Entity } from "typeorm";

@Entity("LOGMNR_ENC$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrEnc {
  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "OWNER#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  owner!: string | null;

  @Column("numeric", {
    name: "ENCALG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  encalg!: string | null;

  @Column("numeric", {
    name: "INTALG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  intalg!: string | null;

  @Column("bytea", { name: "COLKLC", nullable: true })
  colklc!: Buffer | null;

  @Column("numeric", {
    name: "KLCLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  klclen!: string | null;

  @Column("numeric", {
    name: "FLAG",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  flag!: string | null;

  @Column("character varying", { name: "MKEYID", length: 192 })
  mkeyid!: string;

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
