import { Column, Entity } from "typeorm";

@Entity("PENGHAPUSAN_BNG", { schema: "PBB_KUTAI-BARAT" })
export class PenghapusanBng {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK_PENGHAPUSAN_BNG", length: 3 })
  kdBlokPenghapusanBng!: string;

  @Column("character", { name: "NO_URUT_PENGHAPUSAN_BNG", length: 4 })
  noUrutPenghapusanBng!: string;

  @Column("character", { name: "KD_JNS_OP_PENGHAPUSAN_BNG", length: 1 })
  kdJnsOpPenghapusanBng!: string;

  @Column("numeric", { name: "NO_BNG_PENGHAPUSAN", precision: 3, scale: 0 })
  noBngPenghapusan!: string;

  @Column("numeric", { name: "INDEKS_PENGHAPUSAN_BNG", precision: 2, scale: 0 })
  indeksPenghapusanBng!: string;

  @Column("character", {
    name: "THN_PAJAK_PENGHAPUSAN_BNG",
    nullable: true,
    length: 4,
  })
  thnPajakPenghapusanBng!: string | null;

  @Column("character", {
    name: "NO_FORMULIR_PENGHAPUSAN_BNG",
    nullable: true,
    length: 11,
  })
  noFormulirPenghapusanBng!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_PENGHAPUSAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngPenghapusan!: string | null;

  @Column("numeric", {
    name: "NILAI_BNG_PENGHAPUSAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  nilaiBngPenghapusan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENGHAPUSAN_BNG",
    nullable: true,
  })
  tglPenghapusanBng!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_PENGHAPUSAN_BNG",
    nullable: true,
    length: 30,
  })
  nipPerekamPenghapusanBng!: string | null;
}
