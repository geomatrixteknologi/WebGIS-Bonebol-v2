import { Request, Response } from "express";
import { TaxCalculationService } from "../services/TaxCalculationService";
import { SpptRepository } from "../repositories/SpptRepository";

// Initialize repository
const spptRepository = new SpptRepository();

export const getCollectionTrends = async (req: Request, res: Response) => {
  try {
    // Use repository layer for data access
    const rawData = await spptRepository.getYearSummaries();

    // Use service layer for trend processing
    const trendsData = TaxCalculationService.processTrendData(rawData);
    const summary = TaxCalculationService.calculateTrendSummary(trendsData);

    return res.status(200).json({
      code: 200,
      data: {
        trends: trendsData,
        summary,
      },
      message: "Data tren efisiensi penagihan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data tren efisiensi:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
