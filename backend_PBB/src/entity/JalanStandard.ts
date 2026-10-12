import { Column, Entity } from "typeorm";

@Entity("JALAN_STANDARD", { schema: "PBB_KUTAI-BARAT" })
export class JalanStandard {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character varying", { name: "NM_JLN_SEMENTARA", length: 30 })
  nmJlnSementara!: string;

  @Column("character varying", {
    name: "NM_JLN_STANDARD",
    nullable: true,
    length: 30,
  })
  nmJlnStandard!: string | null;
}
