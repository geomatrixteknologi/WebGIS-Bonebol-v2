import { Column, Entity, Index } from "typeorm";

@Index("TEMPAT_PEMBAYARAN_SPPT_MASALPK", ["kdDati2", "kdKecamatan", "kdKelurahan", "kdPropinsi", "thnTpSpptMasal"], { unique: true })
@Entity("TEMPAT_PEMBAYARAN_SPPT_MASAL", { schema: "PBB_KUTAI-BARAT" })
export class TempatPembayaranSpptMasal {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "THN_TP_SPPT_MASAL", length: 4 })
  thnTpSpptMasal!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("character", { name: "KD_BANK_PERSEPSI", nullable: true, length: 2 })
  kdBankPersepsi!: string | null;

  @Column("character", { name: "KD_BANK_TUNGGAL", nullable: true, length: 2 })
  kdBankTunggal!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
