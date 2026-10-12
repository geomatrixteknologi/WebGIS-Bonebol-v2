import { Column, Entity, Index } from "typeorm";

@Index("TEMP_MAX_BUNDEL_PK", ["kdKantor", "kdKanwil", "tempNoBundel", "tempThnBundel", "tempUrutBundel"], { unique: true })
@Entity("TEMP_MAX_BUNDEL", { schema: "PBB_KUTAI-BARAT" })
export class TempMaxBundel {
  @Column("character", { primary: true, name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { primary: true, name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { primary: true, name: "TEMP_THN_BUNDEL", length: 4 })
  tempThnBundel!: string;

  @Column("character", { primary: true, name: "TEMP_NO_BUNDEL", length: 4 })
  tempNoBundel!: string;

  @Column("character", { primary: true, name: "TEMP_URUT_BUNDEL", length: 3 })
  tempUrutBundel!: string;

  @Column("character", { name: "KD_KPPBB", nullable: true, length: 2 })
  kdKppbb!: string | null;
}
