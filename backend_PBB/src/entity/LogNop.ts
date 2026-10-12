import { Column, Entity } from "typeorm";

@Entity("LOG_NOP", { schema: "PBB_KUTAI-BARAT" })
export class LogNop {
  @Column("character varying", {
    name: "NOP_PENDATAAN",
    nullable: true,
    length: 18,
  })
  nopPendataan!: string | null;

  @Column("character varying", {
    name: "NOP_HASIL",
    nullable: true,
    length: 24,
  })
  nopHasil!: string | null;

  @Column("character varying", { name: "NOFOR", nullable: true, length: 13 })
  nofor!: string | null;
}
