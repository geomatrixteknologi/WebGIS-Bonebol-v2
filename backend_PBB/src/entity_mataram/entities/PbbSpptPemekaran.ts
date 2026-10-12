import { Column, Entity } from "typeorm";

@Entity("pbb_sppt_pemekaran", { schema: "PBB_MATARAM" })
export class PbbSpptPemekaran {
  @Column("character varying", {
    name: "uuid_op",
    primary: true,
    nullable: true,
    length: 36,
    default: () => "NULL::character varying",
  })
  uuidOp!: string | null;

  @Column("character varying", {
    name: "nop",
    nullable: true,
    length: 18,
    default: () => "NULL::character varying",
  })
  nop!: string | null;

  @Column("character varying", {
    name: "nop_asal",
    nullable: true,
    length: 18,
    default: () => "NULL::character varying",
  })
  nopAsal!: string | null;

  @Column("character varying", {
    name: "tahun_pajak",
    nullable: true,
    length: 4,
    default: () => "NULL::character varying",
  })
  tahunPajak!: string | null;

  @Column("character varying", {
    name: "created_by",
    nullable: true,
    length: 30,
    default: () => "NULL::character varying",
  })
  createdBy!: string | null;

  @Column("timestamp without time zone", {
    name: "created_time",
    nullable: true,
    default: () => "NULL::timestamp without time zone",
  })
  createdTime!: Date | null;
}
