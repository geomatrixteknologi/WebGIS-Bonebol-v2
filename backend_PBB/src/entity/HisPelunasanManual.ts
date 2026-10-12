import { Column, Entity } from "typeorm";

@Entity("HIS_PELUNASAN_MANUAL", { schema: "PBB_KUTAI-BARAT" })
export class HisPelunasanManual {
  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 3 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 3 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", { name: "KD_BLOK", nullable: true, length: 3 })
  kdBlok!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 4 })
  noUrut!: string | null;

  @Column("character", { name: "KD_JNS_OP", nullable: true, length: 3 })
  kdJnsOp!: string | null;

  @Column("character", { name: "THN_PAJAK_SPPT", nullable: true, length: 4 })
  thnPajakSppt!: string | null;

  @Column("numeric", {
    name: "PBB_YG_HARUS_DIBAYAR_SPPT",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbYgHarusDibayarSppt!: string | null;

  @Column("character", {
    name: "STATUS_PEMBAYARAN_SPPT_AWAL",
    nullable: true,
    length: 1,
  })
  statusPembayaranSpptAwal!: string | null;

  @Column("character", {
    name: "STATUS_PEMBAYARAN_SPPT_AKHIR",
    nullable: true,
    length: 1,
  })
  statusPembayaranSpptAkhir!: string | null;

  @Column("timestamp without time zone", {
    name: "TANGGAL_PERUBAHAN",
    nullable: true,
  })
  tanggalPerubahan!: Date | null;

  @Column("character varying", {
    name: "USERNAME_PERUBAHAN",
    nullable: true,
    length: 18,
  })
  usernamePerubahan!: string | null;

  @Column("character varying", {
    name: "NIP_PERUBAHAN",
    nullable: true,
    length: 30,
  })
  nipPerubahan!: string | null;

  @Column("character varying", {
    name: "NM_PEGAWAI_PERUBAHAN",
    nullable: true,
    length: 50,
  })
  nmPegawaiPerubahan!: string | null;
}
