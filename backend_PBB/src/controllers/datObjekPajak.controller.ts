import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";

/**
 * Get all SPPT records with pagination
 * Refactored to use pagination to avoid memory issues with large datasets
 */
export const getAllDatObjekPajak = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "100" } = req.query;
    const spptRepository = new SpptRepository();

    // Use paginated query to avoid loading all records into memory
    const result = await spptRepository.findPaginated(
      {},
      {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      }
    );

    return res.status(200).json({
      code: 200,
      data: result.data,
      pagination: result.pagination,
      message: "Data objek pajak berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data objek pajak:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
