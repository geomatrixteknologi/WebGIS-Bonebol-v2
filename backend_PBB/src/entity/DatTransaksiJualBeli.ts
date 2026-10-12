import { Column, Entity } from "typeorm";

@Entity("DAT_TRANSAKSI_JUAL_BELI", { schema: "PBB_KUTAI-BARAT" })
export class DatTransaksiJualBeli {
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

  @Column("timestamp without time zone", { name: "TGL_TRANSAKSI" })
  tglTransaksi!: Date;

  @Column("character", { name: "SUMBER_INFORMASI", nullable: true, length: 1 })
  sumberInformasi!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_TRANSAKSI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiTransaksi!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_TRANSAKSI",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngTransaksi!: string | null;

  @Column("character", { name: "KD_ZNT_TRANSAKSI", nullable: true, length: 2 })
  kdZntTransaksi!: string | null;

  @Column("numeric", {
    name: "HARGA_BNG_TRANSAKSI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hargaBngTransaksi!: string | null;

  @Column("numeric", {
    name: "HARGA_BUMI_TRANSAKSI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hargaBumiTransaksi!: string | null;

  @Column("numeric", {
    name: "HARGA_TOTAL_TRANSAKSI",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  hargaTotalTransaksi!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_REKAM_TRANSAKSI",
    nullable: true,
  })
  tglRekamTransaksi!: Date | null;

  @Column("character", { name: "NIP_PEREKAM", nullable: true, length: 30 })
  nipPerekam!: string | null;
}
