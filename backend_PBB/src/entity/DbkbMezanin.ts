import { Column, Entity } from "typeorm";

@Entity("DBKB_MEZANIN", { schema: "PBB_KUTAI-BARAT" })
export class DbkbMezanin {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "THN_DBKB_MEZANIN", length: 4 })
  thnDbkbMezanin!: string;

  @Column("numeric", {
    name: "NILAI_DBKB_MEZANIN",
    nullable: true,
    precision: 10,
    scale: 0,
  })
  nilaiDbkbMezanin!: string | null;
}
