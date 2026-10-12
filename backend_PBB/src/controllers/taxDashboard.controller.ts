import { Request, Response } from "express";
import { TaxCalculationService } from "../services/TaxCalculationService";
import { SpptRepository } from "../repositories/SpptRepository";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";

// Initialize repository
const spptRepository = new SpptRepository();
const refWilayahRepository = new RefWilayahRepository();

export const getTaxDashboardSummary = async (req: Request, res: Response) => {
  try {
    const { kecamatan } = req.query;

    let kdKecamatan: string;

    // ==============================
    // ⚡ 1. Jika pilih "all"
    // ==============================
    if (kecamatan === "all") {
      kdKecamatan = "all";
    }
    // ==============================
    // ⚡ 2. Jika pilih nama kecamatan → ambil kode kecamatan
    // ==============================
    else {
      const kecData = await refWilayahRepository.findKecamatanByName(kecamatan as string);

      if (!kecData) {
        return res.status(404).json({
          code: 404,
          message: "Nama kecamatan tidak ditemukan",
        });
      }

      kdKecamatan = kecData.KDKECAMATAN; // penting!
    }

    // Use repository layer for data access
    const rawData = await spptRepository.getYearSummaries(kdKecamatan as string);

    // Use service layer for data processing
    const dashboardData = rawData.map((item) => ({
      year: item.year,
      target: TaxCalculationService.parseNumeric(item.target),
      realization: TaxCalculationService.parseNumeric(item.realization),
      paidCount: TaxCalculationService.parseInteger(item.paidCount),
      unpaidCount: TaxCalculationService.parseInteger(item.unpaidCount),
    }));

    return res.status(200).json({
      code: 200,
      data: dashboardData,
      // test: kecamatan,
      message: "Data dashboard pajak berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data dashboard:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
