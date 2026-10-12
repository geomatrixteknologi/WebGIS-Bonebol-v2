import { Column, Entity } from "typeorm";

@Entity("REF_SEKSI", { schema: "PBB_KUTAI-BARAT" })
export class RefSeksi {
  @Column("character", { name: "KD_SEKSI", length: 2 })
  kdSeksi!: string;

  @Column("character varying", { name: "NM_SEKSI", nullable: true, length: 75 })
  nmSeksi!: string | null;

  @Column("character", { name: "NO_SRT_SEKSI", nullable: true, length: 2 })
  noSrtSeksi!: string | null;

  @Column("character varying", {
    name: "KODE_SURAT_1",
    nullable: true,
    length: 5,
  })
  kodeSurat_1!: string | null;

  @Column("character varying", {
    name: "KODE_SURAT_2",
    nullable: true,
    length: 5,
  })
  kodeSurat_2!: string | null;
}
