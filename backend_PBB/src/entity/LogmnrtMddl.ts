import { Column, Entity } from "typeorm";

@Entity("LOGMNRT_MDDL$", { schema: "PBB_KUTAI-BARAT" })
export class LogmnrtMddl {
  @Column("numeric", { name: "SOURCE_OBJ#", precision: 1000, scale: 53 })
  sourceObj!: string;

  @Column("character varying", { name: "SOURCE_ROWID", length: 10 })
  sourceRowid!: string;

  @Column("character varying", { name: "DEST_ROWID", length: 10 })
  destRowid!: string;
}
