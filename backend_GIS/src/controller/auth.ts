import { AppDataSource } from "../data-resource";
import { UserAccount } from "../entity/entities/UserAccount";
import { Request, Response } from "express";
import { AccountRole } from "../entity/entities/AccountRole";
import { AuthenticationService, JwtPayload } from "../services/AuthenticationService";

// Re-export for backward compatibility
export interface jwtPayload extends JwtPayload {}

// **Register**
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    // Use service layer for validation
    const validation = AuthenticationService.validateCredentials(username, password);
    if (!validation.valid) {
      return res.status(400).json(AuthenticationService.createErrorResponse(validation.error!, 400));
    }

    const userRepo = AppDataSource.getRepository(UserAccount);
    const existingUser = await userRepo.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json(AuthenticationService.createConflictResponse());
    }

    // Use service layer for password hashing
    const hashedPassword = await AuthenticationService.hashPassword(password);
    const newUser = userRepo.create({ username, password: hashedPassword, role });
    await userRepo.save(newUser);

    return res.status(201).json(
      AuthenticationService.createRegistrationResponse(newUser.id, newUser.username)
    );
  } catch (error) {
    AuthenticationService.logAuthError(error, "register");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};

// **Login**
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Use service layer for validation
    const validation = AuthenticationService.validateCredentials(username, password);
    if (!validation.valid) {
      return res.status(400).json(AuthenticationService.createErrorResponse(validation.error!, 400));
    }

    const userRepo = AppDataSource.getRepository(UserAccount);
    const user = await userRepo.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json(AuthenticationService.createUnauthorizedResponse());
    }

    // Use service layer for password comparison
    const isValidPassword = await AuthenticationService.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json(AuthenticationService.createUnauthorizedResponse());
    }

    // Use service layer to generate token
    const token = AuthenticationService.generateToken({
      id: user.id,
      username,
      role: user.role,
    });

    const refreshToken = AuthenticationService.generateRefreshToken({
      id: user.id,
      username,
      role: user.role,
    });

    // Use service layer for cookie configuration
        res.cookie(AuthenticationService.getCookieName(), token, AuthenticationService.getAccessCookieConfig());
    res.cookie("refresh-token", refreshToken, AuthenticationService.getRefreshCookieConfig());

    return res.status(200).json(AuthenticationService.createLoginResponse(token));
  } catch (error) {
    AuthenticationService.logAuthError(error, "login");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};

// **Logout** (Menghapus token di frontend)
export const logout = async (req: Request, res: Response) => {
  // Use service layer for cookie configuration
  const cookieConfig = AuthenticationService.getClearCookieConfig();
  res.clearCookie(AuthenticationService.getCookieName(), cookieConfig);
  res.clearCookie("refresh-token", { ...cookieConfig, path: "/api/auth/refresh" });

  return res.status(200).json(
    AuthenticationService.createSuccessResponse("Logout berhasil!")
  );
};

// **Update Username atau Password**
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, newUsername, newPassword } = req.body;

    // Use service layer for validation
    const validation = AuthenticationService.validateUpdateData(userId, newUsername, newPassword);
    if (!validation.valid) {
      return res.status(400).json(AuthenticationService.createErrorResponse(validation.error!, 400));
    }

    const userRepo = AppDataSource.getRepository(UserAccount);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json(AuthenticationService.createNotFoundResponse());
    }

    // Update fields if provided
    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = await AuthenticationService.hashPassword(newPassword);

    await userRepo.save(user);

    return res.status(200).json(
      AuthenticationService.createSuccessResponse("Data akun berhasil diperbarui!")
    );
  } catch (error) {
    AuthenticationService.logAuthError(error, "updateUser");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // Use service layer to extract token from cookies
    const token = AuthenticationService.extractTokenFromCookies(req.cookies);

    if (!token) {
      return res.status(403).json(AuthenticationService.createForbiddenResponse());
    }

    // Use service layer to decode token
    const decodedPayload = AuthenticationService.decodeToken(token);
    if (!decodedPayload) {
      return res.status(400).json(AuthenticationService.createInvalidTokenResponse());
    }

    return res.status(200).json(
      AuthenticationService.createTokenValidationResponse(decodedPayload, token)
    );
  } catch (error) {
    AuthenticationService.logAuthError(error, "getMe");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const roleRepo = AppDataSource.getRepository(AccountRole);
    const role = await roleRepo.find();

    return res.status(200).json(
      AuthenticationService.createSuccessResponse("role ditemukan", role)
    );
  } catch (error) {
    AuthenticationService.logAuthError(error, "getRole");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};

export const refreshSession = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      return res.status(403).json(AuthenticationService.createForbiddenResponse());
    }
    const { verifyRefreshToken } = require("../utils/jwt");
    const verification = verifyRefreshToken(refreshToken);
    if (!verification.isValid) {
      const cookieConfig = AuthenticationService.getClearCookieConfig();
      res.clearCookie(AuthenticationService.getCookieName(), cookieConfig);
      res.clearCookie("refresh-token", { ...cookieConfig, path: "/api/auth/refresh" });
      return res.status(403).json({ code: 403, message: "Invalid refresh token. Please login again." });
    }
    // Generate new Access Token
    const newAccessToken = AuthenticationService.generateToken(verification.data as any);
    res.cookie(AuthenticationService.getCookieName(), newAccessToken, AuthenticationService.getAccessCookieConfig());
    return res.status(200).json({ code: 200, message: "Token refreshed successfully" });
  } catch (error) {
    AuthenticationService.logAuthError(error, "refreshSession");
    return res.status(500).json(AuthenticationService.createErrorResponse("Internal server error", 500));
  }
};