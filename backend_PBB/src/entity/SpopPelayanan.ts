import { Column, Entity } from "typeorm";

@Entity("SPOP_PELAYANAN", { schema: "PBB_KUTAI-BARAT" })
export class SpopPelayanan {
  @Column("character", { name: "TAHUN_FORMULIR", nullable: true, length: 4 })
  tahunFormulir!: string | null;

  @Column("character", {
    name: "NO_BUNDEL_FORMULIR",
    nullable: true,
    length: 4,
  })
  noBundelFormulir!: string | null;

  @Column("character", { name: "NO_URUT_FORMULIR", nullable: true, length: 3 })
  noUrutFormulir!: string | null;

  @Column("character", { name: "TAHUN_NOPEL", nullable: true, length: 4 })
  tahunNopel!: string | null;

  @Column("character", { name: "NO_BUNDEL_NOPEL", nullable: true, length: 4 })
  noBundelNopel!: string | null;

  @Column("character", { name: "NO_URUT_NOPEL", nullable: true, length: 3 })
  noUrutNopel!: string | null;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN_NOPEL",
    nullable: true,
    length: 2,
  })
  kdTempatPelayananNopel!: string | null;

  @Column("character", { name: "NOP_KD_PROP", nullable: true, length: 2 })
  nopKdProp!: string | null;

  @Column("character", { name: "NOP_KD_DATI2", nullable: true, length: 2 })
  nopKdDati2!: string | null;

  @Column("character", { name: "NOP_KD_KEC", nullable: true, length: 3 })
  nopKdKec!: string | null;

  @Column("character", { name: "NOP_KD_KEL", nullable: true, length: 3 })
  nopKdKel!: string | null;

  @Column("character", { name: "NOP_KD_BLOK", nullable: true, length: 3 })
  nopKdBlok!: string | null;

  @Column("character", { name: "NOP_NO_URUT", nullable: true, length: 4 })
  nopNoUrut!: string | null;

  @Column("character", { name: "NOP_KD_JNS_OP", nullable: true, length: 1 })
  nopKdJnsOp!: string | null;

  @Column("character", { name: "NOP_ASAL_KD_PROP", nullable: true, length: 2 })
  nopAsalKdProp!: string | null;

  @Column("character", { name: "NOP_ASAL_KD_DATI2", nullable: true, length: 2 })
  nopAsalKdDati2!: string | null;

  @Column("character", { name: "NOP_ASAL_KD_KEC", nullable: true, length: 3 })
  nopAsalKdKec!: string | null;

  @Column("character", { name: "NOP_ASAL_KD_KEL", nullable: true, length: 3 })
  nopAsalKdKel!: string | null;

  @Column("character", { name: "NOP_ASAL_KD_BLOK", nullable: true, length: 3 })
  nopAsalKdBlok!: string | null;

  @Column("character", { name: "NOP_ASAL_NO_URUT", nullable: true, length: 4 })
  nopAsalNoUrut!: string | null;

  @Column("character", {
    name: "NOP_ASAL_KD_JNS_OP",
    nullable: true,
    length: 1,
  })
  nopAsalKdJnsOp!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_PROP",
    nullable: true,
    length: 2,
  })
  nopBersamaKdProp!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_DATI2",
    nullable: true,
    length: 2,
  })
  nopBersamaKdDati2!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_KEC",
    nullable: true,
    length: 3,
  })
  nopBersamaKdKec!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_KEL",
    nullable: true,
    length: 3,
  })
  nopBersamaKdKel!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_BLOK",
    nullable: true,
    length: 3,
  })
  nopBersamaKdBlok!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_NO_URUT",
    nullable: true,
    length: 4,
  })
  nopBersamaNoUrut!: string | null;

  @Column("character", {
    name: "NOP_BERSAMA_KD_JNS_OP",
    nullable: true,
    length: 1,
  })
  nopBersamaKdJnsOp!: string | null;

  @Column("character varying", {
    name: "KTP_NOMER",
    nullable: true,
    length: 30,
  })
  ktpNomer!: string | null;

  @Column("character varying", { name: "KTP_NAMA", nullable: true, length: 30 })
  ktpNama!: string | null;

  @Column("character varying", {
    name: "KTP_JALAN",
    nullable: true,
    length: 30,
  })
  ktpJalan!: string | null;

  @Column("character varying", { name: "KTP_BLOK", nullable: true, length: 30 })
  ktpBlok!: string | null;

  @Column("character varying", { name: "KTP_RW", nullable: true, length: 30 })
  ktpRw!: string | null;

  @Column("character varying", { name: "KTP_RT", nullable: true, length: 30 })
  ktpRt!: string | null;

  @Column("character varying", {
    name: "KTP_KELURAHAN",
    nullable: true,
    length: 30,
  })
  ktpKelurahan!: string | null;

  @Column("character varying", {
    name: "KTP_DATI2",
    nullable: true,
    length: 30,
  })
  ktpDati2!: string | null;

  @Column("character varying", { name: "KTP_POS", nullable: true, length: 30 })
  ktpPos!: string | null;

  @Column("character varying", { name: "KTP_TELP", nullable: true, length: 30 })
  ktpTelp!: string | null;

  @Column("character varying", { name: "KTP_NPWP", nullable: true, length: 30 })
  ktpNpwp!: string | null;

  @Column("character varying", {
    name: "KTP_PEKERJAAN",
    nullable: true,
    length: 30,
  })
  ktpPekerjaan!: string | null;

  @Column("character", { name: "STATUS", nullable: true, length: 1 })
  status!: string | null;

  @Column("character varying", {
    name: "DLOP_NO_PERSIL",
    nullable: true,
    length: 30,
  })
  dlopNoPersil!: string | null;

  @Column("character varying", {
    name: "DLOP_JALAN",
    nullable: true,
    length: 30,
  })
  dlopJalan!: string | null;

  @Column("character varying", {
    name: "DLOP_BLOK",
    nullable: true,
    length: 30,
  })
  dlopBlok!: string | null;

  @Column("character varying", { name: "DLOP_RW", nullable: true, length: 30 })
  dlopRw!: string | null;

  @Column("character varying", { name: "DLOP_RT", nullable: true, length: 30 })
  dlopRt!: string | null;

  @Column("character", { name: "DLOP_CABANG", nullable: true, length: 1 })
  dlopCabang!: string | null;

  @Column("character varying", { name: "DB_TANAH", nullable: true, length: 30 })
  dbTanah!: string | null;

  @Column("character", { name: "DB_JNS_TANAH", nullable: true, length: 1 })
  dbJnsTanah!: string | null;

  @Column("character", { name: "DB_ZNT", nullable: true, length: 2 })
  dbZnt!: string | null;

  @Column("timestamp without time zone", {
    name: "IP_TGL_PENDATAAN",
    nullable: true,
  })
  ipTglPendataan!: Date | null;

  @Column("timestamp without time zone", {
    name: "IP_TGL_PENELITI",
    nullable: true,
  })
  ipTglPeneliti!: Date | null;

  @Column("character varying", {
    name: "IP_NIP_PENDATA",
    nullable: true,
    length: 30,
  })
  ipNipPendata!: string | null;

  @Column("character varying", {
    name: "IP_NIP_PENELITI",
    nullable: true,
    length: 30,
  })
  ipNipPeneliti!: string | null;

  @Column("character", { name: "STATUS_PROGRESS", nullable: true, length: 1 })
  statusProgress!: string | null;

  @Column("character varying", {
    name: "KETERANGAN",
    nullable: true,
    length: 90,
  })
  keterangan!: string | null;

  @Column("character", { name: "LAMPIRAN0", nullable: true, length: 1 })
  lampiran0!: string | null;

  @Column("character", { name: "LAMPIRAN1", nullable: true, length: 1 })
  lampiran1!: string | null;

  @Column("character", { name: "LAMPIRAN2", nullable: true, length: 1 })
  lampiran2!: string | null;

  @Column("character", { name: "LAMPIRAN3", nullable: true, length: 1 })
  lampiran3!: string | null;

  @Column("character", { name: "LAMPIRAN4", nullable: true, length: 1 })
  lampiran4!: string | null;

  @Column("character", { name: "LAMPIRAN5", nullable: true, length: 1 })
  lampiran5!: string | null;

  @Column("character", { name: "LAMPIRAN6", nullable: true, length: 1 })
  lampiran6!: string | null;

  @Column("character", { name: "LAMPIRAN7", nullable: true, length: 1 })
  lampiran7!: string | null;

  @Column("character", { name: "LAMPIRAN8", nullable: true, length: 1 })
  lampiran8!: string | null;

  @Column("character", { name: "LAMPIRAN9", nullable: true, length: 1 })
  lampiran9!: string | null;

  @Column("character", { name: "LAMPIRAN10", nullable: true, length: 1 })
  lampiran10!: string | null;

  @Column("character", { name: "LAMPIRAN11", nullable: true, length: 1 })
  lampiran11!: string | null;

  @Column("character", { name: "LAMPIRAN12", nullable: true, length: 1 })
  lampiran12!: string | null;

  @Column("character", { name: "LAMPIRAN13", nullable: true, length: 1 })
  lampiran13!: string | null;

  @Column("character", { name: "LAMPIRAN14", nullable: true, length: 1 })
  lampiran14!: string | null;

  @Column("character varying", { name: "CATATAN", nullable: true, length: 255 })
  catatan!: string | null;

  @Column("character", { name: "KELAPA_SAWIT", nullable: true, length: 1 })
  kelapaSawit!: string | null;

  @Column("character", { name: "JNS_PELAYANAN", nullable: true, length: 1 })
  jnsPelayanan!: string | null;

  @Column("character", { name: "STATUS_REJECT", nullable: true, length: 1 })
  statusReject!: string | null;
}
