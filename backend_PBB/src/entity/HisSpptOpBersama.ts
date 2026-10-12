import { Column, Entity } from "typeorm";

@Entity("HIS_SPPT_OP_BERSAMA", { schema: "PBB_KUTAI-BARAT" })
export class HisSpptOpBersama {
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

  @Column("character", { name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

  @Column("numeric", {
    name: "HIS_INDEKS_PERUBAHAN_SPPT",
    precision: 2,
    scale: 0,
  })
  hisIndeksPerubahanSppt!: string;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_BEBAN_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiBebanSppt!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_BEBAN_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngBebanSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI_BEBAN_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumiBebanSppt!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG_BEBAN_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBngBebanSppt!: string | null;
}
