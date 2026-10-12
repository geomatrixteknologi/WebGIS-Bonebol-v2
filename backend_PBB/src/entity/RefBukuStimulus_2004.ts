import { Column, Entity } from "typeorm";

@Entity("REF_BUKU_STIMULUS_2004", { schema: "PBB_KUTAI-BARAT" })
export class RefBukuStimulus_2004 {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_SEKTOR", length: 2 })
  kdSektor!: string;

  @Column("character", { name: "THN_PAJAK", length: 4 })
  thnPajak!: string;

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
    name: "BK_EMPAT_LIMA_TNH_KOSONG",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkEmpatLimaTnhKosong!: string | null;

  @Column("numeric", {
    name: "BK_EMPAT_LIMA_BKN_TNH_KOSONG",
    nullable: true,
    precision: 3,
    scale: 0,
  })
  bkEmpatLimaBknTnhKosong!: string | null;
}
