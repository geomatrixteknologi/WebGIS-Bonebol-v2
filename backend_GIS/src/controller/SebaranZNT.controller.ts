import { Request, Response } from "express";
import { AppDataSource } from "../data-resource";
import { BatasPersil } from "../entity/entities/BatasPersil";
import { IsNull, Not } from "typeorm";
import axios from "axios";
import { ColorInterpolationService } from "../services/ColorInterpolationService";

interface ExternalData {
  kdpropinsi: string;
  kddati2: string;
  kdkecamatan: string;
  kdkelurahan: string;
  kdblok: string;
  nourut: string;
  kdjnsop: string;
  rwop: string;
  rtop: string;
  totalluasbumi: string;
  totalluasbng: string;
  njopbumi: string;
  njopbng: string;
  kdznt: string;
  nir: string;
  wajibpajak: string;
}

export const getSebaranZNT = async (req: Request, res: Response) => {
  try {
    const kdkec = String(req.query.kdkec);
    const kdkel = String(req.query.kdkel);
    const tahun = String(req.query.tahun);

    // Ambil data batas ZNT dari database
    const batasZntRepo = AppDataSource.getRepository(BatasPersil);

    const dataSebaranZnt = await batasZntRepo.find({
      where: {
        KD_KEC: kdkec,
        KD_KEL: kdkel,
        NO_URUT: Not(IsNull()),
      },
    });

    if (!dataSebaranZnt || dataSebaranZnt.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "Persil tidak ditemukan di database",
      });
    }

    // Ambil data eksternal dengan Timeout (5 detik)
    const externalApiUrl = `${process.env.NEXT_PUBLIC_PBB_API_URL}/api/retrieve/sebaranzntdataobjekpajak?tahun=${tahun}&kdkec=${kdkec}&kdkel=${kdkel}`;

    const externalResponse = await axios.get<{ data?: ExternalData[] }>(externalApiUrl, { timeout: 5000 });

    let externalData: ExternalData[] = [];

    if (Array.isArray(externalResponse.data)) {
      externalData = externalResponse.data;
    } else if (Array.isArray(externalResponse.data.data)) {
      externalData = externalResponse.data.data;
    } else {
      console.error("Format response API tidak sesuai:", externalResponse.data);
      return res.status(500).json({
        code: 500,
        message: "Format response API tidak sesuai",
      });
    }

    // Buat Hash Map untuk pencarian cepat
    const externalMap = new Map<string, ExternalData>();
    externalData.forEach((item) => {
      const key = `${item.kdpropinsi}-${item.kddati2}-${item.kdkecamatan}-${item.kdkelurahan}-${item.kdblok}-${item.nourut}-${item.kdjnsop}`;
      externalMap.set(key, item);
    });

    // Use service layer for color interpolation
    const nirValues = ColorInterpolationService.parseNumericValues(
      externalData.map((d) => d.nir)
    );

    const { min: minNir, max: maxNir } = ColorInterpolationService.findMinMax(nirValues);

    // Gabungkan data dari database dan API eksternal
    const matchedData = dataSebaranZnt
      .map((item) => {
        const key = `${item.KD_PROV}-${item.KD_KAB}-${item.KD_KEC}-${item.KD_KEL}-${item.KD_BLOK}-${item.NO_URUT}-${item.KD_JNS_OP}`;
        const externalItem = externalMap.get(key);

        if (!externalItem) return null;

        const nirVal = parseFloat(externalItem.nir);
        return {
          id: item.id,
          geom: item.geom,
          foto_persil: item.FOTO_PERSIL, // Tambahkan foto persil jika ada
          kdPropinsi: item.KD_PROV,
          kdDati2: item.KD_KAB,
          kdKecamatan: item.KD_KEC,
          kdKelurahan: item.KD_KEL,
          kdBlok: item.KD_BLOK,
          noUrut: item.NO_URUT,
          kdJnsOp: item.KD_JNS_OP,
          rwOp: externalItem?.rwop || null,
          rtOp: externalItem?.rtop || null,
          totalLuasBumi: externalItem?.totalluasbumi || null,
          totalLuasBng: externalItem?.totalluasbng || null,
          njopBumi: externalItem?.njopbumi || null,
          njopBng: externalItem?.njopbng || null,
          kdZnt: externalItem?.kdznt || null,
          nir: externalItem?.nir || null,
          wajibPajak: externalItem?.wajibpajak || null,
          warna_persil: ColorInterpolationService.getColorWithFallback(nirVal, minNir, maxNir, "#CCC"),
        };
      })
      .filter(
        (item) =>
          item &&
          item.rwOp !== null &&
          item.rtOp !== null &&
          item.totalLuasBumi !== null &&
          item.totalLuasBng !== null &&
          item.njopBumi !== null &&
          item.njopBng !== null &&
          item.kdZnt !== null &&
          item.nir !== null &&
          item.wajibPajak !== null
      );

    // Use service layer for legend generation
    const uniqueZntMap = new Map<string, number>();
    externalData.forEach((item) => {
      const nirVal = parseFloat(item.nir);
      if (!isNaN(nirVal) && !uniqueZntMap.has(item.kdznt)) {
        uniqueZntMap.set(item.kdznt, nirVal);
      }
    });

    const legendaSebaranZnt = Array.from(uniqueZntMap.entries())
      .map(([kdZnt, nirVal]) => ({
        kdZnt,
        nir: nirVal.toString(),
        warna: ColorInterpolationService.interpolateColor(nirVal, minNir, maxNir),
      }))
      .sort((a, b) => parseFloat(b.nir) - parseFloat(a.nir));

    return res.status(200).json({
      code: 200,
      data: matchedData,
      legenda: legendaSebaranZnt,
      message: "Data yang cocok berhasil ditemukan",
    });
  } catch (error) {
    console.error("Error mengambil data batas ZNT dari tahun:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
