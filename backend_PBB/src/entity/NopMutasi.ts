import { Column, Entity } from "typeorm";

@Entity("NOP_MUTASI", { schema: "PBB_KUTAI-BARAT" })
export class NopMutasi {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("numeric", { name: "INDEKS_MUTASI", precision: 2, scale: 0 })
  indeksMutasi!: string;

  @Column("character", {
    name: "KD_PROPINSI_MUTASI",
    nullable: true,
    length: 2,
  })
  kdPropinsiMutasi!: string | null;

  @Column("character", { name: "KD_DATI2_MUTASI", nullable: true, length: 2 })
  kdDati2Mutasi!: string | null;

  @Column("character", {
    name: "KD_KECAMATAN_MUTASI",
    nullable: true,
    length: 3,
  })
  kdKecamatanMutasi!: string | null;

  @Column("character", {
    name: "KD_KELURAHAN_MUTASI",
    nullable: true,
    length: 3,
  })
  kdKelurahanMutasi!: string | null;

  @Column("character", { name: "KD_BLOK_MUTASI", nullable: true, length: 3 })
  kdBlokMutasi!: string | null;

  @Column("character", { name: "NO_URUT_MUTASI", nullable: true, length: 4 })
  noUrutMutasi!: string | null;

  @Column("character", { name: "KD_JNS_OP_MUTASI", nullable: true, length: 1 })
  kdJnsOpMutasi!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_MUTASI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiMutasi!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_NOP_MUTASI",
    nullable: true,
  })
  tglRekamNopMutasi!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_NOP_MUTASI",
    nullable: true,
    length: 30,
  })
  nipPerekamNopMutasi!: string | null;
}
