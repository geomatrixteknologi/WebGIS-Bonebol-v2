import { Column, Entity } from "typeorm";

@Entity("DAT_FILE", { schema: "PBB_KUTAI-BARAT" })
export class DatFile {
  @Column("character", { name: "THN_BUNDEL", length: 4 })
  thnBundel!: string;

  @Column("character", { name: "NO_BUNDEL", length: 4 })
  noBundel!: string;

  @Column("character", { name: "NO_URUT_BUNDEL", length: 3 })
  noUrutBundel!: string;

  @Column("character varying", { name: "URL", length: 500 })
  url!: string;

  @Column("character varying", { name: "EXTENSION", length: 255 })
  extension!: string;

  @Column("character varying", { name: "ID_LAMPIRAN", length: 255 })
  idLampiran!: string;
}
