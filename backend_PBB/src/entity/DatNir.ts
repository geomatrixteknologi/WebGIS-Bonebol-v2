import { Column, Entity } from "typeorm";

@Entity("DAT_NIR", { schema: "PBB_KUTAI-BARAT" })
export class DatNir {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { primary: true, name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { primary: true, name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { primary: true, name: "KD_ZNT", length: 2 })
  kdZnt!: string;

  @Column("character", { primary: true, name: "THN_NIR_ZNT", length: 4 })
  thnNirZnt!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "JNS_DOKUMEN", nullable: true, length: 1 })
  jnsDokumen!: string | null;

  @Column("character", { name: "NO_DOKUMEN", nullable: true, length: 11 })
  noDokumen!: string | null;

  @Column("numeric", { name: "NIR", nullable: true, precision: 12, scale: 2 })
  nir!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
