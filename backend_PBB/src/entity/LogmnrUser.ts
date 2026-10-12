import { Column, Entity } from "typeorm";

@Entity("LOGMNR_USER$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrUser {
  @Column("numeric", { name: "USER#", nullable: true, precision: 22, scale: 0 })
  user!: string | null;

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
