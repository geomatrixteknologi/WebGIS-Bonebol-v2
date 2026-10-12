import { Router } from "express";
import uploadRouter from "./upload.router";
import retrieveRouter from "./retrieve.router";
import authRouther from "./auth.router";
import putRouter from "./put.router";
import deleteRouter from "./delete.router";
import aiRouter from "./ai.router";

const apiRouter = Router();

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/retrieve", retrieveRouter);
apiRouter.use("/auth", authRouther);
apiRouter.use("/put", putRouter);
apiRouter.use("/delete", deleteRouter);
apiRouter.use("/ai", aiRouter);

export default apiRouter;
