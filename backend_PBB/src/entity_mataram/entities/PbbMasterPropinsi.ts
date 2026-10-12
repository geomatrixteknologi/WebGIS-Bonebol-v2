import { Column, Entity, Index } from "typeorm";

@Index("pbb_master_propinsi_pkey", ["idProvinsi"], { unique: true })
@Entity("pbb_master_propinsi", { schema: "PBB_MATARAM" })
export class PbbMasterPropinsi {
  @Column("integer", { primary: true, name: "id_provinsi" })
  idProvinsi!: number;

  @Column("character varying", {
    name: "nama_provinsi",
    length: 200,
    default: () => "NULL::character varying",
  })
  namaProvinsi!: string;

  @Column("character varying", {
    name: "kode_provinsi",
    length: 50,
    default: () => "NULL::character varying",
  })
  kodeProvinsi!: string;
}
