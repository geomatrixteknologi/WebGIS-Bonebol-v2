import { Column, Entity } from "typeorm";

@Entity("HIS_OP_BUMI", { schema: "PBB_KUTAI-BARAT" })
export class HisOpBumi {
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

  @Column("numeric", { name: "NO_BUMI", precision: 2, scale: 0 })
  noBumi!: string;

  @Column("numeric", { name: "HIS_INDEKS_OP_BUMI", precision: 2, scale: 0 })
  hisIndeksOpBumi!: string;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumi!: string | null;

  @Column("character", { name: "HIS_JNS_BUMI", nullable: true, length: 1 })
  hisJnsBumi!: string | null;

  @Column("numeric", {
    name: "HIS_NILAI_SISTEM_BUMI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNilaiSistemBumi!: string | null;

  @Column("character", { name: "HIS_KD_ZNT", nullable: true, length: 2 })
  hisKdZnt!: string | null;
}
