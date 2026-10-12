import { Column, Entity } from "typeorm";

@Entity("DAT_JPB15", { schema: "PBB_KUTAI-BARAT" })
export class DatJpb15 {
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

  @Column("character", {
    name: "LETAK_TANGKI_JPB15",
    nullable: true,
    length: 1,
  })
  letakTangkiJpb15!: string | null;

  @Column("numeric", {
    name: "KAPASITAS_TANGKI_JPB15",
    nullable: true,
    precision: 6,
    scale: 0,
  })
  kapasitasTangkiJpb15!: string | null;
}
