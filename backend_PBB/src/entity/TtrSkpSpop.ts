import { Column, Entity, Index } from "typeorm";

@Index("TTR_SKP_SPOP_PK", ["kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noUrut", "thnPajakSkpSpop"], { unique: true })
@Entity("TTR_SKP_SPOP", { schema: "PBB_KUTAI-BARAT" })
export class TtrSkpSpop {
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

  @Column("character", { primary: true, name: "THN_PAJAK_SKP_SPOP", length: 4 })
  thnPajakSkpSpop!: string;

  @Column("timestamp without time zone", {
    name: "TGL_TERIMA_WP_SKP_SPOP",
    nullable: true,
  })
  tglTerimaWpSkpSpop!: Date | null;

  @Column("character varying", {
    name: "NM_YG_MENERIMA_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  nmYgMenerimaSkpSpop!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_TTR_SKP_SPOP",
    nullable: true,
  })
  tglRekamTtrSkpSpop!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_TTR_SKP_SPOP",
    nullable: true,
    length: 30,
  })
  nipPerekamTtrSkpSpop!: string | null;
}
