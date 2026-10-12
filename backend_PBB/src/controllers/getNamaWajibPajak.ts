import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { validatePagination } from "../utils/validators";

// Initialize repository
const spptRepository = new SpptRepository();

export const getNamaWajibPajak = async (req: Request, res: Response) => {
  try {
    const { namawp = "", page, limit } = req.query;

    // Validate and sanitize pagination parameters
    const pagination = validatePagination(page, limit);

    // Use repository layer for paginated taxpayer search
    const result = await spptRepository.findByTaxpayerName(namawp as string, pagination);

    // Format response
    const formatted = result.data.map((item) => ({
      nop: `${item.kdPropinsi}${item.kdDati2}${item.kdKecamatan}${item.kdKelurahan}${item.kdBlok}${item.noUrut}${item.kdJnsOp}`,
      nmWp: item.nmWpSppt,
      alamat: item.jlnWpSppt,
    }));

    return res.status(200).json({
      code: 200,
      message: "Berhasil mendapatkan data wajib pajak",
      data: formatted,
      pagination: {
        page: result.pagination.page,
        limit: result.pagination.limit,
        totalData: result.pagination.total,
        totalPage: result.pagination.totalPages,
      },
    });
  } catch (error) {
    console.error("Error mengambil data nama wajib pajak:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
