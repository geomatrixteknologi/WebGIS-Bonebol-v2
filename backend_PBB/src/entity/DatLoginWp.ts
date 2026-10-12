import { Column, Entity } from "typeorm";

@Entity("DAT_LOGIN_WP", { schema: "PBB_KUTAI-BARAT" })
export class DatLoginWp {
  @Column("character varying", { name: "USRNAME", length: 32 })
  usrname!: string;

  @Column("character varying", { name: "PSWUSER", length: 255 })
  pswuser!: string;

  @Column("character varying", {
    name: "FCM_TOKEN",
    nullable: true,
    length: 256,
  })
  fcmToken!: string | null;

  @Column("character", { name: "SUBJEK_PAJAK_ID", nullable: true, length: 30 })
  subjekPajakId!: string | null;

  @Column("character", { name: "KD_PROPINSI", nullable: true, length: 2 })
  kdPropinsi!: string | null;

  @Column("character", { name: "KD_DATI2", nullable: true, length: 2 })
  kdDati2!: string | null;

  @Column("character", { name: "KD_KECAMATAN", nullable: true, length: 3 })
  kdKecamatan!: string | null;

  @Column("character", { name: "KD_KELURAHAN", nullable: true, length: 3 })
  kdKelurahan!: string | null;

  @Column("character", { name: "KD_BLOK", nullable: true, length: 3 })
  kdBlok!: string | null;

  @Column("character", { name: "NO_URUT", nullable: true, length: 4 })
  noUrut!: string | null;

  @Column("character", { name: "KD_JNS_OP", nullable: true, length: 1 })
  kdJnsOp!: string | null;

  @Column("character varying", {
    name: "NAMEUSER",
    nullable: true,
    length: 100,
  })
  nameuser!: string | null;
}
