import { Column, Entity } from "typeorm";

@Entity("DBKB_DAYA_DUKUNG", { schema: "PBB_KUTAI-BARAT" })
export class DbkbDayaDukung {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_DAYA_DUKUNG", length: 4 })
  thnDbkbDayaDukung!: string;

  @Column("character", { primary: true, name: "TYPE_KONSTRUKSI", length: 1 })
  typeKonstruksi!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_DAYA_DUKUNG",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbDayaDukung!: string | null;
}
