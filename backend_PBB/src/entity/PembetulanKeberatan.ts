import { Column, Entity } from "typeorm";

@Entity("PEMBETULAN_KEBERATAN", { schema: "PBB_KUTAI-BARAT" })
export class PembetulanKeberatan {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character", { name: "THN_PELAYANAN", length: 4 })
  thnPelayanan!: string;

  @Column("character", { name: "BUNDEL_PELAYANAN", length: 4 })
  bundelPelayanan!: string;

  @Column("character", { name: "NO_URUT_PELAYANAN", length: 3 })
  noUrutPelayanan!: string;

  @Column("character", { name: "KD_PROPINSI_PEMOHON", length: 2 })
  kdPropinsiPemohon!: string;

  @Column("character", { name: "KD_DATI2_PEMOHON", length: 2 })
  kdDati2Pemohon!: string;

  @Column("character", { name: "KD_KECAMATAN_PEMOHON", length: 3 })
  kdKecamatanPemohon!: string;

  @Column("character", { name: "KD_KELURAHAN_PEMOHON", length: 3 })
  kdKelurahanPemohon!: string;

  @Column("character", { name: "KD_BLOK_PEMOHON", length: 3 })
  kdBlokPemohon!: string;

  @Column("character", { name: "NO_URUT_PEMOHON", length: 4 })
  noUrutPemohon!: string;

  @Column("character", { name: "KD_JNS_OP_PEMOHON", length: 1 })
  kdJnsOpPemohon!: string;

  @Column("character", {
    name: "THN_PELAYANAN_KEB_KBRT",
    nullable: true,
    length: 4,
  })
  thnPelayananKebKbrt!: string | null;

  @Column("character", {
    name: "BUNDEL_PELAYANAN_KEP_KBRT",
    nullable: true,
    length: 4,
  })
  bundelPelayananKepKbrt!: string | null;

  @Column("character", {
    name: "NO_URUT_PELAYANAN_KEP_KBRT",
    nullable: true,
    length: 3,
  })
  noUrutPelayananKepKbrt!: string | null;

  @Column("character", { name: "JNS_SK", nullable: true, length: 1 })
  jnsSk!: string | null;

  @Column("character", { name: "NO_SK", nullable: true, length: 100 })
  noSk!: string | null;

  @Column("character", { name: "KD_KLS_TANAH", nullable: true, length: 3 })
  kdKlsTanah!: string | null;

  @Column("character", {
    name: "THN_AWAL_KLS_TANAH",
    nullable: true,
    length: 4,
  })
  thnAwalKlsTanah!: string | null;

  @Column("character", { name: "KD_KLS_BNG", nullable: true, length: 3 })
  kdKlsBng!: string | null;

  @Column("character", { name: "THN_AWAL_KLS_BNG", nullable: true, length: 4 })
  thnAwalKlsBng!: string | null;

  @Column("numeric", {
    name: "LUAS_BUMI_PEMBETULAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBumiPembetulan!: string | null;

  @Column("numeric", {
    name: "LUAS_BNG_PEMBETULAN",
    nullable: true,
    precision: 12,
    scale: 0,
  })
  luasBngPembetulan!: string | null;

  @Column("numeric", {
    name: "NJOP_BUMI_PEMBETULAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBumiPembetulan!: string | null;

  @Column("numeric", {
    name: "NJOP_BNG_PEMBETULAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  njopBngPembetulan!: string | null;

  @Column("numeric", {
    name: "PBB_PEMBETULAN",
    nullable: true,
    precision: 15,
    scale: 0,
  })
  pbbPembetulan!: string | null;

  @Column("timestamp without time zone", {
    name: "TGL_CETAK_PEMBETULAN",
    nullable: true,
  })
  tglCetakPembetulan!: Date | null;

  @Column("character", {
    name: "NIP_PENCETAK_PEMBETULAN",
    nullable: true,
    length: 30,
  })
  nipPencetakPembetulan!: string | null;
}
