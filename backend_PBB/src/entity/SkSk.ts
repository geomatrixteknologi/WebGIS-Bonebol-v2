import { Column, Entity } from "typeorm";

@Entity("SK_SK", { schema: "PBB_KUTAI-BARAT" })
export class SkSk {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "JNS_SK", length: 1 })
  jnsSk!: string;

  @Column("character", { name: "NO_SK", length: 100 })
  noSk!: string;

  @Column("timestamp without time zone", { name: "TGL_SK", nullable: true })
  tglSk!: Date | null;

  @Column("character varying", {
    name: "NO_BA_KANTOR",
    nullable: true,
    length: 30,
  })
  noBaKantor!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_BA_KANTOR",
    nullable: true,
  })
  tglBaKantor!: Date | null;

  @Column("character varying", {
    name: "NO_BA_LAPANGAN",
    nullable: true,
    length: 30,
  })
  noBaLapangan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_BA_LAPANGAN",
    nullable: true,
  })
  tglBaLapangan!: Date | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_SK",
    nullable: true,
  })
  tglCetakSk!: Date | null;

  @Column("character", { name: "NIP_PENCETAK_SK", nullable: true, length: 30 })
  nipPencetakSk!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
