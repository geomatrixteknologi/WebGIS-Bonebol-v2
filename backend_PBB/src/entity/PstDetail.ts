import { Column, Entity } from "typeorm";

@Entity("PST_DETAIL", { schema: "PBB_KUTAI-BARAT" })
export class PstDetail {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 2,
  })
  kdTempatPelayanan!: string | null;

  @Column("character", { name: "THN_PELAYANAN", length: 4 })
  thnPelayanan!: string;

  @Column("character", { name: "BUNDEL_PELAYANAN", length: 4 })
  bundelPelayanan!: string;

  @Column("character", { name: "NO_URUT_PELAYANAN", length: 3 })
  noUrutPelayanan!: string;

  @Column("character", {
    name: "KD_PROPINSI_PEMOHON",
    nullable: true,
    length: 2,
  })
  kdPropinsiPemohon!: string | null;

  @Column("character", { name: "KD_DATI2_PEMOHON", nullable: true, length: 2 })
  kdDati2Pemohon!: string | null;

  @Column("character", {
    name: "KD_KECAMATAN_PEMOHON",
    nullable: true,
    length: 3,
  })
  kdKecamatanPemohon!: string | null;

  @Column("character", {
    name: "KD_KELURAHAN_PEMOHON",
    nullable: true,
    length: 3,
  })
  kdKelurahanPemohon!: string | null;

  @Column("character", { name: "KD_BLOK_PEMOHON", nullable: true, length: 3 })
  kdBlokPemohon!: string | null;

  @Column("character", { name: "NO_URUT_PEMOHON", nullable: true, length: 4 })
  noUrutPemohon!: string | null;

  @Column("character", { name: "KD_JNS_OP_PEMOHON", nullable: true, length: 1 })
  kdJnsOpPemohon!: string | null;

  @Column("character", { name: "KD_JNS_PELAYANAN", nullable: true, length: 2 })
  kdJnsPelayanan!: string | null;

  @Column("character", {
    name: "THN_PAJAK_PERMOHONAN",
    nullable: true,
    length: 4,
  })
  thnPajakPermohonan!: string | null;

  @Column("character varying", {
    name: "NAMA_PENERIMA",
    nullable: true,
    length: 30,
  })
  namaPenerima!: string | null;

  @Column("character varying", {
    name: "CATATAN_PENYERAHAN",
    nullable: true,
    length: 75,
  })
  catatanPenyerahan!: string | null;

  @Column("numeric", {
    name: "STATUS_SELESAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusSelesai!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_SELESAI",
    nullable: true,
  })
  tglSelesai!: Date | null;

  @Column("character", { name: "KD_SEKSI_BERKAS", nullable: true, length: 2 })
  kdSeksiBerkas!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENYERAHAN",
    nullable: true,
  })
  tglPenyerahan!: Date | null;

  @Column("character", { name: "NIP_PENYERAH", nullable: true, length: 30 })
  nipPenyerah!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
