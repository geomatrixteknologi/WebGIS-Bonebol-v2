import { Column, Entity, Index } from "typeorm";

@Index("TIPE_BANGUNAN_PK", ["tipeBng"], { unique: true })
@Entity("TIPE_BANGUNAN", { schema: "PBB_KUTAI-BARAT" })
export class TipeBangunan {
  @Column("character", { name: "TIPE_BNG", length: 5 })
  tipeBng!: string;

  @Column("character varying", {
    name: "NM_TIPE_BNG",
    nullable: true,
    length: 30,
  })
  nmTipeBng!: string | null;

  @Column("numeric", {
    name: "LUAS_MIN_TIPE_BNG",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  luasMinTipeBng!: string | null;

  @Column("numeric", {
    name: "LUAS_MAX_TIPE_BNG",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  luasMaxTipeBng!: string | null;

  @Column("numeric", {
    name: "FAKTOR_PEMBAGI_TIPE_BNG",
    nullable: true,
    precision: 8,
    scale: 4,
  })
  faktorPembagiTipeBng!: string | null;
}
