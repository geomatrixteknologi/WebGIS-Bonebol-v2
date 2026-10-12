import { Column, Entity } from "typeorm";

@Entity("DAT_SUBJEK_PAJAK", { schema: "PBB_KUTAI-BARAT" })
export class DatSubjekPajak {
  @Column("character", { primary: true, name: "SUBJEK_PAJAK_ID", length: 30 })
  subjekPajakId!: string;

  @Column("character varying", { name: "NM_WP", nullable: true, length: 100 })
  nmWp!: string | null;

  @Column("character varying", { name: "JALAN_WP", nullable: true, length: 30 })
  jalanWp!: string | null;

  @Column("character varying", {
    name: "BLOK_KAV_NO_WP",
    nullable: true,
    length: 15,
  })
  blokKavNoWp!: string | null;

  @Column("character", { name: "RW_WP", nullable: true, length: 3 })
  rwWp!: string | null;

  @Column("character", { name: "RT_WP", nullable: true, length: 3 })
  rtWp!: string | null;

  @Column("character varying", {
    name: "KELURAHAN_WP",
    nullable: true,
    length: 30,
  })
  kelurahanWp!: string | null;

  @Column("character varying", { name: "KOTA_WP", nullable: true, length: 30 })
  kotaWp!: string | null;

  @Column("character varying", { name: "KD_POS_WP", nullable: true, length: 5 })
  kdPosWp!: string | null;

  @Column("character varying", { name: "TELP_WP", nullable: true, length: 20 })
  telpWp!: string | null;

  @Column("character varying", { name: "NPWP", nullable: true, length: 15 })
  npwp!: string | null;

  @Column("character", {
    name: "STATUS_PEKERJAAN_WP",
    nullable: true,
    length: 1,
  })
  statusPekerjaanWp!: string | null;

  @Column("character varying", { name: "NOMOR_HP", nullable: true, length: 50 })
  nomorHp!: string | null;

  @Column("character varying", { name: "EMAIL", nullable: true, length: 50 })
  email!: string | null;
}
