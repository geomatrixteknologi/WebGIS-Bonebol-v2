import { Column, Entity } from "typeorm";

@Entity("REF_DATI2", { schema: "PBB_KUTAI-BARAT" })
export class RefDati2 {
  @Column("character", { primary: true, name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { primary: true, name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character varying", { name: "NM_DATI2", nullable: true, length: 30 })
  nmDati2!: string | null;
}
