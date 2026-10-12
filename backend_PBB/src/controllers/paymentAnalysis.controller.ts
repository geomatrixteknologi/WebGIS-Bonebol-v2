import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PaymentAnalysisService } from "../services/PaymentAnalysisService";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";
import { Sppt } from "../entity_prod/Sppt";
import { PembayaranSppt } from "../entity_prod/PembayaranSppt";

const refWilayahRepository = new RefWilayahRepository();

export const getPaymentTimeline = async (req: Request, res: Response) => {
  try {
    const { year, kecamatan, kelurahan } = req.query;
    const spptRepository = AppDataSource.getRepository(Sppt);
    /// query postgresql
    // const getKdKec = await refWilayahRepository.findKecamatanByName(kecamatan as string);
    // const getKdKel = await refWilayahRepository.findKdKelurahan(getKdKec.kdkecamatan, kelurahan as string);
    // const kdKec = getKdKec.kdkecamatan;
    // const kdKel = getKdKel.kdkelurahan;

    /// query oracle
    let getKdKec;
    let getKdKel;
    if (kecamatan) {
      getKdKec = await refWilayahRepository.findKecamatanByName(kecamatan as string);
    }
    if (kelurahan) {
      getKdKel = await refWilayahRepository.findKdKelurahan(getKdKec.KDKECAMATAN, kelurahan as string);
    }

    const kdKec = getKdKec?.KDKECAMATAN;
    const kdKel = getKdKel?.KDKELURAHAN;

    let query = spptRepository
      .createQueryBuilder("m")
      .leftJoin(
        PembayaranSppt,
        "a",
        `"a"."KD_PROPINSI" = "m"."KD_PROPINSI"
         AND "a"."KD_DATI2" = "m"."KD_DATI2"
         AND "a"."KD_KECAMATAN" = "m"."KD_KECAMATAN"
         AND "a"."KD_KELURAHAN" = "m"."KD_KELURAHAN"
         AND "a"."KD_BLOK" = "m"."KD_BLOK"
         AND "a"."NO_URUT" = "m"."NO_URUT"
         AND "a"."KD_JNS_OP" = "m"."KD_JNS_OP"`
      )
      .select('a.tglPembayaranSppt', "paymentDate")
      .addSelect('m.tglJatuhTempoSppt', "dueDate")
      .addSelect('m.pbbYgHarusDibayarSppt', "amount")
      .addSelect('m.thnPajakSppt', "year");

    // Filter dasar
    query = query.where('m.statusPembayaranSppt = :status', { status: "1" }).andWhere('m.thnPajakSppt = :defaultYear', { defaultYear: "2025" });

    // Filter opsional
    if (year) query.andWhere('m.thnPajakSppt = :year', { year });
    if (kecamatan) query.andWhere('m.kdKecamatan = :kdKec', { kdKec });
    if (kelurahan) query.andWhere('m.kdKelurahan = :kdKel', { kdKel });

    // Default jika parameter tidak dikirim
    if (!year) query.andWhere('m.thnPajakSppt = :hardcodedYear', { hardcodedYear: "2025" });
    if (!kecamatan) query.andWhere('m.kdKecamatan = :hardcodedKec', { hardcodedKec: "080" });
    if (!kelurahan) query.andWhere('m.kdKelurahan = :hardcodedKel', { hardcodedKel: "006" });

    const rawData = await query.getRawMany();

    // Use service layer for payment timing analysis
    const result = PaymentAnalysisService.processPaymentTiming(rawData, year as string);

    return res.status(200).json({
      code: 200,
      data: result,
      rawData,
      message: "Data timeline pembayaran berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil data timeline pembayaran:", error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
