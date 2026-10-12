import { Column, Entity } from "typeorm";

@Entity("TEMP_SK_NJOP", { schema: "PBB_KUTAI-BARAT" })
export class TempSkNjop {
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

  @Column("character", { name: "THN_BUNDEL", nullable: true, length: 4 })
  thnBundel!: string | null;

  @Column("character", { name: "NO_BUNDEL", nullable: true, length: 4 })
  noBundel!: string | null;

  @Column("character", { name: "NO_URUT_BUNDEL", nullable: true, length: 3 })
  noUrutBundel!: string | null;

  @Column("character", { name: "STATUS", length: 1 })
  status!: string;

  @Column("character", { name: "NIK", nullable: true, length: 18 })
  nik!: string | null;

  @Column("timestamp without time zone", { name: "TANGGAL", nullable: true })
  tanggal!: Date | null;

  @Column("character", { name: "TOKEN", length: 6 })
  token!: string;

  @Column("character varying", { name: "EMAIL", nullable: true, length: 255 })
  email!: string | null;

  @Column("character varying", { name: "TELP", nullable: true, length: 25 })
  telp!: string | null;

  @Column("character varying", { name: "ALASAN", nullable: true, length: 255 })
  alasan!: string | null;

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 255,
  })
  keterangan!: string | null;
}
