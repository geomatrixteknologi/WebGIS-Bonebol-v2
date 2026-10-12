import { authenticateUser } from "../middleware/authMiddleware";
import { PostFotoPersil, uploadFotoMiddleware } from "../controller/uploadImage";
import { PostShpBlok, PostShpKelurahan, PostShpKecamatan, PostShpPersil, PostShpZNT } from "../controller/uploadshp";
import { uploadMiddleware } from "../middleware/uploadMiddleware";
import { Router } from "express";
import { invalidateCache } from "../controller/cache.controller";

const uploadRouter = Router();

uploadRouter.post("/bataskelurahan", authenticateUser, uploadMiddleware, PostShpKelurahan); //post
uploadRouter.post("/bataskecamatan", authenticateUser, uploadMiddleware, PostShpKecamatan);
uploadRouter.post("/batasblok", authenticateUser, uploadMiddleware, PostShpBlok);
uploadRouter.post("/batasZNT", authenticateUser, uploadMiddleware, PostShpZNT);
uploadRouter.post("/bataspersil", authenticateUser, uploadMiddleware, PostShpPersil);
uploadRouter.post("/fotopersil/:nop", authenticateUser, uploadFotoMiddleware, PostFotoPersil);
uploadRouter.post("/cache/invalidate", authenticateUser, invalidateCache);

export default uploadRouter;
