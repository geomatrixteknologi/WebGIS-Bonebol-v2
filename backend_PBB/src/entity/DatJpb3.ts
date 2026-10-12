import { Column, Entity } from "typeorm";

@Entity("DAT_JPB3", { schema: "PBB_KUTAI-BARAT" })
export class DatJpb3 {
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

  @Column("character", { name: "TYPE_KONSTRUKSI", nullable: true, length: 1 })
  typeKonstruksi!: string | null;

  @Column("numeric", {
    name: "TING_KOLOM_JPB3",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  tingKolomJpb3!: string | null;

  @Column("numeric", {
    name: "LBR_BENT_JPB3",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  lbrBentJpb3!: string | null;

  @Column("numeric", {
    name: "LUAS_MEZZANINE_JPB3",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  luasMezzanineJpb3!: string | null;

  @Column("numeric", {
    name: "KELILING_DINDING_JPB3",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  kelilingDindingJpb3!: string | null;

  @Column("numeric", {
    name: "DAYA_DUKUNG_LANTAI_JPB3",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  dayaDukungLantaiJpb3!: string | null;
}
