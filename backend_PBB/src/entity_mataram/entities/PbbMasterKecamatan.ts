import { Column, Entity, Index } from "typeorm";

@Index("pbb_master_kecamatan_copy1_pkey", ["id_kecamatan"], { unique: true })
@Entity("pbb_master_kecamatan", { schema: "PBB_MATARAM" })
export class PbbMasterKecamatan {
  @Column("integer", { primary: true, name: "id_kecamatan" })
  id_kecamatan!: number;

  @Column("integer", { name: "id_kota" })
  id_kota!: number;

  @Column("character varying", {
    name: "nama_kecamatan",
    length: 200,
    default: () => "NULL::character varying",
  })
  nama_kecamatan!: string;

  @Column("character varying", {
    name: "kode_kecamatan",
    length: 50,
    default: () => "NULL::character varying",
  })
  kode_kecamatan!: string;
}
