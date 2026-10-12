import { Column, Entity } from "typeorm";

@Entity("PEGAWAI", { schema: "PBB_KUTAI-BARAT" })
export class Pegawai {
  @Column("character", { primary: true, name: "NIP", length: 30 })
  nip!: string;

  @Column("character varying", {
    name: "NM_PEGAWAI",
    nullable: true,
    length: 50,
  })
  nmPegawai!: string | null;

  @Column("character", { name: "NIP_BARU", nullable: true, length: 30 })
  nipBaru!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 2 })
  kdTp!: string | null;

  @Column("character", { name: "KD_BANK_TUNGGAL", nullable: true, length: 2 })
  kdBankTunggal!: string | null;

  @Column("character", { name: "KD_BANK_PERSEPSI", nullable: true, length: 2 })
  kdBankPersepsi!: string | null;
}
