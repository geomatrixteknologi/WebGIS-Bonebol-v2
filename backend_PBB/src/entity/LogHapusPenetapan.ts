import { Column, Entity } from "typeorm";

@Entity("LOG_HAPUS_PENETAPAN", { schema: "PBB_KUTAI-BARAT" })
export class LogHapusPenetapan {
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

  @Column("character", { name: "THN_PAJAK_SPPT", nullable: true, length: 4 })
  thnPajakSppt!: string | null;

  @Column("timestamp without time zone", { name: "TANGGAL_HAPUS" })
  tanggalHapus!: Date;

  @Column("character varying", { name: "NIP", length: 30 })
  nip!: string;
}
