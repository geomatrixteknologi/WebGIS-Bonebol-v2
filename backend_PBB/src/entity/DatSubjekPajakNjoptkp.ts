import { Column, Entity } from "typeorm";

@Entity("DAT_SUBJEK_PAJAK_NJOPTKP", { schema: "PBB_KUTAI-BARAT" })
export class DatSubjekPajakNjoptkp {
  @Column("character", { primary: true, name: "SUBJEK_PAJAK_ID", length: 30 })
  subjekPajakId!: string;

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

  @Column("character", { name: "THN_NJOPTKP", nullable: true, length: 4 })
  thnNjoptkp!: string | null;
}
