import { Column, Entity } from "typeorm";

@Entity("KONVERSI_DESIMAL", { schema: "PBB_KUTAI-BARAT" })
export class KonversiDesimal {
  @Column("character", { name: "BILANGAN_10", length: 2 })
  bilangan_10!: string;

  @Column("character", { name: "BILANGAN_62", nullable: true, length: 1 })
  bilangan_62!: string | null;
}
