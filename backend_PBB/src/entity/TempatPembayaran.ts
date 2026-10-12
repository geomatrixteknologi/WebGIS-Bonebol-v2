import { Column, Entity, Index } from "typeorm";

@Index("TEMPAT_PEMBAYARAN_PK", ["kdKantor", "kdKanwil", "kdTp"], {
  unique: true,
})
@Entity("TEMPAT_PEMBAYARAN", { schema: "PBB_KUTAI-BARAT" })
export class TempatPembayaran {
  @Column("character", { primary: true, name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { primary: true, name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { primary: true, name: "KD_TP", length: 4 })
  kdTp!: string;

  @Column("character varying", { name: "NM_TP", nullable: true, length: 150 })
  nmTp!: string | null;

  @Column("character varying", {
    name: "ALAMAT_TP",
    nullable: true,
    length: 50,
  })
  alamatTp!: string | null;

  @Column("character varying", {
    name: "NO_REK_TP",
    nullable: true,
    length: 15,
  })
  noRekTp!: string | null;

  @Column("character", { name: "KD_BANK_TUNGGAL", nullable: true, length: 2 })
  kdBankTunggal!: string | null;

  @Column("character", { name: "KD_BANK_PERSEPSI", nullable: true, length: 2 })
  kdBankPersepsi!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
