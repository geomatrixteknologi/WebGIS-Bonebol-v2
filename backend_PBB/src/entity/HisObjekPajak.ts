import { Column, Entity } from "typeorm";

@Entity("HIS_OBJEK_PAJAK", { schema: "PBB_KUTAI-BARAT" })
export class HisObjekPajak {
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

  @Column("numeric", { name: "HIS_INDEKS_OP", precision: 2, scale: 0 })
  hisIndeksOp!: string;

  @Column("character", { name: "SUBJEK_PAJAK_ID", nullable: true, length: 30 })
  subjekPajakId!: string | null;

  @Column("numeric", {
    name: "HIS_STATUS_CABANG",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  hisStatusCabang!: string | null;

  @Column("numeric", {
    name: "HIS_STATUS_WP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  hisStatusWp!: string | null;

  @Column("numeric", {
    name: "HIS_TOTAL_LUAS_BNG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisTotalLuasBng!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_PEREKAMAN_AWAL",
    nullable: true,
  })
  hisTglPerekamanAwal!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PEREKAM_OP",
    nullable: true,
    length: 30,
  })
  hisNipPerekamOp!: string | null;

  @Column("character", {
    name: "HIS_NO_FORMULIR_SPOP",
    nullable: true,
    length: 11,
  })
  hisNoFormulirSpop!: string | null;

  @Column("numeric", {
    name: "HIS_TOTAL_LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisTotalLuasBumi!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumi!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBng!: string | null;
}
