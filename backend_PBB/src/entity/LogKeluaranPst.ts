import { Column, Entity } from "typeorm";

@Entity("LOG_KELUARAN_PST", { schema: "PBB_KUTAI-BARAT" })
export class LogKeluaranPst {
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

  @Column("character", { name: "KD_PROPINSI_PEMOHON", length: 2 })
  kdPropinsiPemohon!: string;

  @Column("character", { name: "KD_DATI2_PEMOHON", length: 2 })
  kdDati2Pemohon!: string;

  @Column("character", { name: "KD_KECAMATAN_PEMOHON", length: 3 })
  kdKecamatanPemohon!: string;

  @Column("character", { name: "KD_KELURAHAN_PEMOHON", length: 3 })
  kdKelurahanPemohon!: string;

  @Column("character", { name: "KD_BLOK_PEMOHON", length: 3 })
  kdBlokPemohon!: string;

  @Column("character", { name: "NO_URUT_PEMOHON", length: 4 })
  noUrutPemohon!: string;

  @Column("character", { name: "KD_JNS_OP_PEMOHON", length: 1 })
  kdJnsOpPemohon!: string;

  @Column("character", { name: "LOG_TAHUN_PAJAK", length: 4 })
  logTahunPajak!: string;

  @Column("character", { name: "KD_JNS_PELAYANAN", nullable: true, length: 2 })
  kdJnsPelayanan!: string | null;

  @Column("numeric", {
    name: "LOG_SPPT",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  logSppt!: string | null;

  @Column("numeric", {
    name: "LOG_STTS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  logStts!: string | null;

  @Column("numeric", {
    name: "LOG_DHKP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  logDhkp!: string | null;

  @Column("numeric", { name: "LOG_SK", nullable: true, precision: 1, scale: 0 })
  logSk!: string | null;

  @Column("numeric", {
    name: "LOG_STATUS",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  logStatus!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
