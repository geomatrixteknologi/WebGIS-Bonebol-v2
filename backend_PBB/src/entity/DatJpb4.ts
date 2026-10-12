import { Column, Entity } from "typeorm";

@Entity("DAT_JPB4", { schema: "PBB_KUTAI-BARAT" })
export class DatJpb4 {
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

  @Column("numeric", { primary: true, name: "NO_BNG", precision: 3, scale: 0 })
  noBng!: string;

  @Column("character", { name: "KLS_JPB4", nullable: true, length: 1 })
  klsJpb4!: string | null;
}
