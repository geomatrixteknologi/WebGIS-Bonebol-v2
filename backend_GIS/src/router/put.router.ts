import { authenticateUser } from "../middleware/authMiddleware";
import { updateCenterPoint } from "../controller/centerPoint";
import { Router } from "express";
import { updateZoom } from "../controller/zoom";

const putRouter = Router();

putRouter.put("/updatecenterpoint", authenticateUser, updateCenterPoint);
putRouter.put("/updatezoom", authenticateUser, updateZoom);

export default putRouter;
