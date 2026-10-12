import { Column, Entity } from "typeorm";

@Entity("POSISI_PEGAWAI", { schema: "PBB_KUTAI-BARAT" })
export class PosisiPegawai {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "NIP", length: 30 })
  nip!: string;

  @Column("character", { name: "KD_SEKSI", nullable: true, length: 2 })
  kdSeksi!: string | null;

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

  @Column("character", { name: "KD_WEWENANG", nullable: true, length: 2 })
  kdWewenang!: string | null;

  @Column("character", { name: "KD_JABATAN", nullable: true, length: 2 })
  kdJabatan!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;

  @Column("character", { name: "KD_SUBSEKSI", nullable: true, length: 2 })
  kdSubseksi!: string | null;
}
