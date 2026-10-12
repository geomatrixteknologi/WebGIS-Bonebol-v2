import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PaymentAnalysisService } from "../services/PaymentAnalysisService";
import { Sppt } from "../entity_prod/Sppt";

export const getPaymentStatusByYear = async (req: Request, res: Response) => {
  try {
    const tahunPajak = String(req.query.tahun);

    if (!tahunPajak) {
      return res.status(400).json({
        code: 400,
        message: "Tahun pajak tidak diberikan",
      });
    }

    const spptRepository = AppDataSource.getRepository(Sppt);
    /// query postgresql
    // ==== 🔥 QueryBuilder untuk membuat NOP + type cast ====
    // const paymentData = await spptRepository
    //   .createQueryBuilder("s")
    //   .select([
    //     `
    //     (s.kdPropinsi || s.kdDati2 || s.kdKecamatan || 
    //      s.kdKelurahan || s.kdBlok || s.noUrut || s.kdJnsOp)
    //     AS nop
    //     `,
    //     `TO_NUMBER(s.statusPembayaranSppt) AS "paymentFlag"`,
    //   ])
    //   .where("s.thnPajakSppt = :tahun", { tahun: tahunPajak })
    //   .getRawMany();

    /// query oracle
    const paymentData = await spptRepository.query(`
        SELECT
        (
            KD_PROPINSI ||
            KD_DATI2 ||
            KD_KECAMATAN ||
            KD_KELURAHAN ||
            KD_BLOK ||
            NO_URUT ||
            KD_JNS_OP
        ) AS "nop",
        TO_NUMBER(STATUS_PEMBAYARAN_SPPT) AS "paymentFlag"
    FROM ${process.env.DB_SCHEMA}.SPPT
    WHERE THN_PAJAK_SPPT = :1
      `, [tahunPajak])

    // Use service layer for payment status mapping
    const paymentStatusMap = PaymentAnalysisService.createPaymentStatusMap(paymentData);

    return res.status(200).json({
      code: 200,
      data: paymentStatusMap,
      message: `Data status pembayaran tahun ${tahunPajak} berhasil diambil`,
    });
  } catch (error) {
    console.error("Error mengambil data status pembayaran:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
