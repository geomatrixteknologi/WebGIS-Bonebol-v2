import { Column, Entity } from "typeorm";

@Entity("DISKON", { schema: "PBB_KUTAI-BARAT" })
export class Diskon {
  @Column("character", { name: "THN_PAJAK", nullable: true, length: 4 })
  thnPajak!: string | null;

  @Column("character", { name: "DISKON_DENDA", nullable: true, length: 3 })
  diskonDenda!: string | null;

  @Column("character", { name: "AKTIF", nullable: true, length: 1 })
  aktif!: string | null;

  @Column("timestamp without time zone", { name: "MULAI", nullable: true })
  mulai!: Date | null;

  @Column("timestamp without time zone", { name: "SELESAI", nullable: true })
  selesai!: Date | null;
}
