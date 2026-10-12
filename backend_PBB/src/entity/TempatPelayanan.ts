import { Column, Entity, Index } from "typeorm";

@Index("TEMPAT_PELAYANAN_PK", ["kdTempatPelayanan"], { unique: true })
@Entity("TEMPAT_PELAYANAN", { schema: "PBB_KUTAI-BARAT" })
export class TempatPelayanan {
  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 2,
  })
  kdTempatPelayanan!: string | null;

  @Column("character varying", {
    name: "NM_TEMPAT_PELAYANAN",
    nullable: true,
    length: 150,
  })
  nmTempatPelayanan!: string | null;

  @Column("character varying", {
    name: "ALAMAT_TEMPAT_PELAYANAN",
    nullable: true,
    length: 150,
  })
  alamatTempatPelayanan!: string | null;
}
