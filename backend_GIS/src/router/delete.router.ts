import { deleteUserById } from "../controller/user";
import { authenticateUser } from "../middleware/authMiddleware";
import { Router } from "express";

const deleteRouter = Router();

deleteRouter.delete("/userbyid", authenticateUser, deleteUserById);

export default deleteRouter;
