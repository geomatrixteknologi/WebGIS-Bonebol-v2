import { Column, Entity } from "typeorm";

@Entity("NJOPTKP", { schema: "PBB_KUTAI-BARAT" })
export class Njoptkp {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_AWAL", length: 4 })
  thnAwal!: string;

  @Column("character", { name: "THN_AKHIR", nullable: true, length: 4 })
  thnAkhir!: string | null;

  @Column("numeric", {
    name: "NILAI_NJOPTKP",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  nilaiNjoptkp!: string | null;
}
