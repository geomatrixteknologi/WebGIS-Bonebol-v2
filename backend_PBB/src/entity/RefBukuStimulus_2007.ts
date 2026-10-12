import { Column, Entity } from "typeorm";

@Entity("REF_BUKU_STIMULUS_2007", { schema: "PBB_KUTAI-BARAT" })
export class RefBukuStimulus_2007 {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "THN_PAJAK", length: 4 })
  thnPajak!: string;

  @Column("character", { name: "KD_SEKTOR", nullable: true, length: 2 })
  kdSektor!: string | null;

  @Column("numeric", {
    name: "BK_SATU",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkSatu!: string | null;

  @Column("numeric", { name: "BK_DUA", nullable: true, precision: 3, scale: 0 })
  bkDua!: string | null;

  @Column("numeric", {
    name: "BK_TIGA",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkTiga!: string | null;

  @Column("numeric", {
    name: "BK_EMPAT",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkEmpat!: string | null;

  @Column("numeric", {
    name: "BK_LIMA",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkLima!: string | null;

  @Column("character", { name: "STATUS", nullable: true, length: 1 })
  status!: string | null;
}
