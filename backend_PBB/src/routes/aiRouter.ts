import { Router } from "express";
import { getPaymentByKelurahan, getOverdueByKelurahan, getAnalyticsBreakdown, getNopHistory, getTaxpayerSummary } from "../controllers/aiData.controller";

// Dedicated namespace for AI Copilot analytics endpoints (mounted at /api/ai),
// mirroring the WebGIS Investasi backend's /ai handler.
const aiRouter = Router();

aiRouter.get("/payment/kelurahan", getPaymentByKelurahan as any);
aiRouter.get("/overdue/kelurahan", getOverdueByKelurahan as any);
aiRouter.get("/analytics/breakdown", getAnalyticsBreakdown as any);
aiRouter.get("/nop/history", getNopHistory as any);
aiRouter.get("/taxpayer", getTaxpayerSummary as any);

export default aiRouter;
