import { Column, Entity } from "typeorm";

@Entity("HIS_SKP_SPOP_OP_BERSAMA", { schema: "PBB_KUTAI-BARAT" })
export class HisSkpSpopOpBersama {
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

  @Column("character", { name: "THN_PAJAK_SKP_SPOP", length: 4 })
  thnPajakSkpSpop!: string;

  @Column("numeric", {
    name: "HIS_INDEKS_PERUBAHAN_SKP_SPOP",
    precision: 2,
    scale: 0,
  })
  hisIndeksPerubahanSkpSpop!: string;

  @Column("numeric", {
    name: "HIS_LUAS_BUMI_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBumiBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_LUAS_BNG_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisLuasBngBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BUMI_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBumiBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "HIS_NJOP_BNG_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hisNjopBngBebanSkpSpop!: string | null;
}
