import { Column, Entity } from "typeorm";

@Entity("HIS_PERUBAHAN_NIR", { schema: "PBB_KUTAI-BARAT" })
export class HisPerubahanNir {
  @Column("numeric", { name: "HIS_ID", precision: 1000, scale: 53 })
  hisId!: string;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", { name: "KD_ZNT", nullable: true, length: 2 })
  kdZnt!: string | null;

  @Column("character", { name: "THN_NIR", nullable: true, length: 4 })
  thnNir!: string | null;

  @Column("character", { name: "NO_DOKUMEN_AWAL", nullable: true, length: 11 })
  noDokumenAwal!: string | null;

  @Column("character", { name: "NO_DOKUMEN_BARU", nullable: true, length: 11 })
  noDokumenBaru!: string | null;

  @Column("numeric", {
    name: "NIR_AWAL",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nirAwal!: string | null;

  @Column("numeric", {
    name: "NIR_BARU",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nirBaru!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PERUBAHAN",
    nullable: true,
  })
  tglPerubahan!: Date | null;

  @Column("character", { name: "NIP_PERUBAHAN", nullable: true, length: 30 })
  nipPerubahan!: string | null;
}
