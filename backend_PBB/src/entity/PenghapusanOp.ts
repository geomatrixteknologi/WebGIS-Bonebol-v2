import { Column, Entity } from "typeorm";

@Entity("PENGHAPUSAN_OP", { schema: "PBB_KUTAI-BARAT" })
export class PenghapusanOp {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK_PENGHAPUSAN", length: 3 })
  kdBlokPenghapusan!: string;

  @Column("character", { name: "NO_URUT_PENGHAPUSAN", length: 4 })
  noUrutPenghapusan!: string;

  @Column("character", { name: "KD_JNS_OP_PENGHAPUSAN", length: 1 })
  kdJnsOpPenghapusan!: string;

  @Column("character", {
    name: "THN_PAJAK_PENGHAPUSAN_OP",
    nullable: true,
    length: 4,
  })
  thnPajakPenghapusanOp!: string | null;

  @Column("character", {
    name: "NO_FORMULIR_PENGHAPUSAN_OP",
    nullable: true,
    length: 11,
  })
  noFormulirPenghapusanOp!: string | null;

  @Column("character varying", {
    name: "NAMA_WP_PENGHAPUSAN",
    nullable: true,
    length: 30,
  })
  namaWpPenghapusan!: string | null;

  @Column("character", {
    name: "KD_ZNT_PENGHAPUSAN",
    nullable: true,
    length: 2,
  })
  kdZntPenghapusan!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_PENGHAPUSAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiPenghapusan!: string | null;

  @Column("numeric", {
    name: "NILAI_BUMI_PENGHAPUSAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  nilaiBumiPenghapusan!: string | null;

  @Column("numeric", {
    name: "PBB_HAPUS_OP",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbHapusOp!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PENGHAPUSAN_OP",
    nullable: true,
  })
  tglPenghapusanOp!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_PENGHAPUSAN_OP",
    nullable: true,
    length: 30,
  })
  nipPerekamPenghapusanOp!: string | null;
}
