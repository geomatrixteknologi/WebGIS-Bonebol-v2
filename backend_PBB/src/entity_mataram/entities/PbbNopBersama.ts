import { Column, Entity, Index } from "typeorm";

@Index("pbb_objek_pajak_induk_pkey", ["idNop"], { unique: true })
@Entity("pbb_nop_bersama", { schema: "PBB_MATARAM" })
export class PbbNopBersama {
  @Column("character", { primary: true, name: "id_nop", length: 18 })
  idNop!: string;

  @Column("character", { name: "keterangan", nullable: true, length: 30 })
  keterangan!: string | null;

  @Column("character", { name: "user_pbb", length: 30 })
  userPbb!: string;

  @Column("date", { name: "user_timestamp", nullable: true })
  userTimestamp!: string | null;
}
