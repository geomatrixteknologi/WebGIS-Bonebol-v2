import { Column, Entity } from "typeorm";

@Entity("REF_KANWIL", { schema: "PBB_KUTAI-BARAT" })
export class RefKanwil {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character varying", {
    name: "NM_KANWIL",
    nullable: true,
    length: 30,
  })
  nmKanwil!: string | null;

  @Column("character varying", {
    name: "AL_KANWIL",
    nullable: true,
    length: 100,
  })
  alKanwil!: string | null;

  @Column("character varying", {
    name: "KOTA_TERBIT_KANWIL",
    nullable: true,
    length: 30,
  })
  kotaTerbitKanwil!: string | null;

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
