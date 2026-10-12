import { Request, Response } from "express";
import { BatasPersilRepository } from "../repositories/BatasPersilRepository";

// Initialize repository
const batasPersilRepo = new BatasPersilRepository();

export const getBatasPersilbyNOP = async (req: Request, res: Response) => {
  try {
    const nop = String(req.query.nop);

    // Use repository layer for data access (includes NOP parsing)
    const dataBatasPersil = await batasPersilRepo.findByNOP(nop);

    if (!dataBatasPersil) {
      return res.status(404).json({ message: "NOP tidak ditemukan di database" });
    }

    return res.status(200).json({
      code: 200,
      data: dataBatasPersil,
      message: "Data batas persil dari NOP berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data batas persil dari NOP:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

export const getNOPbyNPWPD = async (req: Request, res: Response) => {
  try {
    const npwpd = String(req.query.npwpd);

    if (!npwpd) {
      return res.status(400).json({
        code: 400,
        message: "NPWPD tidak diberikan",
      });
    }

    const axios = require('axios');
    const pbbApiUrl = process.env.PBB_API_URL || 'http://localhost:8070';
    
    try {
      const response = await axios.get(`${pbbApiUrl}/api/retrieve/nopbynpwpd?npwpd=${npwpd}`, {
        headers: {
          'Cookie': req.headers.cookie || '',
        }
      });

      if (response.data.code === 200 && response.data.data) {
        return res.status(200).json({
          code: 200,
          data: response.data.data,
          message: "NOP berhasil ditemukan dari NPWPD",
        });
      } else {
        return res.status(404).json({
          code: 404,
          message: "NPWPD tidak ditemukan",
        });
      }
    } catch (apiError) {
      console.error("Error calling PBB API:", apiError);
      return res.status(500).json({
        code: 500,
        message: "Error menghubungi server PBB",
      });
    }
  } catch (error) {
    console.error("Error mengambil NOP dari NPWPD:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};