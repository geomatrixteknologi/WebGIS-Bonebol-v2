import { Column, Entity, Index } from "typeorm";

@Index("pbb_master_kota_pkey", ["idKota"], { unique: true })
@Entity("pbb_master_kota", { schema: "PBB_MATARAM" })
export class PbbMasterKota {
  @Column("integer", { primary: true, name: "id_kota" })
  idKota!: number;

  @Column("integer", { name: "id_provinsi" })
  idProvinsi!: number;

  @Column("character varying", {
    name: "nama_kota",
    length: 200,
    default: () => "NULL::character varying",
  })
  namaKota!: string;

  @Column("character varying", {
    name: "kode_kota",
    length: 50,
    default: () => "NULL::character varying",
  })
  kodeKota!: string;
}
