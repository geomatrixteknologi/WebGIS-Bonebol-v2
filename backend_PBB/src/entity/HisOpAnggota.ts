import { Column, Entity } from "typeorm";

@Entity("HIS_OP_ANGGOTA", { schema: "PBB_KUTAI-BARAT" })
export class HisOpAnggota {
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

  @Column("character", {
    name: "HIS_KD_PROPINSI_INDUK",
    nullable: true,
    length: 2,
  })
  hisKdPropinsiInduk!: string | null;

  @Column("character", {
    name: "HIS_KD_DATI2_INDUK",
    nullable: true,
    length: 2,
  })
  hisKdDati2Induk!: string | null;

  @Column("character", {
    name: "HIS_KD_KECAMATAN_INDUK",
    nullable: true,
    length: 3,
  })
  hisKdKecamatanInduk!: string | null;

  @Column("character", {
    name: "HIS_KD_KELURAHAN_INDUK",
    nullable: true,
    length: 3,
  })
  hisKdKelurahanInduk!: string | null;

  @Column("character", { name: "HIS_KD_BLOK_INDUK", nullable: true, length: 3 })
  hisKdBlokInduk!: string | null;

  @Column("character", { name: "HIS_NO_URUT_INDUK", nullable: true, length: 4 })
  hisNoUrutInduk!: string | null;

  @Column("character", {
    name: "HIS_KD_JNS_OP_INDUK",
    nullable: true,
    length: 1,
  })
  hisKdJnsOpInduk!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_BEBAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiBeban!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_BEBAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngBeban!: string | null;

  @Column("numeric", {
    name: "HIS_NILAI_BUMI_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNilaiBumiBeban!: string | null;

  @Column("numeric", {
    name: "HIS_NILAI_BNG_BEBAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNilaiBngBeban!: string | null;
}
