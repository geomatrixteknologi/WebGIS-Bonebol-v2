import { Column, Entity, Index } from "typeorm";

@Index("TEMP_SPOP_LSPOP_PK", ["jnsTransaksiTemp", "kdBlok", "kdDati2", "kdJnsOp", "kdKecamatan", "kdKelurahan", "kdPropinsi", "nipTransaksiTemp", "noTransaksiTemp", "noUrut"], { unique: true })
@Entity("TEMP_SPOP_LSPOP", { schema: "PBB_KUTAI-BARAT" })
export class TempSpopLspop {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { primary: true, name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { primary: true, name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("character", { primary: true, name: "JNS_TRANSAKSI_TEMP", length: 1 })
  jnsTransaksiTemp!: string;

  @Column("numeric", {
    primary: true,
    name: "NO_TRANSAKSI_TEMP",
    precision: 2,
    scale: 0,
  })
  noTransaksiTemp!: string;

  @Column("character", {
    primary: true,
    name: "NIP_TRANSAKSI_TEMP",
    length: 30,
  })
  nipTransaksiTemp!: string;

  @Column("numeric", {
    name: "STATUS_PROSES",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusProses!: string | null;
}
