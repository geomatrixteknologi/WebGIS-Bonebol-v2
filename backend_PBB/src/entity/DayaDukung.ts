import { Column, Entity } from "typeorm";

@Entity("DAYA_DUKUNG", { schema: "PBB_KUTAI-BARAT" })
export class DayaDukung {
  @Column("character", { primary: true, name: "TYPE_KONSTRUKSI", length: 1 })
  typeKonstruksi!: string;

  @Column("numeric", {
    name: "DAYA_DUKUNG_LANTAI_MIN_DBKB",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  dayaDukungLantaiMinDbkb!: string | null;

  @Column("numeric", {
    name: "DAYA_DUKUNG_LANTAI_MAX_DBKB",
    nullable: true,
    precision: 8,
    scale: 0,
  })
  dayaDukungLantaiMaxDbkb!: string | null;
}
