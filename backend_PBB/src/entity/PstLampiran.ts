import { Column, Entity } from "typeorm";

@Entity("PST_LAMPIRAN", { schema: "PBB_KUTAI-BARAT" })
export class PstLampiran {
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

  @Column("numeric", {
    name: "L_PERMOHONAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lPermohonan!: string | null;

  @Column("numeric", {
    name: "L_SURAT_KUASA",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSuratKuasa!: string | null;

  @Column("numeric", {
    name: "L_KTP_WP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lKtpWp!: string | null;

  @Column("numeric", {
    name: "L_SERTIFIKAT_TANAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSertifikatTanah!: string | null;

  @Column("numeric", { name: "L_SPPT", nullable: true, precision: 1, scale: 0 })
  lSppt!: string | null;

  @Column("numeric", { name: "L_IMB", nullable: true, precision: 1, scale: 0 })
  lImb!: string | null;

  @Column("numeric", {
    name: "L_AKTE_JUAL_BELI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lAkteJualBeli!: string | null;

  @Column("numeric", {
    name: "L_SK_PENSIUN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSkPensiun!: string | null;

  @Column("numeric", {
    name: "L_SPPT_STTS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSpptStts!: string | null;

  @Column("numeric", { name: "L_STTS", nullable: true, precision: 1, scale: 0 })
  lStts!: string | null;

  @Column("numeric", {
    name: "L_SK_PENGURANGAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSkPengurangan!: string | null;

  @Column("numeric", {
    name: "L_SK_KEBERATAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSkKeberatan!: string | null;

  @Column("numeric", {
    name: "L_SKKP_PBB",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSkkpPbb!: string | null;

  @Column("numeric", {
    name: "L_SPMKP_PBB",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSpmkpPbb!: string | null;

  @Column("numeric", {
    name: "L_LAIN_LAIN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lLainLain!: string | null;

  @Column("numeric", {
    name: "L_SKET_TANAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSketTanah!: string | null;

  @Column("numeric", {
    name: "L_SKET_LURAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lSketLurah!: string | null;

  @Column("numeric", {
    name: "L_NPWPD",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lNpwpd!: string | null;

  @Column("numeric", {
    name: "L_PENGHASILAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lPenghasilan!: string | null;

  @Column("numeric", {
    name: "L_CAGAR",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lCagar!: string | null;

  @Column("numeric", {
    name: "L_DOK_SPOP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lDokSpop!: string | null;

  @Column("numeric", {
    name: "L_DOK_LSPOP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lDokLspop!: string | null;

  @Column("numeric", {
    name: "L_PENGANTAR_KEL",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  lPengantarKel!: string | null;

  @Column("character varying", {
    name: "NO_SURAT_PENGANTAR_MUTASI",
    nullable: true,
    length: 20,
  })
  noSuratPengantarMutasi!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
