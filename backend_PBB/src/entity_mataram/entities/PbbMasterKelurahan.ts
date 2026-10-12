import { Column, Entity, Index } from "typeorm";

@Index("pbb_master_kelurahan_pkey1", ["id_kelurahan"], { unique: true })
@Entity("pbb_master_kelurahan", { schema: "PBB_MATARAM" })
export class PbbMasterKelurahan {
  @Column("integer", { primary: true, name: "id_kelurahan" })
  id_kelurahan!: number;

  @Column("integer", { name: "id_kecamatan" })
  id_kecamatan!: number;

  @Column("character varying", {
    name: "nama_kelurahan",
    length: 200,
    default: () => "NULL::character varying",
  })
  nama_kelurahan!: string;

  @Column("character varying", {
    name: "kode_kelurahan",
    length: 50,
    default: () => "NULL::character varying",
  })
  kode_kelurahan!: string;
}
