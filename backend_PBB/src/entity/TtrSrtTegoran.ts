import { Column, Entity, Index } from "typeorm";

@Index("TTR_SRT_TEGORAN_PK", ["kdKantor", "kdKanwil", "noSrtTegoran"], {
  unique: true,
})
@Entity("TTR_SRT_TEGORAN", { schema: "PBB_KUTAI-BARAT" })
export class TtrSrtTegoran {
  @Column("character", { primary: true, name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { primary: true, name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { primary: true, name: "NO_SRT_TEGORAN", length: 30 })
  noSrtTegoran!: string;

  @Column("timestamp without time zone", {
    name: "TGL_TERIMA_WP_SRT_TEGORAN",
    nullable: true,
  })
  tglTerimaWpSrtTegoran!: Date | null;

  @Column("character varying", {
    name: "NM_YG_MENERIMA_SRT_TEGORAN",
    nullable: true,
    length: 30,
  })
  nmYgMenerimaSrtTegoran!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_TTR_SRT_TEGORAN",
    nullable: true,
  })
  tglRekamTtrSrtTegoran!: Date | null;

  @Column("character", {
    name: "NIP_REKAM_TTR_SRT_TEGORAN",
    nullable: true,
    length: 30,
  })
  nipRekamTtrSrtTegoran!: string | null;
}
