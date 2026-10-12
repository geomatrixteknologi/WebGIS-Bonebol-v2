import { Column, Entity } from "typeorm";

@Entity("HIS_NILAI_INDIVIDU", { schema: "PBB_KUTAI-BARAT" })
export class HisNilaiIndividu {
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

  @Column("numeric", { name: "NO_BNG", precision: 3, scale: 0 })
  noBng!: string;

  @Column("numeric", {
    name: "HIS_INDEKS_NILAI_INDIVIDU",
    precision: 2,
    scale: 0,
  })
  hisIndeksNilaiIndividu!: string;

  @Column("character", {
    name: "HIS_NO_FORMULIR_INDIVIDU",
    nullable: true,
    length: 11,
  })
  hisNoFormulirIndividu!: string | null;

  @Column("numeric", {
    name: "HIS_NILAI_INDIVIDU",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  hisNilaiIndividu!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_PENILAIAN_INDIVIDU",
    nullable: true,
  })
  hisTglPenilaianIndividu!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PENILAI_INDIVIDU",
    nullable: true,
    length: 30,
  })
  hisNipPenilaiIndividu!: string | null;

  @Column("timestamp without time zone", {
    name: "HIS_TGL_PEREKAMAN_INDIVIDU",
    nullable: true,
  })
  hisTglPerekamanIndividu!: Date | null;

  @Column("character", {
    name: "HIS_NIP_PEREKAM_INDIVIDU",
    nullable: true,
    length: 30,
  })
  hisNipPerekamIndividu!: string | null;
}
