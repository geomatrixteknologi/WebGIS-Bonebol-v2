import { Column, Entity } from "typeorm";

@Entity("REF_KANTOR", { schema: "PBB_KUTAI-BARAT" })
export class RefKantor {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character varying", {
    name: "NM_KANTOR",
    nullable: true,
    length: 30,
  })
  nmKantor!: string | null;

  @Column("character varying", {
    name: "AL_KANTOR",
    nullable: true,
    length: 100,
  })
  alKantor!: string | null;

  @Column("character varying", {
    name: "KOTA_TERBIT",
    nullable: true,
    length: 30,
  })
  kotaTerbit!: string | null;

  @Column("character varying", {
    name: "NO_FAKSIMILI",
    nullable: true,
    length: 50,
  })
  noFaksimili!: string | null;

  @Column("character varying", {
    name: "NO_TELPON",
    nullable: true,
    length: 50,
  })
  noTelpon!: string | null;
}
