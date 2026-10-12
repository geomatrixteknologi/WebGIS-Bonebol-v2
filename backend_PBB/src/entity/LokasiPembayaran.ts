import { Column, Entity } from "typeorm";

@Entity("LOKASI_PEMBAYARAN", { schema: "PBB_KUTAI-BARAT" })
export class LokasiPembayaran {
  @Column("character", { name: "KD_KANWIL", length: 2 })
  kdKanwil!: string;

  @Column("character", { name: "KD_KANTOR", length: 2 })
  kdKantor!: string;

  @Column("character varying", { name: "KD_LP", length: 10 })
  kdLp!: string;

  @Column("character varying", { name: "NAMA_LP", nullable: true, length: 30 })
  namaLp!: string | null;

  @Column("character varying", {
    name: "ALAMAT_LP",
    nullable: true,
    length: 50,
  })
  alamatLp!: string | null;

  @Column("character varying", {
    name: "NO_REK_LP",
    nullable: true,
    length: 15,
  })
  noRekLp!: string | null;
}
