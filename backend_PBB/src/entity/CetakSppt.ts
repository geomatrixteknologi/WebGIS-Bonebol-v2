import { Column, Entity } from "typeorm";

@Entity("CETAK_SPPT", { schema: "PBB_KUTAI-BARAT" })
export class CetakSppt {
  @Column("character", { name: "ID", length: 25 })
  id!: string;

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

  @Column("character", { name: "THN_PAJAK_SPPT", nullable: true, length: 4 })
  thnPajakSppt!: string | null;

  @Column("character varying", {
    name: "KODE_SPPT",
    nullable: true,
    length: 100,
  })
  kodeSppt!: string | null;
}
