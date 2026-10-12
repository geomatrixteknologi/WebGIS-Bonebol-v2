import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { getBatasKecamatan } from "../controller/batasKecamatan.controller";
import { getBatasKelurahan } from "../controller/retriveshp";
import { getBatasPersilbyNOP } from "../controller/batasPersil.controller";

// Dedicated /api/ai geometry namespace for the AI Copilot, mirroring the
// backend_PBB /api/ai handler. Reuses the existing geometry controllers so
// behaviour is identical to the /retrieve equivalents.
const aiRouter = Router();

aiRouter.get("/geometry/kecamatan", authenticateUser, getBatasKecamatan);
aiRouter.get("/geometry/kelurahan", authenticateUser, getBatasKelurahan);
aiRouter.get("/geometry/persil", authenticateUser, getBatasPersilbyNOP);

export default aiRouter;
