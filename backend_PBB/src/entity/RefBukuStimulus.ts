import { Column, Entity } from "typeorm";

@Entity("REF_BUKU_STIMULUS", { schema: "PBB_KUTAI-BARAT" })
export class RefBukuStimulus {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_PAJAK", length: 4 })
  thnPajak!: string;

  @Column("character varying", { name: "BUKU", nullable: true, length: 5 })
  buku!: string | null;

  @Column("numeric", {
    name: "NILAI_MIN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMin!: string | null;

  @Column("numeric", {
    name: "NILAI_MAX",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  nilaiMax!: string | null;
}
