import { Column, Entity } from "typeorm";

@Entity("DAFNOM_OP", { schema: "PBB_KUTAI-BARAT" })
export class DafnomOp {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character varying", { name: "JALAN_OP", nullable: true, length: 30 })
  jalanOp!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_OP",
    nullable: true,
    length: 15,
  })
  blokKavNoOp!: string | null;

  @Column("character", { name: "RW_OP", nullable: true, length: 3 })
  rwOp!: string | null;

  @Column("character", { name: "RT_OP", nullable: true, length: 3 })
  rtOp!: string | null;

  @Column("character", { name: "JNS_BUMI", nullable: true, length: 1 })
  jnsBumi!: string | null;

  @Column("character", { name: "KD_JPB", nullable: true, length: 2 })
  kdJpb!: string | null;

  @Column("character", { name: "KD_STATUS_WP", nullable: true, length: 1 })
  kdStatusWp!: string | null;

  @Column("character", { name: "KATEGORI_OP", nullable: true, length: 1 })
  kategoriOp!: string | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 255,
  })
  keterangan!: string | null;

  @Column("character varying", {
    name: "NO_FORMULIR",
    nullable: true,
    length: 30,
  })
  noFormulir!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMBENTUKAN",
    nullable: true,
  })
  tglPembentukan!: Date | null;

  @Column("character", { name: "NIP_PEMBENTUK", nullable: true, length: 30 })
  nipPembentuk!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMUTAKHIRAN",
    nullable: true,
  })
  tglPemutakhiran!: Date | null;

  @Column("character", { name: "NIP_PEMUTAKHIR", nullable: true, length: 30 })
  nipPemutakhir!: string | null;

  @Column("character", { name: "THN_PEMBENTUKAN", nullable: true, length: 4 })
  thnPembentukan!: string | null;
}
