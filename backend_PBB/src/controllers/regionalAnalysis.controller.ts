import { Request, Response } from "express";
import { TaxCalculationService } from "../services/TaxCalculationService";
import { SpptRepository } from "../repositories/SpptRepository";
import { validateEnum, validateYearInput, validateStringInput } from "../utils/validators";
import { WilayahService } from "../services/WilayahService";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";

// Initialize repository
const spptRepository = new SpptRepository();
const refWilayahRepository = new RefWilayahRepository();
const wilayahService = new WilayahService();

// Valid breakdown types
const BREAKDOWN_TYPES = ["kecamatan", "kelurahan"] as const;

export const getRegionalBreakdown = async (req: Request, res: Response) => {
  try {
    const { year, type, kecamatan } = req.query;

    // Validate type parameter
    const typeValidation = validateEnum(type, BREAKDOWN_TYPES, "Type");
    if (!typeValidation.valid) {
      return res.status(400).json({
        code: 400,
        message: typeValidation.error,
      });
    }

    // Validate year (optional, defaults to current year)
    let yearValue = new Date().getFullYear();
    if (year) {
      const yearValidation = validateYearInput(year);
      if (!yearValidation.valid) {
        return res.status(400).json({
          code: 400,
          message: yearValidation.error,
        });
      }
      yearValue = yearValidation.value!;
    }

    // Use repository layer for data access
    let rawData;
    if (typeValidation.value === "kecamatan") {
      rawData = await spptRepository.getRegionalBreakdown(yearValue);
    } else {
      // kelurahan - requires kecamatan parameter
      const kecamatanValidation = validateStringInput(kecamatan, "Kecamatan");
      if (!kecamatanValidation.valid) {
        return res.status(400).json({
          code: 400,
          message: kecamatanValidation.error,
        });
      }
      rawData = await spptRepository.getKelurahanBreakdown(yearValue, kecamatanValidation.value!);
    }

    // Transform repository data to match service layer expectations
    const transformedData = rawData.map((item) => ({
      region: typeValidation.value === "kecamatan" ? item.kecamatan! : item.kelurahan!,
      target: item.target,
      realization: item.realization,
      paidCount: item.paidNop,
      unpaidCount: item.totalNop - item.paidNop,
      totalCount: item.totalNop,
    }));

    // Use service layer for regional data processing
    const regionalData = TaxCalculationService.processRegionalData(transformedData);

    return res.status(200).json({
      code: 200,
      data: regionalData,
      message: `Data regional ${typeValidation.value} berhasil diambil`,
    });
  } catch (error) {
    console.error("Error mengambil data regional:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getAvailableYears = async (req: Request, res: Response) => {
  try {
    // Use repository layer for data access
    const years = await spptRepository.getAvailableYears();

    return res.status(200).json({
      code: 200,
      data: years,
      message: "Daftar tahun pajak berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil daftar tahun:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getKecamatanList = async (req: Request, res: Response) => {
  try {
    // Use repository layer with query builder for distinct kecamatan
    const rawData = await refWilayahRepository.createQueryBuilder("kec").select("kec.nmKecamatan", "kecamatan").orderBy("kec.nmKecamatan", "ASC").getRawMany();

    // Use service layer for filtering invalid regions
    const kecamatanList = TaxCalculationService.filterValidRegionNames(rawData.map((item) => item.kecamatan));

    return res.status(200).json({
      code: 200,
      data: kecamatanList,
      message: "Daftar kecamatan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil daftar kecamatan:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getKelurahanList = async (req: Request, res: Response) => {
  try {
    const { kecamatan } = req.query;

    const result = await wilayahService.getKelurahanListByKecamatan(kecamatan as string);

    return res.status(200).json({
      code: 200,
      data: result,
      message: "Daftar kelurahan berhasil diambil",
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
