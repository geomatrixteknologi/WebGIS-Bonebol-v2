import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { validateNOPInput, validateYearInput } from "../utils/validators";

// Initialize repository
const spptRepository = new SpptRepository();

export const getDetailObjekPajak = async (req: Request, res: Response) => {
  try {
    const { nop, tahun } = req.query;

    // Validate NOP
    const nopValidation = validateNOPInput(nop);
    if (!nopValidation.valid) {
      return res.status(400).json({
        code: 400,
        message: nopValidation.error,
      });
    }

    // Validate year (optional)
    let yearValue: number | undefined;
    if (tahun) {
      const yearValidation = validateYearInput(tahun);
      if (!yearValidation.valid) {
        return res.status(400).json({
          code: 400,
          message: yearValidation.error,
        });
      }
      yearValue = yearValidation.value;
    }

    // Use repository layer for data access
    let dataDetailObjekPajak;
    if (yearValue) {
      dataDetailObjekPajak = await spptRepository.findOneByNOP(nopValidation.value!, yearValue);
    } else {
      // Get latest year for this NOP
      const allRecords = await spptRepository.findByNOP(nopValidation.value!);
      if (allRecords.length > 0) {
        // Sort by year descending and get first
        allRecords.sort((a, b) => Number(b.thnPajakSppt) - Number(a.thnPajakSppt));
        dataDetailObjekPajak = allRecords[0];
      }
    }

    if (!dataDetailObjekPajak) {
      return res.status(200).json({
        code: 200,
        message: yearValue ? `Data tidak ditemukan untuk NOP ${nopValidation.value} pada tahun ${yearValue}` : "Data tidak ditemukan untuk NOP yang diberikan",
        data: null,
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Sukses",
      data: dataDetailObjekPajak,
    });
  } catch (error) {
    console.error("Error mengambil data detail NOP:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
