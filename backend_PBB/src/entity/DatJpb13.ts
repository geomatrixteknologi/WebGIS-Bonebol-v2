import { Column, Entity } from "typeorm";

@Entity("DAT_JPB13", { schema: "PBB_KUTAI-BARAT" })
export class DatJpb13 {
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

  @Column("character", { name: "KLS_JPB13", nullable: true, length: 1 })
  klsJpb13!: string | null;

  @Column("numeric", {
    name: "JML_JPB13",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  jmlJpb13!: string | null;

  @Column("numeric", {
    name: "LUAS_JPB13_DGN_AC_SENT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasJpb13DgnAcSent!: string | null;

  @Column("numeric", {
    name: "LUAS_JPB13_LAIN_DGN_AC_SENT",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasJpb13LainDgnAcSent!: string | null;
}
