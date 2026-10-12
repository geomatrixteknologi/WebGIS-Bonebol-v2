import { Column, Entity } from "typeorm";

@Entity("KELUARAN_PST", { schema: "PBB_KUTAI-BARAT" })
export class KeluaranPst {
  @Column("character", { name: "KD_JNS_PELAYANAN", length: 2 })
  kdJnsPelayanan!: string;

  @Column("numeric", {
    name: "SPPT_PELAYANAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  spptPelayanan!: string | null;

  @Column("numeric", {
    name: "STTS_PELAYANAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  sttsPelayanan!: string | null;

  @Column("numeric", {
    name: "DHKP_PELAYANAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  dhkpPelayanan!: string | null;

  @Column("numeric", {
    name: "SK_PELAYANAN",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  skPelayanan!: string | null;
}
