import { Column, Entity } from "typeorm";

@Entity("PST_DATA_OP_BARU", { schema: "PBB_KUTAI-BARAT" })
export class PstDataOpBaru {
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

  @Column("character varying", {
    name: "NAMA_WP_BARU",
    nullable: true,
    length: 30,
  })
  namaWpBaru!: string | null;

  @Column("character varying", {
    name: "LETAK_OP_BARU",
    nullable: true,
    length: 35,
  })
  letakOpBaru!: string | null;

  @Column("character varying", { name: "NO_KTP", nullable: true, length: 35 })
  noKtp!: string | null;

  @Column("character varying", { name: "NO_HP", nullable: true, length: 35 })
  noHp!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;

  @Column("character varying", {
    name: "KECAMATAN_OP",
    nullable: true,
    length: 50,
  })
  kecamatanOp!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_OP",
    nullable: true,
    length: 50,
  })
  kelurahanOp!: string | null;

  @Column("character varying", {
    name: "ALAMAT_WP",
    nullable: true,
    length: 50,
  })
  alamatWp!: string | null;
}
