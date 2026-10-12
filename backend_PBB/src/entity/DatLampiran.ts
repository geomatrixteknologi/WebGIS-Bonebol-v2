import { Column, Entity } from "typeorm";

@Entity("DAT_LAMPIRAN", { schema: "PBB_KUTAI-BARAT" })
export class DatLampiran {
  @Column("character varying", { name: "ID_LAMPIRAN", length: 255 })
  idLampiran!: string;

  @Column("character varying", {
    name: "NM_LAMPIRAN",
    nullable: true,
    length: 100,
  })
  nmLampiran!: string | null;

  @Column("character", { name: "REQUIRED", nullable: true, length: 1 })
  required!: string | null;

  @Column("character", { name: "JENIS", nullable: true, length: 1 })
  jenis!: string | null;

  @Column("character varying", { name: "NAME_LAMPIRAN", length: 100 })
  nameLampiran!: string;

  @Column("character", { name: "URUTAN", length: 2 })
  urutan!: string;
}
