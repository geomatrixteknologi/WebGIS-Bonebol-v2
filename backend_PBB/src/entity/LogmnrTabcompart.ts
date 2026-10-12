import { Column, Entity } from "typeorm";

@Entity("LOGMNR_TABCOMPART$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrTabcompart {
  @Column("numeric", { name: "OBJ#", nullable: true, precision: 22, scale: 0 })
  obj!: string | null;

  @Column("numeric", { name: "BO#", nullable: true, precision: 22, scale: 0 })
  bo!: string | null;

  @Column("numeric", { name: "PART#", precision: 22, scale: 0 })
  part!: string;

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
