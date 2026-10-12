import { Column, Entity } from "typeorm";

@Entity("HIS_OP_BNG", { schema: "PBB_KUTAI-BARAT" })
export class HisOpBng {
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

  @Column("numeric", { name: "NO_BNG", precision: 3, scale: 0 })
  noBng!: string;

  @Column("numeric", { name: "HIS_INDEKS_OP_BNG", precision: 2, scale: 0 })
  hisIndeksOpBng!: string;

  @Column("character", { name: "KD_JPB", nullable: true, length: 2 })
  kdJpb!: string | null;

  @Column("character", {
    name: "HIS_NO_FORMULIR_OP_BNG",
    nullable: true,
    length: 11,
  })
  hisNoFormulirOpBng!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBng!: string | null;

  @Column("numeric", {
    name: "HIS_NILAI_BNG",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNilaiBng!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_PEREKAMAN_BNG_AWAL",
    nullable: true,
  })
  hisTglPerekamanBngAwal!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PEREKAM_BNG_AWAL",
    nullable: true,
    length: 30,
  })
  hisNipPerekamBngAwal!: string | null;
}
