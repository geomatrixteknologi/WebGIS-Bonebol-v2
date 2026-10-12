import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { jwtDecode } from "jwt-decode";
import { CookieOptions } from "express";
import dayjs from "dayjs";

/**
 * AuthenticationService
 *
 * Provides authentication-related business logic including:
 * - User credential validation
 * - Password security operations
 * - JWT token management
 * - Cookie configuration
 * - Input validation
 * - Response formatting
 *
 * Following SOLID principles:
 * - Single Responsibility: Handles only authentication logic
 * - Open/Closed: Extensible through interfaces
 * - Dependency Inversion: Uses utility abstractions
 *
 */

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * JWT payload structure
 */
export interface JwtPayload {
  id: number;
  username: string;
  role: string;
}

/**
 * User credentials for login/registration
 */
export interface UserCredentials {
  username: string;
  password: string;
  role?: string;
}

/**
 * Token verification result
 */
export interface TokenVerification {
  isValid: boolean;
  data?: JwtPayload;
  error?: string;
}

/**
 * User validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Authentication response structure
 */
export interface AuthResponse {
  code: number;
  message: string;
  data?: any;
  loggedIn?: boolean;
}

/**
 * Cookie configuration options
 */
export interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  expires?: Date;
  path?: string;
  domain?: string;
}

// ============================================================================
// AUTHENTICATION SERVICE
// ============================================================================

export class AuthenticationService {
  // Constants
  private static readonly COOKIE_NAME = "user-cookies";
  private static readonly TOKEN_EXPIRY_DAYS = 1;
  private static readonly MIN_USERNAME_LENGTH = 3;
  private static readonly MIN_PASSWORD_LENGTH = 6;

  // ============================================================================
  // INPUT VALIDATION
  // ============================================================================

  /**
   * Validates user credentials
   *
   * @param username - Username to validate
   * @param password - Password to validate
   * @returns Validation result with error message if invalid
   *
   * @example
   * const result = AuthenticationService.validateCredentials("user123", "pass123");
   * if (!result.valid) {
   *   return res.status(400).json({ message: result.error });
   * }
   */
  static validateCredentials(
    username: string | undefined,
    password: string | undefined
  ): ValidationResult {
    if (!username || !password) {
      return {
        valid: false,
        error: "Username dan password wajib diisi!",
      };
    }

    if (username.trim().length === 0 || password.trim().length === 0) {
      return {
        valid: false,
        error: "Username dan password tidak boleh kosong!",
      };
    }

    return { valid: true };
  }

  /**
   * Validates username format and length
   *
   * @param username - Username to validate
   * @returns Validation result
   */
  static validateUsername(username: string): ValidationResult {
    if (!username || username.trim().length === 0) {
      return {
        valid: false,
        error: "Username wajib diisi!",
      };
    }

    if (username.length < this.MIN_USERNAME_LENGTH) {
      return {
        valid: false,
        error: `Username minimal ${this.MIN_USERNAME_LENGTH} karakter!`,
      };
    }

    // Check for valid characters (alphanumeric, underscore, hyphen)
    const usernamePattern = /^[a-zA-Z0-9_-]+$/;
    if (!usernamePattern.test(username)) {
      return {
        valid: false,
        error: "Username hanya boleh mengandung huruf, angka, underscore, dan hyphen!",
      };
    }

    return { valid: true };
  }

  /**
   * Validates password strength
   *
   * @param password - Password to validate
   * @returns Validation result
   */
  static validatePassword(password: string): ValidationResult {
    if (!password || password.trim().length === 0) {
      return {
        valid: false,
        error: "Password wajib diisi!",
      };
    }

    if (password.length < this.MIN_PASSWORD_LENGTH) {
      return {
        valid: false,
        error: `Password minimal ${this.MIN_PASSWORD_LENGTH} karakter!`,
      };
    }

    return { valid: true };
  }

  /**
   * Validates update user data
   *
   * @param userId - User ID
   * @param newUsername - New username (optional)
   * @param newPassword - New password (optional)
   * @returns Validation result
   */
  static validateUpdateData(
    userId: number | undefined,
    newUsername?: string,
    newPassword?: string
  ): ValidationResult {
    if (!userId) {
      return {
        valid: false,
        error: "User ID wajib diisi!",
      };
    }

    if (!newUsername && !newPassword) {
      return {
        valid: false,
        error: "Data tidak valid! Minimal satu field harus diisi.",
      };
    }

    if (newUsername) {
      const usernameValidation = this.validateUsername(newUsername);
      if (!usernameValidation.valid) {
        return usernameValidation;
      }
    }

    if (newPassword) {
      const passwordValidation = this.validatePassword(newPassword);
      if (!passwordValidation.valid) {
        return passwordValidation;
      }
    }

    return { valid: true };
  }

  // ============================================================================
  // PASSWORD OPERATIONS
  // ============================================================================

  /**
   * Hashes a plain text password
   *
   * @param password - Plain text password
   * @returns Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    return await hashPassword(password);
  }

  /**
   * Compares a plain text password with a hashed password
   *
   * @param password - Plain text password
   * @param hashedPassword - Hashed password from database
   * @returns True if passwords match
   */
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await comparePassword(password, hashedPassword);
  }

  // ============================================================================
  // TOKEN OPERATIONS
  // ============================================================================

  /**
   * Generates a JWT token for a user
   *
   * @param payload - User data to encode in token
   * @returns JWT token string
   */
  static generateToken(payload: JwtPayload): string {
    return generateToken(payload);
  }

    static generateRefreshToken(payload: JwtPayload): string {
    return generateRefreshToken(payload);
  }
  /**
   * Verifies a JWT token
   *
   * @param token - JWT token to verify
   * @returns Verification result with decoded data
   */
  static verifyToken(token: string): TokenVerification {
    const result = verifyToken(token);

    if (!result.isValid) {
      return {
        isValid: false,
        error: "Token tidak valid atau telah kadaluarsa",
      };
    }

    return {
      isValid: true,
      data: result.data as JwtPayload,
    };
  }

  /**
   * Decodes a JWT token without verification
   *
   * @param token - JWT token to decode
   * @returns Decoded payload or null if invalid
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      return null;
    }
  }

  /**
   * Extracts token from cookie header
   *
   * @param cookies - Cookie object from request
   * @returns Token string or null
   */
  static extractTokenFromCookies(cookies: Record<string, string>): string | null {
    return cookies[this.COOKIE_NAME] || null;
  }

  // ============================================================================
  // COOKIE OPERATIONS
  // ============================================================================

  /**
   * Gets cookie configuration for authentication token
   *
   * @param expiryDays - Number of days until cookie expires
   * @returns Cookie options
   */
  static getAccessCookieConfig(): CookieConfig {
    return {
      httpOnly: process.env.HTTPONLY === "true",
      secure: process.env.SECURE === "true",
      sameSite: "none",
      expires: dayjs().add(1, "day").toDate(),
      ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
    };
  }

    static getRefreshCookieConfig(): CookieConfig {
    return {
      httpOnly: true,
      secure: process.env.SECURE === "true",
      sameSite: "none",
      expires: dayjs().add(7, "day").toDate(),
      path: "/api/auth/refresh",
      ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
    };
  }

  /**
   * Gets cookie configuration for clearing/logout
   *
   * @returns Cookie options for clearing
   */
  static getClearCookieConfig(): CookieConfig {
    return {
      httpOnly: process.env.HTTPONLY === "true",
      secure: process.env.SECURE === "true",
      sameSite: "none",
      path: "/",
      ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
    };
  }

  /**
   * Gets the cookie name used for authentication
   *
   * @returns Cookie name
   */
  static getCookieName(): string {
    return this.COOKIE_NAME;
  }

  // ============================================================================
  // RESPONSE FORMATTING
  // ============================================================================

  /**
   * Creates a success response
   *
   * @param message - Success message
   * @param data - Response data (optional)
   * @param code - HTTP status code (default: 200)
   * @returns Formatted response
   */
  static createSuccessResponse(
    message: string,
    data?: any,
    code: number = 200
  ): AuthResponse {
    const response: AuthResponse = { code, message };
    if (data !== undefined) {
      response.data = data;
    }
    return response;
  }

  /**
   * Creates an error response
   *
   * @param message - Error message
   * @param code - HTTP status code
   * @returns Formatted error response
   */
  static createErrorResponse(message: string, code: number): AuthResponse {
    return { code, message };
  }

  /**
   * Creates a login success response
   *
   * @param token - JWT token
   * @returns Formatted login response
   */
  static createLoginResponse(token: string): AuthResponse {
    return {
      code: 200,
      data: token,
      message: "Login berhasil!",
    };
  }

  /**
   * Creates a registration success response
   *
   * @param userId - Created user ID
   * @param username - Created username
   * @returns Formatted registration response
   */
  static createRegistrationResponse(userId: number, username: string): AuthResponse {
    return {
      code: 201,
      message: "Akun berhasil dibuat!",
      data: { id: userId, username },
    };
  }

  /**
   * Creates a token validation response
   *
   * @param payload - Decoded token payload
   * @param token - Original token string
   * @returns Formatted validation response
   */
  static createTokenValidationResponse(
    payload: JwtPayload,
    token: string
  ): AuthResponse {
    return {
      code: 200,
      loggedIn: true,
      data: payload,
      message: "Token valid",
    };
  }

  /**
   * Creates an unauthorized response
   *
   * @param message - Error message
   * @returns Formatted unauthorized response
   */
  static createUnauthorizedResponse(message?: string): AuthResponse {
    return {
      code: 401,
      message: message || "Username atau password salah!",
    };
  }

  /**
   * Creates a forbidden response (no token)
   *
   * @returns Formatted forbidden response
   */
  static createForbiddenResponse(): AuthResponse {
    return {
      code: 403,
      loggedIn: false,
      message: "Token not found",
    };
  }

  /**
   * Creates a conflict response (username exists)
   *
   * @returns Formatted conflict response
   */
  static createConflictResponse(): AuthResponse {
    return {
      code: 409,
      message: "Username sudah digunakan!",
    };
  }

  /**
   * Creates a not found response (user not found)
   *
   * @returns Formatted not found response
   */
  static createNotFoundResponse(): AuthResponse {
    return {
      code: 404,
      message: "User tidak ditemukan!",
    };
  }

  /**
   * Creates an invalid token format response
   *
   * @returns Formatted invalid token response
   */
  static createInvalidTokenResponse(): AuthResponse {
    return {
      code: 400,
      loggedIn: false,
      message: "Invalid token format",
    };
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Logs authentication events (wrapper for consistent logging)
   *
   * @param event - Event type
   * @param details - Event details
   */
  static logAuthEvent(event: string, details?: any): void {
    console.log(`[AUTH] ${event}`, details || "");
  }

  /**
   * Logs authentication errors (wrapper for consistent error logging)
   *
   * @param error - Error message or object
   * @param context - Error context
   */
  static logAuthError(error: any, context?: string): void {
    console.error(`[AUTH ERROR]${context ? ` ${context}:` : ""}`, error);
  }
}
