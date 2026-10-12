import { Column, Entity } from "typeorm";

@Entity("DAT_OP_BUMI", { schema: "PBB_KUTAI-BARAT" })
export class DatOpBumi {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("numeric", { primary: true, name: "NO_BUMI", precision: 2, scale: 0 })
  noBumi!: string;

  @Column("character", { name: "KD_ZNT", nullable: true, length: 2 })
  kdZnt!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumi!: string | null;

  @Column("character", { name: "JNS_BUMI", nullable: true, length: 1 })
  jnsBumi!: string | null;

  @Column("numeric", {
    name: "NILAI_SISTEM_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiSistemBumi!: string | null;

  @Column("character", { name: "KD_PERUNTUKAN", nullable: true, length: 2 })
  kdPeruntukan!: string | null;

  @Column("character", { name: "KD_SUB_PERUNTUKAN", nullable: true, length: 2 })
  kdSubPeruntukan!: string | null;
}
