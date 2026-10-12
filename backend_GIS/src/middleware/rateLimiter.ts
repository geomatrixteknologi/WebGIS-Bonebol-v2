import rateLimit from "express-rate-limit";
// Limit login attempts: Max 5 attempts per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { code: 429, message: "Terlalu banyak percobaan login, coba lagi setelah 15 menit." },
  standardHeaders: true,
  legacyHeaders: false,
});