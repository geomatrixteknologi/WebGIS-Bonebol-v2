import { Column, Entity, Index } from "typeorm";

@Index("pbb_sppt_pkey", ["nop", "spptTahunPajak"], { unique: true })
@Entity("pbb_sppt", { schema: "PBB_MATARAM" })
export class PbbSppt {
  @Column("character varying", { primary: true, name: "nop", length: 18 })
  nop!: string;

  @Column("character varying", { name: "wp_nama", nullable: true, length: 255 })
  wpNama!: string | null;

  @Column("character varying", {
    name: "wp_alamat",
    nullable: true,
    length: 1024,
  })
  wpAlamat!: string | null;

  @Column("character varying", { name: "wp_rt", nullable: true, length: 10 })
  wpRt!: string | null;

  @Column("character varying", { name: "wp_rw", nullable: true, length: 10 })
  wpRw!: string | null;

  @Column("character varying", {
    name: "wp_kelurahan",
    nullable: true,
    length: 255,
  })
  wpKelurahan!: string | null;

  @Column("character varying", {
    name: "wp_kecamatan",
    nullable: true,
    length: 255,
  })
  wpKecamatan!: string | null;

  @Column("character varying", {
    name: "wp_kotakab",
    nullable: true,
    length: 255,
  })
  wpKotakab!: string | null;

  @Column("character varying", {
    name: "wp_propinsi",
    nullable: true,
    length: 255,
  })
  wpPropinsi!: string | null;

  @Column("character varying", {
    name: "wp_kodepos",
    nullable: true,
    length: 5,
  })
  wpKodepos!: string | null;

  @Column("character varying", {
    name: "wp_telepon",
    nullable: true,
    length: 255,
  })
  wpTelepon!: string | null;

  @Column("character varying", {
    name: "wp_handphone",
    nullable: true,
    length: 255,
  })
  wpHandphone!: string | null;

  @Column("character varying", {
    name: "wp_email",
    nullable: true,
    length: 255,
  })
  wpEmail!: string | null;

  @Column("character varying", { name: "wp_fax", nullable: true, length: 255 })
  wpFax!: string | null;

  @Column("character varying", {
    name: "wp_npwpd",
    nullable: true,
    length: 255,
  })
  wpNpwpd!: string | null;

  @Column("character varying", {
    name: "op_alamat",
    nullable: true,
    length: 1024,
  })
  opAlamat!: string | null;

  @Column("character varying", { name: "op_rt", nullable: true, length: 10 })
  opRt!: string | null;

  @Column("character varying", { name: "op_rw", nullable: true, length: 10 })
  opRw!: string | null;

  @Column("character varying", {
    name: "op_kelurahan",
    nullable: true,
    length: 255,
  })
  opKelurahan!: string | null;

  @Column("character varying", {
    name: "op_kecamatan",
    nullable: true,
    length: 255,
  })
  opKecamatan!: string | null;

  @Column("character varying", {
    name: "op_kotakab",
    nullable: true,
    length: 255,
  })
  opKotakab!: string | null;

  @Column("character varying", {
    name: "op_propinsi",
    nullable: true,
    length: 255,
  })
  opPropinsi!: string | null;

  @Column("character varying", {
    name: "op_kodepos",
    nullable: true,
    length: 5,
  })
  opKodepos!: string | null;

  @Column("double precision", {
    name: "op_luas_bumi",
    nullable: true,
    precision: 53,
  })
  opLuasBumi!: number | null;

  @Column("double precision", {
    name: "op_luas_bangunan",
    nullable: true,
    precision: 53,
  })
  opLuasBangunan!: number | null;

  @Column("character varying", {
    name: "op_kelas_bumi",
    nullable: true,
    length: 5,
  })
  opKelasBumi!: string | null;

  @Column("character varying", {
    name: "op_kelas_bangunan",
    nullable: true,
    length: 5,
  })
  opKelasBangunan!: string | null;

  @Column("double precision", {
    name: "op_njop_bumi",
    nullable: true,
    precision: 53,
  })
  opNjopBumi!: number | null;

  @Column("double precision", {
    name: "op_njop_bangunan",
    nullable: true,
    precision: 53,
  })
  opNjopBangunan!: number | null;

  @Column("double precision", {
    name: "op_njop",
    nullable: true,
    precision: 53,
  })
  opNjop!: number | null;

  @Column("double precision", {
    name: "op_njoptkp",
    nullable: true,
    precision: 53,
  })
  opNjoptkp!: number | null;

  @Column("double precision", {
    name: "op_njkp",
    nullable: true,
    precision: 53,
  })
  opNjkp!: number | null;

  @Column("character varying", { primary: true, name: "sppt_tahun_pajak", length: 4 })
  spptTahunPajak!: string;

  @Column("date", { name: "sppt_tanggal_terbit", nullable: true })
  spptTanggalTerbit!: string | null;

  @Column("date", { name: "sppt_tanggal_cetak", nullable: true })
  spptTanggalCetak!: string | null;

  @Column("date", { name: "sppt_tanggal_jatuh_tempo", nullable: true })
  spptTanggalJatuhTempo!: string | null;

  @Column("double precision", {
    name: "sppt_pbb_terhutang",
    nullable: true,
    precision: 53,
  })
  spptPbbTerhutang!: number | null;

  @Column("double precision", {
    name: "sppt_pbb_pengurang",
    nullable: true,
    precision: 53,
  })
  spptPbbPengurang!: number | null;

  @Column("double precision", {
    name: "sppt_pbb_harus_dibayar",
    nullable: true,
    precision: 53,
  })
  spptPbbHarusDibayar!: number | null;

  @Column("character varying", {
    name: "sppt_tandatangan_nama",
    nullable: true,
    length: 255,
  })
  spptTandatanganNama!: string | null;

  @Column("character varying", {
    name: "sppt_tandatangan_nip",
    nullable: true,
    length: 255,
  })
  spptTandatanganNip!: string | null;

  @Column("character varying", {
    name: "sppt_cetak_footprint",
    nullable: true,
    length: 1024,
  })
  spptCetakFootprint!: string | null;

  @Column("integer", { name: "payment_flag", nullable: true })
  paymentFlag!: number | null;

  @Column("character varying", {
    name: "payment_paid",
    nullable: true,
    length: 255,
  })
  paymentPaid!: string | null;

  @Column("character varying", {
    name: "payment_ref_number",
    nullable: true,
    length: 36,
  })
  paymentRefNumber!: string | null;

  @Column("character varying", {
    name: "payment_bank_code",
    nullable: true,
    length: 7,
  })
  paymentBankCode!: string | null;

  @Column("character varying", {
    name: "payment_sw_refnum",
    nullable: true,
    length: 36,
  })
  paymentSwRefnum!: string | null;

  @Column("character varying", {
    name: "payment_gw_refnum",
    nullable: true,
    length: 36,
  })
  paymentGwRefnum!: string | null;

  @Column("character varying", {
    name: "payment_sw_id",
    nullable: true,
    length: 36,
  })
  paymentSwId!: string | null;

  @Column("character varying", {
    name: "payment_merchant_code",
    nullable: true,
    length: 36,
  })
  paymentMerchantCode!: string | null;

  @Column("numeric", {
    name: "pbb_collectible",
    nullable: true,
    precision: 17,
    scale: 0,
  })
  pbbCollectible!: string | null;

  @Column("numeric", {
    name: "pbb_denda",
    nullable: true,
    precision: 17,
    scale: 0,
  })
  pbbDenda!: string | null;

  @Column("numeric", {
    name: "pbb_admin_gw",
    nullable: true,
    precision: 17,
    scale: 0,
  })
  pbbAdminGw!: string | null;

  @Column("numeric", {
    name: "pbb_misc_fee",
    nullable: true,
    precision: 17,
    scale: 0,
  })
  pbbMiscFee!: string | null;

  @Column("numeric", {
    name: "pbb_total_bayar",
    nullable: true,
    precision: 17,
    scale: 0,
  })
  pbbTotalBayar!: string | null;

  @Column("character varying", {
    name: "dinas_or_kpp",
    nullable: true,
    length: 10,
  })
  dinasOrKpp!: string | null;

  @Column("numeric", {
    name: "op_tarif",
    nullable: true,
    precision: 3,
    scale: 3,
  })
  opTarif!: string | null;

  @Column("integer", { name: "status", nullable: true, default: () => "1" })
  status!: number | null;

  @Column("character varying", {
    name: "verification_code",
    nullable: true,
    length: 128,
  })
  verificationCode!: string | null;

  @Column("character varying", {
    name: "history_ubah_tgl_bayar",
    nullable: true,
  })
  historyUbahTglBayar!: string | null;

  @Column("character varying", {
    name: "history_ubah_jml_bayar",
    nullable: true,
  })
  historyUbahJmlBayar!: string | null;

  @Column("integer", { name: "pemekaran_flag", nullable: true })
  pemekaranFlag!: number | null;

  @Column("character varying", {
    name: "pemekaran_uuid_op",
    nullable: true,
    length: 36,
  })
  pemekaranUuidOp!: string | null;

  @Column("character varying", { name: "op_lk", nullable: true, length: 20 })
  opLk!: string | null;

  @Column("integer", { name: "user_id", nullable: true })
  userId!: number | null;

  @Column("integer", { name: "status_sppt", nullable: true })
  statusSppt!: number | null;
}
