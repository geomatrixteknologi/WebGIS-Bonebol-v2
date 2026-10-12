import { Column, Entity, Index } from "typeorm";

@Index("TTR_SPPT_PK", ["kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "noUrut", "thnPajakSppt"], { unique: true })
@Index("TTR_SPPT_I01", ["tglRekamTtrSppt"], {})
@Entity("TTR_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class TtrSppt {
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

  @Column("timestamp without time zone", {
    name: "TGL_TERIMA_WP_SPPT",
    nullable: true,
  })
  tglTerimaWpSppt!: Date | null;

  @Column("character varying", {
    name: "NM_YG_MENERIMA_SPPT",
    nullable: true,
    length: 30,
  })
  nmYgMenerimaSppt!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_TTR_SPPT",
    nullable: true,
  })
  tglRekamTtrSppt!: Date | null;

  @Column("character", {
    name: "NIP_REKAM_TTR_SPPT",
    nullable: true,
    length: 30,
  })
  nipRekamTtrSppt!: string | null;
}
