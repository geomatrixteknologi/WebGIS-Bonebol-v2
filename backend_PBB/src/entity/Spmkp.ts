import { Column, Entity } from "typeorm";

@Entity("SPMKP", { schema: "PBB_KUTAI-BARAT" })
export class Spmkp {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { name: "NO_SPMKP", length: 30 })
  noSpmkp!: string;

  @Column("timestamp without time zone", { name: "TGL_SPMKP", nullable: true })
  tglSpmkp!: Date | null;

  @Column("character", { name: "THN_PELAYANAN", nullable: true, length: 4 })
  thnPelayanan!: string | null;

  @Column("character", { name: "BUNDEL_PELAYANAN", nullable: true, length: 4 })
  bundelPelayanan!: string | null;

  @Column("character", { name: "NO_URUT_PELAYANAN", nullable: true, length: 3 })
  noUrutPelayanan!: string | null;

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

  @Column("character varying", {
    name: "NO_REK_WP",
    nullable: true,
    length: 20,
  })
  noRekWp!: string | null;

  @Column("character varying", {
    name: "NM_BANK_WP",
    nullable: true,
    length: 30,
  })
  nmBankWp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_SPMKP",
    nullable: true,
  })
  tglRekamSpmkp!: Date | null;

  @Column("character", { name: "NIP_REKAM_SPMKP", nullable: true, length: 30 })
  nipRekamSpmkp!: string | null;
}
