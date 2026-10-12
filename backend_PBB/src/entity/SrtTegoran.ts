import { Column, Entity, Index } from "typeorm";

@Index("SRT_TEGORAN_PK", ["kdKantor", "kdKanwil", "noSrtTegoran"], {
  unique: true,
})
@Entity("SRT_TEGORAN", { schema: "PBB_KUTAI-BARAT" })
export class SrtTegoran {
  @Column("character", { primary: true, name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { primary: true, name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { primary: true, name: "NO_SRT_TEGORAN", length: 30 })
  noSrtTegoran!: string;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", { name: "KD_BLOK", nullable: true, length: 3 })
  kdBlok!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 4 })
  noUrut!: string | null;

  @Column("character", { name: "KD_JNS_OP", nullable: true, length: 1 })
  kdJnsOp!: string | null;

  @Column("character", { name: "THN_PAJAK_STP", nullable: true, length: 4 })
  thnPajakStp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_TERBIT_SRT_TEGORAN",
    nullable: true,
  })
  tglTerbitSrtTegoran!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_SRT_TEGORAN",
    nullable: true,
  })
  tglCetakSrtTegoran!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_SRT_TEGORAN",
    nullable: true,
    length: 30,
  })
  nipPencetakSrtTegoran!: string | null;
}
