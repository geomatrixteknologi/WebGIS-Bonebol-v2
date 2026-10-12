import { Column, Entity } from "typeorm";

@Entity("PENGURANGAN_DENDA_ADM_X", { schema: "PBB_KUTAI-BARAT" })
export class PenguranganDendaAdmX {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

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

  @Column("character", {
    name: "THN_PENGURANGAN_DENDA_ADM",
    nullable: true,
    length: 4,
  })
  thnPenguranganDendaAdm!: string | null;

  @Column("character", { name: "JNS_SK", nullable: true, length: 1 })
  jnsSk!: string | null;

  @Column("character", { name: "NO_SK", nullable: true, length: 100 })
  noSk!: string | null;

  @Column("character", { name: "STATUS_PENG_ADM", nullable: true, length: 1 })
  statusPengAdm!: string | null;

  @Column("numeric", {
    name: "PCT_PENG_DENDA_ADM",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pctPengDendaAdm!: string | null;
}
