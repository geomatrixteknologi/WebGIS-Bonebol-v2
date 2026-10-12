import { Column, Entity } from "typeorm";

@Entity("FASILITAS", { schema: "PBB_KUTAI-BARAT" })
export class Fasilitas {
  @Column("character", { primary: true, name: "KD_FASILITAS", length: 2 })
  kdFasilitas!: string;

  @Column("character varying", {
    name: "NM_FASILITAS",
    nullable: true,
    length: 50,
  })
  nmFasilitas!: string | null;

  @Column("character varying", {
    name: "SATUAN_FASILITAS",
    nullable: true,
    length: 10,
  })
  satuanFasilitas!: string | null;

  @Column("character", { name: "STATUS_FASILITAS", nullable: true, length: 1 })
  statusFasilitas!: string | null;

  @Column("character", { name: "KETERGANTUNGAN", nullable: true, length: 1 })
  ketergantungan!: string | null;
}
