import { Column, Entity } from "typeorm";

@Entity("LOGMNR_PROPS$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrProps {
  @Column("character varying", { name: "VALUE$", nullable: true, length: 4000 })
  value!: string | null;

  @Column("character varying", {
    name: "COMMENT$",
    nullable: true,
    length: 4000,
  })
  comment!: string | null;

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
