import { Column, Entity, Index } from "typeorm";

@Index("SPPT_OP_BERSAMA_PK", ["kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noUrut", "thnPajakSppt"], { unique: true })
@Entity("SPPT_OP_BERSAMA", { schema: "PBB_KUTAI-BARAT" })
export class SpptOpBersama {
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

  @Column("character", { primary: true, name: "THN_PAJAK_SPPT", length: 4 })
  thnPajakSppt!: string;

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
    name: "LUAS_BUMI_BEBAN_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiBebanSppt!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_BEBAN_SPPT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngBebanSppt!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_BEBAN_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiBebanSppt!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_BEBAN_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngBebanSppt!: string | null;
}
