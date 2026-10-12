import { Column, Entity } from "typeorm";

@Entity("DOKUMEN", { schema: "PBB_KUTAI-BARAT" })
export class Dokumen {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "JNS_DOKUMEN", length: 1 })
  jnsDokumen!: string;

  @Column("character", { name: "NO_DOKUMEN", length: 11 })
  noDokumen!: string;

  @Column("timestamp without time zone", {
    name: "TGL_PENDATAAN_DOK",
    nullable: true,
  })
  tglPendataanDok!: Date | null;

  @Column("character", { name: "NIP_PENDATA_DOK", nullable: true, length: 30 })
  nipPendataDok!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEMERIKSAAN_DOK",
    nullable: true,
  })
  tglPemeriksaanDok!: Date | null;

  @Column("character", {
    name: "NIP_PEMERIKSA_DOK",
    nullable: true,
    length: 30,
  })
  nipPemeriksaDok!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_PEREKAMAN_DOK",
    nullable: true,
  })
  tglPerekamanDok!: Date | null;

  @Column("character", { name: "NIP_PEREKAM_DOK", nullable: true, length: 30 })
  nipPerekamDok!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
