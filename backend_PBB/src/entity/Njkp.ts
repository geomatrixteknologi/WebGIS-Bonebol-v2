import { Column, Entity } from "typeorm";

@Entity("NJKP", { schema: "PBB_KUTAI-BARAT" })
export class Njkp {
  @Column("numeric", {
    name: "INDEKS_RANGE",
    nullable: true,
    precision: 2,
    scale: 0,
  })
  indeksRange!: string | null;

  @Column("character", { name: "KD_JNS_RANGE", nullable: true, length: 1 })
  kdJnsRange!: string | null;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_JPB_JPT", nullable: true, length: 2 })
  kdJpbJpt!: string | null;

  @Column("numeric", {
    name: "URUTAN_NJKP",
    nullable: true,
    precision: 2,
    scale: 0,
  })
  urutanNjkp!: string | null;

  @Column("numeric", {
    name: "NJOP_MIN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopMin!: string | null;

  @Column("numeric", {
    name: "NJOP_MAX",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopMax!: string | null;

  @Column("numeric", {
    name: "NILAI_NJKP",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  nilaiNjkp!: string | null;
}
