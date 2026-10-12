import { Column, Entity } from "typeorm";

@Entity("PERUBAHAN_NOP", { schema: "PBB_KUTAI-BARAT" })
export class PerubahanNop {
  @Column("character", { name: "KD_PROPINSI", length: 2 })
  kdPropinsi!: string;

  @Column("character", { name: "KD_DATI2", length: 2 })
  kdDati2!: string;

  @Column("character", { name: "KD_KECAMATAN", length: 3 })
  kdKecamatan!: string;

  @Column("character", { name: "KD_KELURAHAN", length: 3 })
  kdKelurahan!: string;

  @Column("character", { name: "KD_BLOK", length: 3 })
  kdBlok!: string;

  @Column("character", { name: "NO_URUT", length: 4 })
  noUrut!: string;

  @Column("character", { name: "KD_JNS_OP", length: 1 })
  kdJnsOp!: string;

  @Column("timestamp without time zone", { name: "TGL_PERUBAHAN_NOP" })
  tglPerubahanNop!: Date;

  @Column("character", { name: "KD_PROPINSI_ASAL", nullable: true, length: 2 })
  kdPropinsiAsal!: string | null;

  @Column("character", { name: "KD_DATI2_ASAL", nullable: true, length: 2 })
  kdDati2Asal!: string | null;

  @Column("character", { name: "KD_KECAMATAN_ASAL", nullable: true, length: 3 })
  kdKecamatanAsal!: string | null;

  @Column("character", { name: "KD_KELURAHAN_ASAL", nullable: true, length: 3 })
  kdKelurahanAsal!: string | null;

  @Column("character", { name: "KD_BLOK_ASAL", nullable: true, length: 3 })
  kdBlokAsal!: string | null;

  @Column("character", { name: "NO_URUT_ASAL", nullable: true, length: 4 })
  noUrutAsal!: string | null;

  @Column("character", { name: "KD_JNS_OP_ASAL", nullable: true, length: 1 })
  kdJnsOpAsal!: string | null;

  @Column("character", { name: "NIP_PERUBAH_NOP", nullable: true, length: 30 })
  nipPerubahNop!: string | null;

  @Column("numeric", {
    name: "STATUS_PERUBAHAN_NOP",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  statusPerubahanNop!: string | null;

  @Column("character varying", {
    name: "ID_PROSES",
    nullable: true,
    length: 17,
  })
  idProses!: string | null;
}
