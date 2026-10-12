import { Column, Entity } from "typeorm";

@Entity("TEMP_DAT_SUBJEK_PAJAK", { schema: "PBB_KUTAI-BARAT" })
export class TempDatSubjekPajak {
  @Column("numeric", { name: "NIK", precision: 1000, scale: 53 })
  nik!: string;

  @Column("character varying", { name: "NAMA", length: 200 })
  nama!: string;

  @Column("character varying", { name: "KECAMATAN", length: 100 })
  kecamatan!: string;

  @Column("character varying", {
    name: "KABUPATEN",
    nullable: true,
    length: 100,
  })
  kabupaten!: string | null;

  @Column("character varying", { name: "KELURAHAN", length: 100 })
  kelurahan!: string;

  @Column("character varying", { name: "TELP", length: 100 })
  telp!: string;

  @Column("character varying", { name: "EMAIL", length: 100 })
  email!: string;

  @Column("character varying", { name: "ALAMAT", length: 255 })
  alamat!: string;

  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT", length: 3 })
  noUrut!: string;

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

  @Column("character", { name: "KECAMATAN_OP", nullable: true, length: 3 })
  kecamatanOp!: string | null;

  @Column("character", { name: "KELURAHAN_OP", nullable: true, length: 3 })
  kelurahanOp!: string | null;

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;

  @Column("character varying", {
    name: "LATITUDE_LETAK_OP",
    nullable: true,
    length: 50,
  })
  latitudeLetakOp!: string | null;

  @Column("character varying", {
    name: "LONGITUDE_LETAK_OP",
    nullable: true,
    length: 50,
  })
  longitudeLetakOp!: string | null;

  @Column("character", { name: "STATUS_REJECT", nullable: true, length: 1 })
  statusReject!: string | null;
}
