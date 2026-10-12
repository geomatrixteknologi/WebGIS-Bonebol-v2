import { Column, Entity } from "typeorm";

@Entity("DAT_OP_ANGGOTA", { schema: "PBB_KUTAI-BARAT" })
export class DatOpAnggota {
  @Column("character", { name: "KD_PROPINSI_INDUK", length: 2 })
  kdPropinsiInduk!: string;

  @Column("character", { name: "KD_DATI2_INDUK", length: 2 })
  kdDati2Induk!: string;

  @Column("character", { name: "KD_KECAMATAN_INDUK", length: 3 })
  kdKecamatanInduk!: string;

  @Column("character", { name: "KD_KELURAHAN_INDUK", length: 3 })
  kdKelurahanInduk!: string;

  @Column("character", { name: "KD_BLOK_INDUK", length: 3 })
  kdBlokInduk!: string;

  @Column("character", { name: "NO_URUT_INDUK", length: 4 })
  noUrutInduk!: string;

  @Column("character", { name: "KD_JNS_OP_INDUK", length: 1 })
  kdJnsOpInduk!: string;

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

  @Column("numeric", {
    name: "LUAS_BUMI_BEBAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiBeban!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_BEBAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngBeban!: string | null;

  @Column("numeric", {
    name: "NILAI_SISTEM_BUMI_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiSistemBumiBeban!: string | null;

  @Column("numeric", {
    name: "NILAI_SISTEM_BNG_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiSistemBngBeban!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiBeban!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngBeban!: string | null;
}
