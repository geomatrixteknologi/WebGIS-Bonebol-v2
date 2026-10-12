import { Column, Entity } from "typeorm";

@Entity("DAT_JPB8", { schema: "PBB_KUTAI-BARAT" })
export class DatJpb8 {
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
    name: "TING_KOLOM_JPB8",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  tingKolomJpb8!: string | null;

  @Column("numeric", {
    name: "LBR_BENT_JPB8",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  lbrBentJpb8!: string | null;

  @Column("numeric", {
    name: "LUAS_MEZZANINE_JPB8",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  luasMezzanineJpb8!: string | null;

  @Column("numeric", {
    name: "KELILING_DINDING_JPB8",
    nullable: true,
    precision: 4,
    scale: 0,
  })
  kelilingDindingJpb8!: string | null;

  @Column("numeric", {
    name: "DAYA_DUKUNG_LANTAI_JPB8",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  dayaDukungLantaiJpb8!: string | null;
}
