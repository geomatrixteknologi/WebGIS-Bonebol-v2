import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { OverdueAnalysisService } from "../services/OverdueAnalysisService";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";

const refWilayahRepository = new RefWilayahRepository();
const fullNopExpression = (alias: string): string => {
  // <-- GUNAKAN SINTAKS FUNGSI PANAH
  return `CONCAT(${alias}."KD_PROPINSI", ${alias}."KD_DATI2", ${alias}."KD_KECAMATAN", ${alias}."KD_KELURAHAN", ${alias}."KD_BLOK", ${alias}."NO_URUT", ${alias}."KD_JNS_OP")`;
};

const spptNop = fullNopExpression("sppt");

export const getOverdueSummary = async (req: Request, res: Response) => {
  try {
    const { year, kecamatan, kelurahan } = req.query;
    const spptRepository = new SpptRepository();

    // Only resolve codes when an actual filter is requested. AI Copilot calls
    // this endpoint with no kecamatan/kelurahan for the "all" briefing.
    const hasKecFilter = kecamatan && kecamatan !== "all";
    const hasKelFilter = kelurahan && kelurahan !== "all";

    const transform_kode_kecamatan = hasKecFilter
      ? await refWilayahRepository.findKecamatanByName(kecamatan as string)
      : null;
    let transform_kode_kelurahan = null;
    if (hasKelFilter) {
      if (transform_kode_kecamatan) {
        transform_kode_kelurahan = await refWilayahRepository.findKdKelurahan(
          transform_kode_kecamatan.KDKECAMATAN,
          kelurahan as string
        );
      } else {
        transform_kode_kelurahan = await refWilayahRepository.findKelurahanByName(
          kelurahan as string
        );
      }
    }

    const kode_kecamatan = transform_kode_kecamatan?.KDKECAMATAN ?? transform_kode_kelurahan?.KDKECAMATAN;
    const kode_kelurahan = transform_kode_kelurahan?.kdkelurahan;

    const unpaidRecords = await spptRepository.getOverdueRecordsOptimized({
      year: year as string,
      kecamatan: kode_kecamatan as string,
      kelurahan: kode_kelurahan as string,
    });

    const nopMap = OverdueAnalysisService.aggregateByNop(unpaidRecords, {}, null);

    const processedData = OverdueAnalysisService.processOverdueRecords(nopMap);
    const bySeverity = OverdueAnalysisService.groupBySeverity(processedData);
    const byRegion = OverdueAnalysisService.aggregateByRegion(processedData);
    const { totalAmount, totalPenalty } = OverdueAnalysisService.calculateTotals(processedData);

    return res.status(200).json({
      code: 200,
      data: {
        totalOverdue: processedData.length,
        totalAmount,
        totalPenalty,
        bySeverity,
        byRegion,
      },
      message: "Data ringkasan tunggakan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data ringkasan tunggakan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getOverdueList = async (req: Request, res: Response) => {
  try {
    const { year, kecamatan, kelurahan, severity, page = "1", limit = "10", sortBy = "daysOverdue", sortOrder = "DESC" } = req.query;

    const spptRepository = new SpptRepository();

    const hasKecFilter = kecamatan && kecamatan !== "all";
    const hasKelFilter = kelurahan && kelurahan !== "all";

    const transform_kode_kecamatan = hasKecFilter
      ? await refWilayahRepository.findKecamatanByName(kecamatan as string)
      : null;
    // Resolve kelurahan: prefer kec+kel pair, but fall back to kelurahan-only
    // search when the AI Copilot doesn't know which kecamatan it belongs to.
    let transform_kode_kelurahan = null;
    if (hasKelFilter) {
      if (transform_kode_kecamatan) {
        transform_kode_kelurahan = await refWilayahRepository.findKdKelurahan(
          transform_kode_kecamatan.KDKECAMATAN,
          kelurahan as string
        );
      } else {
        transform_kode_kelurahan = await refWilayahRepository.findKelurahanByName(
          kelurahan as string
        );
      }
    }

    const kode_kecamatan = transform_kode_kecamatan?.KDKECAMATAN ?? transform_kode_kelurahan?.KDKECAMATAN;
    const kode_kelurahan = transform_kode_kelurahan?.kdkelurahan;

    const unpaidRecords = await spptRepository.getOverdueRecordsOptimized({
      year: year as string,
      kecamatan: kode_kecamatan as string,
      kelurahan: kode_kelurahan as string,
    });

    const nopMap = OverdueAnalysisService.aggregateByNop(unpaidRecords, {}, null);

    let processedData = OverdueAnalysisService.processOverdueRecords(nopMap);

    processedData = OverdueAnalysisService.filterBySeverity(processedData, severity as string);

    processedData = OverdueAnalysisService.sortRecords(processedData, sortBy as string, sortOrder as string);

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const paginatedData = OverdueAnalysisService.paginateRecords(processedData, pageNum, limitNum);
    const totalPages = OverdueAnalysisService.calculateTotalPages(processedData.length, limitNum);

    return res.status(200).json({
      code: 200,
      data: {
        records: paginatedData,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalRecords: processedData.length,
          limit: limitNum,
        },
      },
      message: "Data daftar tunggakan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data daftar tunggakan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getOverdueRegional = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const spptRepository = new SpptRepository();

    const unpaidRecords = await spptRepository.getOverdueRecordsOptimized({
      year: year as string,
    });

    const nopMap = OverdueAnalysisService.aggregateByNop(unpaidRecords, {}, null);

    const processedData = OverdueAnalysisService.processOverdueRecords(nopMap);
    const byKecamatan = OverdueAnalysisService.aggregateByRegionWithSeverity(processedData);

    return res.status(200).json({
      code: 200,
      data: {
        byKecamatan,
      },
      message: "Data regional tunggakan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data regional tunggakan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
