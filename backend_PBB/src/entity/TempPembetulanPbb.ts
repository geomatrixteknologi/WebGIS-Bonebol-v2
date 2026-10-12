import { Column, Entity } from "typeorm";

@Entity("TEMP_PEMBETULAN_PBB", { schema: "PBB_KUTAI-BARAT" })
export class TempPembetulanPbb {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

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

  @Column("character varying", {
    name: "ALAMAT_OP_OLD",
    nullable: true,
    length: 100,
  })
  alamatOpOld!: string | null;

  @Column("character varying", {
    name: "ALAMAT_WP_OLD",
    nullable: true,
    length: 100,
  })
  alamatWpOld!: string | null;

  @Column("character varying", {
    name: "NAMA_OLD",
    nullable: true,
    length: 100,
  })
  namaOld!: string | null;

  @Column("character varying", { name: "ALAMAT_OP", length: 100 })
  alamatOp!: string;

  @Column("character varying", { name: "ALAMAT_WP", length: 100 })
  alamatWp!: string;

  @Column("character varying", { name: "NAMA", length: 100 })
  nama!: string;

  @Column("numeric", { name: "LUAS_BUMI", precision: 1000, scale: 53 })
  luasBumi!: string;

  @Column("numeric", { name: "LUAS_BANGUNAN", precision: 1000, scale: 53 })
  luasBangunan!: string;

  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT_BUNDEL", length: 3 })
  noUrutBundel!: string;

  @Column("character", { name: "STATUS", nullable: true, length: 1 })
  status!: string | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 4000,
  })
  keterangan!: string | null;

  @Column("timestamp without time zone", { name: "TANGGAL", nullable: true })
  tanggal!: Date | null;

  @Column("character", { name: "TOKEN", nullable: true, length: 6 })
  token!: string | null;

  @Column("character varying", { name: "EMAIL", nullable: true, length: 100 })
  email!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_OLD",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  luasBumiOld!: string | null;

  @Column("numeric", {
    name: "LUAS_BANGUNAN_OLD",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  luasBangunanOld!: string | null;

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;

  @Column("character", { name: "TELP", nullable: true, length: 25 })
  telp!: string | null;
}
