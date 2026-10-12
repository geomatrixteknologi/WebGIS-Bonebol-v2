import { Column, Entity } from "typeorm";

@Entity("REF_UPB", { schema: "PBB_KUTAI-BARAT" })
export class RefUpb {
  @Column("character", { name: "KD_PEBIN", length: 2 })
  kdPebin!: string;

  @Column("character", { name: "KD_PBI", length: 2 })
  kdPbi!: string;

  @Column("character", { name: "KD_PPBI", length: 2 })
  kdPpbi!: string;

  @Column("character", { name: "KD_UPB", length: 6 })
  kdUpb!: string;

  @Column("character varying", { name: "NM_UPB", nullable: true, length: 50 })
  nmUpb!: string | null;

  @Column("character varying", {
    name: "JALAN_UPB",
    nullable: true,
    length: 30,
  })
  jalanUpb!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_UPB",
    nullable: true,
    length: 15,
  })
  blokKavNoUpb!: string | null;

  @Column("character varying", { name: "RW_UPB", nullable: true, length: 2 })
  rwUpb!: string | null;

  @Column("character varying", { name: "RT_UPB", nullable: true, length: 3 })
  rtUpb!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_UPB",
    nullable: true,
    length: 30,
  })
  kelurahanUpb!: string | null;

  @Column("character varying", { name: "KOTA_UPB", nullable: true, length: 30 })
  kotaUpb!: string | null;
}
