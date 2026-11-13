import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { Request } from "express";

const LOGIN_WINDOW_MS = Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const LOGIN_IP_MAX = Number(process.env.LOGIN_RATE_LIMIT_IP_MAX) || 50;
const LOGIN_USER_MAX = Number(process.env.LOGIN_RATE_LIMIT_USER_MAX) || 5;

const RATE_LIMIT_MESSAGE = {
  code: 429,
  message: "Terlalu banyak percobaan login, coba lagi setelah 15 menit.",
};

/**
 * Normalizes the login username from the request body for consistent rate-limit keying.
 * Falls back to "__missing__" when username is absent or not a non-empty string.
 */
export function normalizeUsername(req: Request): string {
  const rawUsername = req.body?.username;
  if (typeof rawUsername === "string" && rawUsername.trim().length > 0) {
    return rawUsername.trim().toLowerCase();
  }
  return "__missing__";
}

/**
 * Creates isolated Layer 1 (IP) and Layer 2 (IP + username) login rate limiters.
 */
export function createLoginLimiters(options?: {
  windowMs?: number;
  ipMax?: number;
  userMax?: number;
}) {
  const windowMs = options?.windowMs ?? LOGIN_WINDOW_MS;
  const ipMax = options?.ipMax ?? LOGIN_IP_MAX;
  const userMax = options?.userMax ?? LOGIN_USER_MAX;

  // Layer 1: Per-IP safety net against password spraying and malformed-body floods
  const loginIpLimiter = rateLimit({
    windowMs,
    max: ipMax,
    skipSuccessfulRequests: true,
    keyGenerator: (req: Request) => ipKeyGenerator(req.ip ?? ""),
    message: RATE_LIMIT_MESSAGE,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Layer 2: Composite IP + normalized username limiter to isolate users behind a shared NAT IP
  const loginAccountLimiter = rateLimit({
    windowMs,
    max: userMax,
    skipSuccessfulRequests: true,
    keyGenerator: (req: Request) => `${ipKeyGenerator(req.ip ?? "")}:${normalizeUsername(req)}`,
    message: RATE_LIMIT_MESSAGE,
    standardHeaders: true,
    legacyHeaders: false,
  });

  return {
    loginIpLimiter,
    loginAccountLimiter,
    loginLimiter: [loginIpLimiter, loginAccountLimiter],
  };
}

export const { loginIpLimiter, loginAccountLimiter, loginLimiter } = createLoginLimiters();
