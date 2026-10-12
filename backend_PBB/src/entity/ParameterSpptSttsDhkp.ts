import { Column, Entity } from "typeorm";

@Entity("PARAMETER_SPPT_STTS_DHKP", { schema: "PBB_KUTAI-BARAT" })
export class ParameterSpptSttsDhkp {
  @Column("numeric", {
    name: "SPPT_TERPISAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  spptTerpisah!: string | null;

  @Column("numeric", {
    name: "STTS_TERPISAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  sttsTerpisah!: string | null;

  @Column("numeric", {
    name: "DHKP_TERPISAH",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  dhkpTerpisah!: string | null;

  @Column("character varying", {
    name: "KELOMPOK_BUKU",
    nullable: true,
    length: 2,
  })
  kelompokBuku!: string | null;

  @Column("numeric", {
    name: "TAHUN_PAJAK_SPPT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  tahunPajakSppt!: string | null;

  @Column("numeric", {
    name: "TAHUN_PAJAK_STTS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  tahunPajakStts!: string | null;

  @Column("numeric", {
    name: "NAMA_KANWIL",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  namaKanwil!: string | null;

  @Column("numeric", {
    name: "NAMA_KANTOR",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  namaKantor!: string | null;

  @Column("numeric", {
    name: "KOTA_TERBIT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  kotaTerbit!: string | null;

  @Column("numeric", {
    name: "NAMA_KEPALA_KANTOR",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  namaKepalaKantor!: string | null;

  @Column("numeric", {
    name: "BARCODE_SPPT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  barcodeSppt!: string | null;

  @Column("character", { name: "JNS_BARCODE_SPPT", nullable: true, length: 1 })
  jnsBarcodeSppt!: string | null;

  @Column("numeric", {
    name: "BARCODE_STTS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  barcodeStts!: string | null;

  @Column("character", { name: "JNS_BARCODE_STTS", nullable: true, length: 1 })
  jnsBarcodeStts!: string | null;

  @Column("numeric", {
    name: "SPPT_FORM_BARU",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  spptFormBaru!: string | null;

  @Column("numeric", {
    name: "STTS_FORM_BARU",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  sttsFormBaru!: string | null;

  @Column("numeric", {
    name: "SPPT_FORM_LAMA",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  spptFormLama!: string | null;

  @Column("numeric", {
    name: "STTS_FORM_LAMA",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  sttsFormLama!: string | null;

  @Column("numeric", {
    name: "SURAT_HIMBAUAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  suratHimbauan!: string | null;

  @Column("character varying", {
    name: "BUKU_HIMBAUAN",
    nullable: true,
    length: 2,
  })
  bukuHimbauan!: string | null;

  @Column("numeric", {
    name: "TUNGGAKAN_THN_LALU",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  tunggakanThnLalu!: string | null;

  @Column("numeric", {
    name: "SPPT_PBB_NOL",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  spptPbbNol!: string | null;

  @Column("numeric", {
    name: "TEKS_KANWIL",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  teksKanwil!: string | null;

  @Column("numeric", {
    name: "TEKS_KANTOR",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  teksKantor!: string | null;

  @Column("numeric", {
    name: "TEKS_SPPT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  teksSppt!: string | null;

  @Column("numeric", {
    name: "TEKS_STTS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  teksStts!: string | null;

  @Column("character varying", { name: "KAKAP", nullable: true, length: 4 })
  kakap!: string | null;

  @Column("numeric", {
    name: "TEKS_PRATAMA",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  teksPratama!: string | null;

  @Column("numeric", {
    name: "PBB_MINIMAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  pbbMinimal!: string | null;

  @Column("numeric", {
    name: "TEKS_KPPBB",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  teksKppbb!: string | null;

  @Column("numeric", {
    name: "NAMA_KEPALA_KPPBB",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  namaKepalaKppbb!: string | null;

  @Column("numeric", {
    name: "NAMA_KPPBB",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  namaKppbb!: string | null;
}
