import { Router } from "express";
import retrieveRouter from "./getRouter";
import aiRouter from "./aiRouter";

const apiRouter = Router();

apiRouter.use("/retrieve", retrieveRouter);
apiRouter.use("/ai", aiRouter);

export default apiRouter;
