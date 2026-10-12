import { Column, Entity } from "typeorm";

@Entity("PST_PERMOHONAN", { schema: "PBB_KUTAI-BARAT" })
export class PstPermohonan {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 3,
  })
  kdTempatPelayanan!: string | null;

  @Column("character", { name: "THN_PELAYANAN", length: 4 })
  thnPelayanan!: string;

  @Column("character", { name: "BUNDEL_PELAYANAN", length: 4 })
  bundelPelayanan!: string;

  @Column("character", { name: "NO_URUT_PELAYANAN", length: 3 })
  noUrutPelayanan!: string;

  @Column("character", {
    name: "NO_SRT_PERMOHONAN",
    nullable: true,
    length: 30,
  })
  noSrtPermohonan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_SURAT_PERMOHONAN",
    nullable: true,
  })
  tglSuratPermohonan!: Date | null;

  @Column("character varying", {
    name: "NAMA_PEMOHON",
    nullable: true,
    length: 30,
  })
  namaPemohon!: string | null;

  @Column("character varying", {
    name: "ALAMAT_PEMOHON",
    nullable: true,
    length: 150,
  })
  alamatPemohon!: string | null;

  @Column("character varying", {
    name: "KETERANGAN_PST",
    nullable: true,
    length: 150,
  })
  keteranganPst!: string | null;

  @Column("character varying", {
    name: "CATATAN_PST",
    nullable: true,
    length: 75,
  })
  catatanPst!: string | null;

  @Column("character", { name: "STATUS_KOLEKTIF", nullable: true, length: 1 })
  statusKolektif!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERIMA_DOKUMEN_WP",
    nullable: true,
  })
  tglTerimaDokumenWp!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_PERKIRAAN_SELESAI",
    nullable: true,
  })
  tglPerkiraanSelesai!: Date | null;

  @Column("character", { name: "NIP_PENERIMA", nullable: true, length: 30 })
  nipPenerima!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumi!: string | null;

  @Column("numeric", {
    name: "LUAS_BANGUNAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBangunan!: string | null;
}
