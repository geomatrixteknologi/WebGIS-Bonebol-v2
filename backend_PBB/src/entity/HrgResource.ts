import { Column, Entity } from "typeorm";

@Entity("HRG_RESOURCE", { schema: "PBB_KUTAI-BARAT" })
export class HrgResource {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "THN_HRG_RESOURCE", length: 4 })
  thnHrgResource!: string;

  @Column("character", { name: "KD_GROUP_RESOURCE", length: 2 })
  kdGroupResource!: string;

  @Column("character", { name: "KD_RESOURCE", length: 2 })
  kdResource!: string;

  @Column("character", { name: "KD_KANWIL", nullable: true, length: 2 })
  kdKanwil!: string | null;

  @Column("character", { name: "KD_KANTOR", nullable: true, length: 2 })
  kdKantor!: string | null;

  @Column("character", { name: "JNS_DOKUMEN", nullable: true, length: 1 })
  jnsDokumen!: string | null;

  @Column("character", { name: "NO_DOKUMEN", nullable: true, length: 11 })
  noDokumen!: string | null;

  @Column("numeric", {
    name: "HRG_RESOURCE",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  hrgResource!: string | null;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
