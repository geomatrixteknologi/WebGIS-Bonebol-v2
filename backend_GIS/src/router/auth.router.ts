import { authenticateUser } from "../middleware/authMiddleware";
import { getMe, getRole, login, logout, refreshSession, register, updateUser } from "../controller/auth";
import { validateLogin, validateRegister, validateUpdateUser } from "../middleware/validators";
import { Router } from "express";
import { loginLimiter } from "../middleware/rateLimiter";

const authRouther = Router();

authRouther.post("/register", authenticateUser, validateRegister, register);
authRouther.post("/login", loginLimiter, validateLogin, login);
authRouther.post("/logout", authenticateUser, logout);
authRouther.put("/update", authenticateUser, validateUpdateUser, updateUser);
authRouther.get("/me", getMe);
authRouther.get("/role", authenticateUser, getRole);
authRouther.post("/refresh", refreshSession);

export default authRouther;
