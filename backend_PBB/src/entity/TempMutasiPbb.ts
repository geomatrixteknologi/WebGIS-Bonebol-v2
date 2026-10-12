import { Column, Entity } from "typeorm";

@Entity("TEMP_MUTASI_PBB", { schema: "PBB_KUTAI-BARAT" })
export class TempMutasiPbb {
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

  @Column("character", { name: "NIK", length: 30 })
  nik!: string;

  @Column("character varying", { name: "NAMA", length: 100 })
  nama!: string;

  @Column("character varying", { name: "ALAMAT_OP", length: 100 })
  alamatOp!: string;

  @Column("character varying", { name: "ALAMAT_WP", length: 100 })
  alamatWp!: string;

  @Column("numeric", { name: "LUAS_BUMI", precision: 12, scale: 0 })
  luasBumi!: string;

  @Column("numeric", { name: "LUAS_BANGUNAN", precision: 12, scale: 0 })
  luasBangunan!: string;

  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT_BUNDEL", length: 3 })
  noUrutBundel!: string;

  @Column("character", { name: "NIK_OLD", nullable: true, length: 30 })
  nikOld!: string | null;

  @Column("character varying", {
    name: "NAMA_OLD",
    nullable: true,
    length: 100,
  })
  namaOld!: string | null;

  @Column("character varying", {
    name: "ALAMAT_OLD",
    nullable: true,
    length: 100,
  })
  alamatOld!: string | null;

  @Column("character varying", {
    name: "KECAMATAN_OLD",
    nullable: true,
    length: 100,
  })
  kecamatanOld!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_OLD",
    nullable: true,
    length: 100,
  })
  kelurahanOld!: string | null;

  @Column("character varying", {
    name: "TELP_OLD",
    nullable: true,
    length: 100,
  })
  telpOld!: string | null;

  @Column("character varying", {
    name: "EMAIL_OLD",
    nullable: true,
    length: 100,
  })
  emailOld!: string | null;

  @Column("character varying", {
    name: "KABUPATEN_OLD",
    nullable: true,
    length: 100,
  })
  kabupatenOld!: string | null;

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

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;

  @Column("character varying", { name: "TELP", nullable: true, length: 100 })
  telp!: string | null;

  @Column("character varying", { name: "EMAIL", nullable: true, length: 100 })
  email!: string | null;
}
