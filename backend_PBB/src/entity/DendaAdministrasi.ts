import { Column, Entity } from "typeorm";

@Entity("DENDA_ADMINISTRASI", { schema: "PBB_KUTAI-BARAT" })
export class DendaAdministrasi {
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

  @Column("character", { name: "THN_DENDA", length: 4 })
  thnDenda!: string;

  @Column("numeric", {
    name: "POKOK_DENDA_ADM",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  pokokDendaAdm!: string | null;

  @Column("numeric", {
    name: "PENGURANGAN_DENDA",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  penguranganDenda!: string | null;

  @Column("numeric", {
    name: "DENDA_ADM_STLH_PENGURANGAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  dendaAdmStlhPengurangan!: string | null;

  @Column("character", {
    name: "STATUS_TAGIHAN_DENDA",
    nullable: true,
    length: 1,
  })
  statusTagihanDenda!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_DENDA",
    nullable: true,
  })
  tglRekamDenda!: Date | null;

  @Column("character", {
    name: "NIP_PEREKAM_DENDA",
    nullable: true,
    length: 30,
  })
  nipPerekamDenda!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_AWAL_BERLAKU",
    nullable: true,
  })
  tglAwalBerlaku!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_AKHIR_BERLAKU",
    nullable: true,
  })
  tglAkhirBerlaku!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_APPROVE",
    nullable: true,
  })
  tglApprove!: Date | null;
}
