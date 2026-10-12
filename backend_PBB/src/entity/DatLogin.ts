import { Column, Entity } from "typeorm";

@Entity("DAT_LOGIN", { schema: "PBB_KUTAI-BARAT" })
export class DatLogin {
  @Column("character varying", { name: "NM_LOGIN", length: 18 })
  nmLogin!: string;

  @Column("character", { name: "NIP", nullable: true, length: 30 })
  nip!: string | null;

  @Column("character varying", { name: "PASSWORD", nullable: true, length: 50 })
  password!: string | null;

  @Column("character varying", { name: "ROLE_ID", nullable: true, length: 5 })
  roleId!: string | null;

  @Column("character", { name: "KD_TP", nullable: true, length: 4 })
  kdTp!: string | null;

  @Column("character", { name: "KD_LP", nullable: true, length: 4 })
  kdLp!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", {
    name: "KD_TEMPAT_PELAYANAN",
    nullable: true,
    length: 2,
  })
  kdTempatPelayanan!: string | null;
}
