import { Column, Entity } from "typeorm";

@Entity("SKP_SPOP_OP_BERSAMA", { schema: "PBB_KUTAI-BARAT" })
export class SkpSpopOpBersama {
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

  @Column("character", { name: "KD_KLS_TANAH", nullable: true, length: 3 })
  kdKlsTanah!: string | null;

  @Column("character", {
    name: "THN_AWAL_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  thnAwalKlsTanah!: string | null;

  @Column("character", { name: "KD_KLS_BNG", nullable: true, length: 3 })
  kdKlsBng!: string | null;

  @Column("character", { name: "THN_AWAL_KLS_BNG", nullable: true, length: 4 })
  thnAwalKlsBng!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiBebanSkpSpop!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_BEBAN_SKP_SPOP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngBebanSkpSpop!: string | null;
}
