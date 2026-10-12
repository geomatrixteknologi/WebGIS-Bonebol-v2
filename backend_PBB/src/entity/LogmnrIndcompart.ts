import { Column, Entity } from "typeorm";

@Entity("LOGMNR_INDCOMPART$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrIndcompart {
  @Column("numeric", {
    name: "OBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  obj!: string | null;

  @Column("numeric", {
    name: "DATAOBJ#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  dataobj!: string | null;

  @Column("numeric", {
    name: "BO#",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  bo!: string | null;

  @Column("numeric", { name: "PART#", precision: 1000, scale: 53 })
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
