import { Column, Entity } from "typeorm";

@Entity("TEMP_PENGURANGAN", { schema: "PBB_KUTAI-BARAT" })
export class TempPengurangan {
  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character", { name: "THN_PEMOHON", length: 4 })
  thnPemohon!: string;

  @Column("character varying", { name: "NM_WP", nullable: true, length: 200 })
  nmWp!: string | null;

  @Column("character varying", { name: "ALAMAT", nullable: true, length: 400 })
  alamat!: string | null;

  @Column("character", { name: "JNS_PELAYANAN", length: 2 })
  jnsPelayanan!: string;

  @Column("character", { name: "JNS_PENGURANGAN", length: 1 })
  jnsPengurangan!: string;

  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT_BUNDEL", length: 3 })
  noUrutBundel!: string;

  @Column("character", { name: "PRESENTASE", length: 3 })
  presentase!: string;

  @Column("timestamp without time zone", { name: "TANGGAL" })
  tanggal!: Date;

  @Column("character", { name: "STATUS", length: 1 })
  status!: string;

  @Column("character", { name: "TOKEN", length: 6 })
  token!: string;

  @Column("character varying", { name: "EMAIL", nullable: true, length: 100 })
  email!: string | null;
}
