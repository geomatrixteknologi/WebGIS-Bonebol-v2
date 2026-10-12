import { Column, Entity } from "typeorm";

@Entity("DAT_VERIFIKASI_PBB", { schema: "PBB_KUTAI-BARAT" })
export class DatVerifikasiPbb {
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

  @Column("character", { name: "THN_PAJAK_SPPT", nullable: true, length: 4 })
  thnPajakSppt!: string | null;

  @Column("numeric", {
    name: "PBB_YG_HARUS_DIBAYAR_SPPT",
    nullable: true,
    precision: 22,
    scale: 0,
  })
  pbbYgHarusDibayarSppt!: string | null;

  @Column("character", { name: "HASIL_KONFIRMASI", nullable: true, length: 3 })
  hasilKonfirmasi!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_VERIFIKASI_PBB",
    nullable: true,
  })
  tglVerifikasiPbb!: Date | null;

  @Column("character", { name: "NIP_PETUGAS", nullable: true, length: 30 })
  nipPetugas!: string | null;

  @Column("character", { name: "THN_KONFIRMASI", nullable: true, length: 4 })
  thnKonfirmasi!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_JATUH_TEMPO_SPPT",
    nullable: true,
  })
  tglJatuhTempoSppt!: Date | null;
}
