// Backend PBB
export interface SpptData {
  kdPropinsi: string;
  kdDati2: string;
  kdKecamatan: string;
  kdKelurahan: string;
  kdBlok: string;
  noUrut: string;
  kdJnsOp: string;
  statusPembayaranSppt: string;
}

export interface DatOpBumiData {
  kdPropinsi: string;
  kdDati2: string;
  kdKecamatan: string;
  kdKelurahan: string;
  kdBlok: string;
  noUrut: string;
  kdJnsOp: string;
  noBumi: number;
  kdZnt: string;
  luasBumi: string;
  jnsBumi: string;
  nilaiSistemBumi: string;
}

export interface Kecamatan {
  kdKecamatan: string;
  nmKecamatan: string;
}

export interface Kelurahan {
  kdKecamatan: string;
  kdKelurahan: string;
  nmKelurahan: string;
}

export interface LandData {
  kdPropinsi: string;
  kdDati2: string;
  kdKecamatan: string;
  kdKelurahan: string;
  kdBlok: string;
  noUrut: string;
  kdJnsOp: string;
  subjekPajakId: string;
  noFormulirSpop: string;
  noPersil: string | null;
  jalanOp: string;
  blokKavNoOp: string | null;
  rwOp: string | null;
  rtOp: string | null;
  kdStatusCabang: number;
  kdStatusWp: string;
  totalLuasBumi: string;
  totalLuasBng: string;
  njopBumi: string;
  njopBng: string;
  statusPetaOp: number;
  jnsTransaksiOp: string;
  tglPendataanOp: Date;
  nipPendata: string;
  tglPemeriksaanOp: Date;
  nipPemeriksaOp: string;
  tglPerekamanOp: Date;
  nipPerekamOp: string;
}

// PbbSppt entity interface based on backend structure
export interface PbbSpptData {
  kdPropinsi: string;
  kdDati2: string;
  kdKecamatan: string;
  kdKelurahan: string;
  kdBlok: string;
  noUrut: string;
  kdJnsOp: string;
  thnPajakSppt: string;
  siklusSppt: string;
  kdKanwil: string;
  kdKantor: string;
  kdTp: string;
  nmWpSppt: string;
  jlnWpSppt: string;
  blokKavNoWpSppt: string | null;
  rwWpSppt: string;
  rtWpSppt: string;
  kelurahanWpSppt: string;
  kotaWpSppt: string;
  kdPosWpSppt: string | null;
  npwpSppt: string;
  noPersilSppt: string | null;
  kdKlsTanah: string;
  thnAwalKlsTanah: string;
  kdKlsBng: string;
  thnAwalKlsBng: string;
  tglJatuhTempoSppt: string;
  luasBumiSppt: number;
  luasBngSppt: number;
  njopBumiSppt: number;
  njopBngSppt: number;
  njopSppt: number;
  njoptkpSppt: string;
  pbbTerhutangSppt: string;
  faktorPengurangSppt: string;
  pbbYgHarusDibayarSppt: number;
  statusPembayaranSppt: string;
  statusTagihanSppt: string;
  statusCetakSppt: string;
  tglTerbitSppt: string;
  tglCetakSppt: string;
  nipPencetakSppt: string;
  noRef: string | null;
  jmlRef: string | null;
  persenNjkp: string;
  statusH2H: string | null;
  tglUpdateSppt: string | null;
  njkpSppt: string | null;
  kdBankPersepsi: string | null;
  kdBankTunggal: string | null;
  kdKppbbBank: string | null;
  kdKanwilBank: string | null;
  flgBayarPokok: string | null;
  jmlKrgBayar: string | null;
  statusPekerjaanWp: string | null;
  terseleksi: string | null;
  kelapaSawit: string;
  tglPiutang: string | null;
}
