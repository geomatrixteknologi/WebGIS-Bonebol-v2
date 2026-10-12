import { Request, Response } from "express";
import { SpptRepository } from "../repositories/SpptRepository";
import { RefWilayahRepository } from "../repositories/RefWilayahRepository";
import { OverdueAnalysisService } from "../services/OverdueAnalysisService";
import { validateNOPInput } from "../utils/validators";

const refWilayahRepository = new RefWilayahRepository();

const toNum = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/**
 * GET /api/ai/payment/kelurahan?kecamatan={name}&year={year}
 *
 * Per-DESA payment performance within one kecamatan: target vs realisasi,
 * jumlah terbayar/belum, dan collection rate. Dedicated AI endpoint so the
 * Copilot can analyse below kecamatan level.
 */
export const getPaymentByKelurahan = async (req: Request, res: Response) => {
  try {
    const { kecamatan, year } = req.query;
    if (!kecamatan || typeof kecamatan !== "string") {
      return res.status(400).json({ code: 400, message: "Parameter 'kecamatan' diperlukan" });
    }

    const yearValue = year ? parseInt(year as string, 10) : new Date().getFullYear();
    const spptRepository = new SpptRepository();
    const raw = await spptRepository.getKelurahanBreakdown(yearValue, kecamatan);

    const rows = (raw || []).map((r: any) => {
      const target = toNum(r.target);
      const realization = toNum(r.realization);
      const totalNop = toNum(r.totalNop);
      const paidNop = toNum(r.paidNop);
      return {
        kelurahan: r.kelurahan,
        target,
        realization,
        paidCount: paidNop,
        unpaidCount: totalNop - paidNop,
        totalCount: totalNop,
        collectionRate: target > 0 ? Number(((realization / target) * 100).toFixed(2)) : 0,
      };
    });

    rows.sort((a, b) => a.collectionRate - b.collectionRate);

    return res.status(200).json({
      code: 200,
      data: { kecamatan, year: yearValue, count: rows.length, rows },
      message: "Data pembayaran per kelurahan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil pembayaran per kelurahan:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

/**
 * GET /api/ai/overdue/kelurahan?kecamatan={name}&year={year}
 *
 * Per-DESA arrears (tunggakan) within one kecamatan, with a severity breakdown,
 * computed in a single query. Replaces the AI service's previous N-call loop
 * (one overdue-summary request per kelurahan).
 */
export const getOverdueByKelurahan = async (req: Request, res: Response) => {
  try {
    const { kecamatan, year } = req.query;
    if (!kecamatan || typeof kecamatan !== "string") {
      return res.status(400).json({ code: 400, message: "Parameter 'kecamatan' diperlukan" });
    }

    const kec = await refWilayahRepository.findKecamatanByName(kecamatan);
    if (!kec || !kec.KDKECAMATAN) {
      return res.status(404).json({ code: 404, message: `Kecamatan '${kecamatan}' tidak ditemukan` });
    }
    const kdKecamatan = kec.KDKECAMATAN as string;

    const spptRepository = new SpptRepository();
    const unpaidRecords = await spptRepository.getOverdueRecordsOptimized({
      year: year as string,
      kecamatan: kdKecamatan,
    });

    const nopMap = OverdueAnalysisService.aggregateByNop(unpaidRecords, {}, null);
    const processed = OverdueAnalysisService.processOverdueRecords(nopMap);
    const byKelurahan = OverdueAnalysisService.aggregateByKelurahanWithSeverity(processed);

    // Resolve KD_KELURAHAN -> nama desa
    const nameRows = await refWilayahRepository.findKelurahanCodeNameByKdKecamatan(kdKecamatan);
    const nameMap = new Map<string, string>();
    for (const r of nameRows as any[]) {
      if (r.KDKELURAHAN != null) nameMap.set(String(r.KDKELURAHAN), r.NMKELURAHAN ?? String(r.KDKELURAHAN));
    }

    const rows = byKelurahan.map((r) => ({
      kelurahan: nameMap.get(String(r.kdKelurahan)) ?? r.kdKelurahan,
      kdKelurahan: r.kdKelurahan,
      totalOverdue: r.count,
      totalAmount: r.totalAmount,
      critical: r.critical,
      high: r.high,
      medium: r.medium,
      low: r.low,
    }));

    return res.status(200).json({
      code: 200,
      data: { kecamatan, year: year ?? "all", count: rows.length, rows },
      message: "Data tunggakan per kelurahan berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil tunggakan per kelurahan:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

const ANALYTICS_BASIS = ["payment", "overdue"] as const;
const ANALYTICS_GROUP_BY = ["land_class", "njop_bracket", "area_bracket", "kelurahan"] as const;

const BRACKET_ORDER: Record<string, string[]> = {
  njop_bracket: ["< 50 jt", "50-100 jt", "100-250 jt", "250-500 jt", "500 jt - 1 M", "> 1 M", "Tidak diketahui"],
  area_bracket: ["< 100 m2", "100-250 m2", "250-500 m2", "500-1.000 m2", "1.000-5.000 m2", "> 5.000 m2", "Tidak diketahui"],
};

/**
 * GET /api/ai/analytics/breakdown
 *   ?basis=payment|overdue
 *   &groupBy=land_class|njop_bracket|area_bracket|kelurahan
 *   &year={year}            (required for basis=payment; optional for overdue)
 *   &kecamatan={name}       (optional)
 *
 * Single-pass aggregated analytics grouped by an object-level dimension. Lets
 * the AI Copilot answer detailed questions below kecamatan/kelurahan level
 * (per land class, per NJOP/area bracket) with server-computed totals — the
 * model never has to sum raw rows itself.
 */
export const getAnalyticsBreakdown = async (req: Request, res: Response) => {
  try {
    const basis = String(req.query.basis ?? "overdue").toLowerCase();
    const groupBy = String(req.query.groupBy ?? "").toLowerCase();
    const kecamatanName = typeof req.query.kecamatan === "string" ? req.query.kecamatan : undefined;
    let year = typeof req.query.year === "string" ? req.query.year : undefined;

    if (!ANALYTICS_BASIS.includes(basis as any)) {
      return res.status(400).json({ code: 400, message: `Parameter 'basis' harus salah satu dari: ${ANALYTICS_BASIS.join(", ")}` });
    }
    if (!ANALYTICS_GROUP_BY.includes(groupBy as any)) {
      return res.status(400).json({ code: 400, message: `Parameter 'groupBy' harus salah satu dari: ${ANALYTICS_GROUP_BY.join(", ")}` });
    }
    if (basis === "payment" && (!year || year === "all")) {
      year = String(new Date().getFullYear());
    }

    let kdKecamatan: string | undefined;
    if (kecamatanName) {
      const kec = await refWilayahRepository.findKecamatanByName(kecamatanName);
      if (!kec || !kec.KDKECAMATAN) {
        return res.status(404).json({ code: 404, message: `Kecamatan '${kecamatanName}' tidak ditemukan` });
      }
      kdKecamatan = kec.KDKECAMATAN as string;
    }

    const spptRepository = new SpptRepository();
    const raw = await spptRepository.getAnalyticsBreakdown({
      basis: basis as "payment" | "overdue",
      groupBy: groupBy as any,
      year,
      kecamatan: kdKecamatan,
    });

    let rows = (raw || []).map((r: any) => {
      const totalNop = toNum(r.totalNop);
      const totalDue = toNum(r.totalDue);
      const njopTotal = toNum(r.njopTotal);
      const base: any = {
        group: r.groupLabel,
        totalNop,
        njopTotal,
        avgNjop: totalNop > 0 ? Math.round(njopTotal / totalNop) : 0,
      };
      if (basis === "payment") {
        const paidNop = toNum(r.paidNop);
        const realization = toNum(r.realization);
        base.target = totalDue;
        base.realization = realization;
        base.paidCount = paidNop;
        base.unpaidCount = totalNop - paidNop;
        base.collectionRate = totalDue > 0 ? Number(((realization / totalDue) * 100).toFixed(2)) : 0;
      } else {
        base.overdueCount = totalNop;
        base.overdueAmount = totalDue;
      }
      return base;
    });

    const order = BRACKET_ORDER[groupBy];
    if (order) {
      rows.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
    } else if (basis === "payment") {
      rows.sort((a, b) => a.collectionRate - b.collectionRate); // worst collection first
    } else {
      rows.sort((a, b) => b.overdueAmount - a.overdueAmount); // biggest arrears first
    }

    return res.status(200).json({
      code: 200,
      data: {
        basis,
        groupBy,
        kecamatan: kecamatanName ?? "all",
        year: year ?? "all",
        count: rows.length,
        rows,
      },
      message: "Data analitik breakdown berhasil diambil",
    });
  } catch (error) {
    console.error("Error mengambil analytics breakdown:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

/**
 * GET /api/ai/nop/history?nop={nop}
 *
 * Multi-year compliance history for one NOP (objek pajak): every tax year's
 * PBB due, payment status, NJOP, land area & class. Lets the Copilot answer
 * "riwayat pembayaran NOP X", "sejak tahun berapa NOP ini menunggak",
 * "berapa total tunggakan persil ini" — beyond detailnop which only returns the
 * latest single year.
 */
export const getNopHistory = async (req: Request, res: Response) => {
  try {
    const nopValidation = validateNOPInput(req.query.nop);
    if (!nopValidation.valid) {
      return res.status(400).json({ code: 400, message: nopValidation.error });
    }
    const nop = nopValidation.value as string;

    const spptRepository = new SpptRepository();
    const records = await spptRepository.findByNOP(nop);
    if (!records || records.length === 0) {
      return res.status(200).json({
        code: 200,
        message: `Tidak ada data SPPT untuk NOP ${nop}`,
        data: { nop, totalYears: 0, history: [] },
      });
    }

    records.sort((a, b) => Number(a.thnPajakSppt) - Number(b.thnPajakSppt));

    const history = records.map((r) => {
      const paid = r.statusPembayaranSppt === "1";
      return {
        year: r.thnPajakSppt,
        pbbDue: toNum(r.pbbYgHarusDibayarSppt),
        status: paid ? "lunas" : "belum",
        njop: toNum(r.njopSppt),
        luasBumi: toNum(r.luasBumiSppt),
        luasBng: toNum(r.luasBngSppt),
        kelasTanah: r.kdKlsTanah ?? null,
        jatuhTempo: r.tglJatuhTempoSppt ?? null,
        terhutang: toNum(r.pbbTerhutangSppt),
      };
    });

    const latest = records[records.length - 1];
    const unpaid = history.filter((h) => h.status === "belum");

    return res.status(200).json({
      code: 200,
      message: "Riwayat NOP berhasil diambil",
      data: {
        nop,
        owner: latest.nmWpSppt ?? null,
        alamatWp: latest.jlnWpSppt ?? null,
        firstYear: history[0].year,
        lastYear: history[history.length - 1].year,
        totalYears: history.length,
        paidYears: history.length - unpaid.length,
        unpaidYears: unpaid.length,
        totalUnpaidDue: unpaid.reduce((s, h) => s + h.pbbDue, 0),
        history,
      },
    });
  } catch (error) {
    console.error("Error mengambil riwayat NOP:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

/**
 * GET /api/ai/taxpayer?name={name}
 *
 * Taxpayer-centric view: all NOPs whose nmWpSppt matches `name` (latest-year
 * snapshot per NOP) plus aggregated exposure. Lets the Copilot answer
 * "objek pajak milik X", "berapa total tagihan wajib pajak Y", "WP ini punya
 * berapa persil yang belum bayar". Capped at 200 NOPs to stay bounded.
 */
export const getTaxpayerSummary = async (req: Request, res: Response) => {
  try {
    const name = typeof req.query.name === "string" ? req.query.name.trim() : "";
    if (name.length < 3) {
      return res.status(400).json({ code: 400, message: "Parameter 'name' minimal 3 karakter." });
    }

    const MAX = 200;
    const spptRepository = new SpptRepository();
    const rows = await spptRepository.findTaxpayerNops(name, MAX);

    if (rows.length === 0) {
      return res.status(200).json({
        code: 200,
        message: `Tidak ada wajib pajak yang cocok dengan '${name}'`,
        data: { name, matchedNop: 0, nops: [] },
      });
    }

    const nops = rows.map((r) => {
      const paid = r.statusPembayaranSppt === "1";
      return {
        nop: `${r.kdPropinsi}${r.kdDati2}${r.kdKecamatan}${r.kdKelurahan}${r.kdBlok}${r.noUrut}${r.kdJnsOp}`,
        nmWp: r.nmWpSppt,
        alamat: r.jlnWpSppt,
        latestYear: r.thnPajakSppt,
        pbbDue: toNum(r.pbbYgHarusDibayarSppt),
        status: paid ? "lunas" : "belum",
        njop: toNum(r.njopSppt),
      };
    });

    const unpaid = nops.filter((n) => n.status === "belum");

    return res.status(200).json({
      code: 200,
      message: "Ringkasan wajib pajak berhasil diambil",
      data: {
        name,
        matchedNop: nops.length,
        truncated: nops.length >= MAX,
        paidNop: nops.length - unpaid.length,
        unpaidNop: unpaid.length,
        totalDueLatestYear: nops.reduce((s, n) => s + n.pbbDue, 0),
        totalUnpaidDueLatestYear: unpaid.reduce((s, n) => s + n.pbbDue, 0),
        totalNjop: nops.reduce((s, n) => s + n.njop, 0),
        nops,
      },
    });
  } catch (error) {
    console.error("Error mengambil ringkasan wajib pajak:", error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};
