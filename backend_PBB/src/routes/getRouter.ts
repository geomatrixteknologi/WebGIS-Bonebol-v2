import { Router } from "express";
import { getKodeKecamatan, getKodeKelurahan } from "../controllers/getKodeWilayah.controller";
import { getAllDatObjekPajak } from "../controllers/datObjekPajak.controller";
import { getDetailObjekPajak } from "../controllers/getDetailNOP";
import { getSpptbyTahun } from "../controllers/sppt.controller";
import { getDatOpBumi } from "../controllers/datOpBumi.controller";
import { getSebaranZntDatObjekPajak } from "../controllers/sebaranZntDatObjekPajak.controller";
import { getSebaranZntKelasTanah } from "../controllers/sebaranZntKelasTanah.controller";
import { getNamaWajibPajak } from "../controllers/getNamaWajibPajak";
import { getNOPbyNPWPD } from "../controllers/getNOPbyNPWPD";
import { getPaymentStatusByYear } from "../controllers/paymentStatus.controller";
import { getTaxDashboardSummary } from "../controllers/taxDashboard.controller";
import { getRegionalBreakdown, getAvailableYears, getKecamatanList, getKelurahanList } from "../controllers/regionalAnalysis.controller";
import { getPaymentTimeline } from "../controllers/paymentAnalysis.controller";
import { getCollectionTrends } from "../controllers/collectionEfficiency.controller";
import { getOverdueSummary, getOverdueList, getOverdueRegional } from "../controllers/overdueAnalysis.controller";
import { getOverdueMapData } from "../controllers/overdueMapData.controller";
import { getTopNopsByTax } from "../controllers/topNopsByTax.controller";

const retrieveRouter = Router();

retrieveRouter.get("/dataobjekpajak", getAllDatObjekPajak as any);
retrieveRouter.get("/sebaranzntdataobjekpajak", getSebaranZntDatObjekPajak as any);
retrieveRouter.get("/sebaranzntkelastanah", getSebaranZntKelasTanah as any);
retrieveRouter.get("/kodekecamatan", getKodeKecamatan as any); //
retrieveRouter.get("/kodekelurahan", getKodeKelurahan as any); //
retrieveRouter.get("/detailnop", getDetailObjekPajak as any); //
retrieveRouter.get("/spptbytahun", getSpptbyTahun as any);
retrieveRouter.get("/datopbumi", getDatOpBumi as any);
retrieveRouter.get("/carinama", getNamaWajibPajak as any); //
retrieveRouter.get("/nopbynpwpd", getNOPbyNPWPD as any); //
retrieveRouter.get("/paymentstatus", getPaymentStatusByYear as any); //
retrieveRouter.get("/tax-summary", getTaxDashboardSummary as any); //
retrieveRouter.get("/regional-breakdown", getRegionalBreakdown as any); //
retrieveRouter.get("/available-years", getAvailableYears as any); //
retrieveRouter.get("/kecamatan-list", getKecamatanList as any); //
retrieveRouter.get("/kelurahan-list", getKelurahanList as any); //
retrieveRouter.get("/payment-timeline", getPaymentTimeline as any); //
retrieveRouter.get("/collection-trends", getCollectionTrends as any); //
retrieveRouter.get("/overdue-summary", getOverdueSummary as any); //
retrieveRouter.get("/overdue-list", getOverdueList as any); //
retrieveRouter.get("/overdue-regional", getOverdueRegional as any);
retrieveRouter.get("/overdue-map-data", getOverdueMapData as any); //
retrieveRouter.get("/top-nops-by-tax", getTopNopsByTax as any); //

export default retrieveRouter;
