import { Column, Entity } from "typeorm";

@Entity("DAT_NILAI_INDIVIDU", { schema: "PBB_KUTAI-BARAT" })
export class DatNilaiIndividu {
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

  @Column("character", {
    name: "NO_FORMULIR_INDIVIDU",
    nullable: true,
    length: 11,
  })
  noFormulirIndividu!: string | null;

  @Column("numeric", {
    name: "NILAI_INDIVIDU",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  nilaiIndividu!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENILAIAN_INDIVIDU",
    nullable: true,
  })
  tglPenilaianIndividu!: Date | null;

  @Column("character", {
    name: "NIP_PENILAI_INDIVIDU",
    nullable: true,
    length: 30,
  })
  nipPenilaiIndividu!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMERIKSAAN_INDIVIDU",
    nullable: true,
  })
  tglPemeriksaanIndividu!: Date | null;

  @Column("character", {
    name: "NIP_PEMERIKSA_INDIVIDU",
    nullable: true,
    length: 30,
  })
  nipPemeriksaIndividu!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_NILAI_INDIVIDU",
    nullable: true,
  })
  tglRekamNilaiIndividu!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_INDIVIDU",
    nullable: true,
    length: 30,
  })
  nipPerekamIndividu!: string | null;
}
