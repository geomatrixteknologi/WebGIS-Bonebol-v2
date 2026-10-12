import { Request, Response } from "express";
import { invalidateTileCache, getLastInvalidated } from "../utils/tileCache";

export const invalidateCache = async (req: Request, res: Response) => {
  try {
    const deleted = await invalidateTileCache();
    const lastRefreshed = await getLastInvalidated();
    return res.status(200).json({
      code: 200,
      message: "Cache berhasil diperbarui",
      data: { invalidated: deleted, lastRefreshed },
    });
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return res.status(500).json({
      code: 500,
      message: "Gagal memperbarui cache",
    });
  }
};

export const getCacheStatus = async (req: Request, res: Response) => {
  try {
    const lastRefreshed = await getLastInvalidated();
    return res.status(200).json({
      code: 200,
      data: { lastRefreshed },
    });
  } catch (error) {
    console.error("Error fetching cache status:", error);
    return res.status(500).json({
      code: 500,
      message: "Gagal mengambil status cache",
    });
  }
};
