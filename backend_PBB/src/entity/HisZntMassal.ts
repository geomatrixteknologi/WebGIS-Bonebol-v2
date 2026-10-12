import { Column, Entity } from "typeorm";

@Entity("HIS_ZNT_MASSAL", { schema: "PBB_KUTAI-BARAT" })
export class HisZntMassal {
  @Column("character", { name: "HIS_ID", length: 30 })
  hisId!: string;

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

  @Column("character", { name: "ZNT_ASAL", nullable: true, length: 2 })
  zntAsal!: string | null;

  @Column("character", { name: "ZNT_BARU", nullable: true, length: 2 })
  zntBaru!: string | null;

  @Column("character", { name: "NO_DOKUMEN", nullable: true, length: 30 })
  noDokumen!: string | null;

  @Column("timestamp without time zone", {
    name: "TANGGAL_PERUBAHAN",
    nullable: true,
  })
  tanggalPerubahan!: Date | null;

  @Column("character", { name: "NIP_PERUBAHAN", nullable: true, length: 30 })
  nipPerubahan!: string | null;
}
