/**
 * Application Constants
 *
 * Centralized constant values for HTTP status codes, tax-related thresholds,
 * region codes, and other configuration values.
 */

// ============================================================================
// HTTP STATUS CODES
// ============================================================================

export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// ============================================================================
// TAX PAYMENT
// ============================================================================

export const TAX_PAYMENT = {
  // Payment deadline (September 30th)
  DEADLINE_MONTH: 9, // 0-indexed (9 = October, but we use 8 in code for Sept)
  DEADLINE_DAY: 30,

  // Payment status flags
  STATUS_PAID: 1,
  STATUS_UNPAID: 0,

  // Minimum PBB payment (configurable per region)
  MINIMUM_PAYMENT: 0,
} as const;

// ============================================================================
// OVERDUE CATEGORIES
// ============================================================================

export const OVERDUE_RANGES = {
  ON_TIME: { min: 0, max: 0, label: "Tepat Waktu" },
  LATE_1_30: { min: 1, max: 30, label: "1-30 Hari" },
  LATE_31_60: { min: 31, max: 60, label: "31-60 Hari" },
  LATE_61_90: { min: 61, max: 90, label: "61-90 Hari" },
  LATE_OVER_90: { min: 91, max: Infinity, label: "Lebih dari 90 Hari" },
} as const;

// ============================================================================
// REGION CODES (Kota Mataram, NTB)
// ============================================================================

export const REGION_CODES = {
  // Province Code
  PROVINSI: "64", // NTB (Nusa Tenggara Barat)

  // City/District Code
  KABUPATEN: "07", // Kota Mataram

  // Kecamatan Codes
  KECAMATAN: {
    LONG_IRAM: "050",
    MELAK: "060",
    MOOK_MANAAR_BULATN: "061",
    DAMAI: "070",
    BARONG_TONGKOK: "080",
    LINGGANG_BIGUNG: "081",
    MUARA_PAHU: "090",
    MUARA_LAWA: "100",
    BENTIAN_BESAR: "101",
    JEMPANG: "110",
    BONGAN: "120",
    PENYINGGAHAN: "130",
    SEKOLAQ_DARAT: "150",
    NYUATAN: "160",
    TERING: "170",
    SILUQ_NGURAI: "180",
  },

  // Default full code prefix
  PREFIX: "6407", // 52 (Provinsi) + 71 (Kabupaten)
} as const;

// ============================================================================
// TAX YEAR
// ============================================================================

export const TAX_YEAR = {
  // Minimum valid tax year
  MIN_YEAR: 2000,

  // Get current year dynamically
  getCurrentYear: (): number => new Date().getFullYear(),

  // Check if year is valid
  isValidYear: (year: number): boolean => {
    const currentYear = new Date().getFullYear();
    return year >= TAX_YEAR.MIN_YEAR && year <= currentYear + 1;
  },
} as const;

// ============================================================================
// NOP (Nomor Objek Pajak)
// ============================================================================

export const NOP = {
  // NOP length (18 digits)
  LENGTH: 18,

  // NOP segment lengths
  SEGMENTS: {
    KD_PROV: 2, // Province code (2 digits)
    KD_KAB: 2, // District code (2 digits)
    KD_KEC: 3, // Sub-district code (3 digits)
    KD_KEL: 3, // Village code (3 digits)
    KD_BLOK: 3, // Block code (3 digits)
    NO_URUT: 4, // Serial number (4 digits)
    KD_JNS_OP: 1, // Object type (1 digit)
  },

  // NOP segment positions (0-indexed)
  POSITIONS: {
    KD_PROV: { start: 0, end: 2 },
    KD_KAB: { start: 2, end: 4 },
    KD_KEC: { start: 4, end: 7 },
    KD_KEL: { start: 7, end: 10 },
    KD_BLOK: { start: 10, end: 13 },
    NO_URUT: { start: 13, end: 17 },
    KD_JNS_OP: { start: 17, end: 18 },
  },
} as const;

// ============================================================================
// COLLECTION TARGETS
// ============================================================================

export const COLLECTION_TARGETS = {
  // Target collection rate (percentage)
  EXCELLENT: 95, // >= 95%
  GOOD: 85, // >= 85%
  FAIR: 75, // >= 75%
  POOR: 0, // < 75%

  // Get target category
  getCategory: (rate: number): string => {
    if (rate >= COLLECTION_TARGETS.EXCELLENT) return "Sangat Baik";
    if (rate >= COLLECTION_TARGETS.GOOD) return "Baik";
    if (rate >= COLLECTION_TARGETS.FAIR) return "Cukup";
    return "Kurang";
  },
} as const;

// ============================================================================
// FILE UPLOAD
// ============================================================================

export const FILE_UPLOAD = {
  // Maximum file size (in bytes)
  MAX_SIZE: 10 * 1024 * 1024, // 10 MB

  // Allowed file types
  ALLOWED_TYPES: {
    IMAGES: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
    DOCUMENTS: ["application/pdf", "application/msword"],
    SHAPEFILES: [".shp", ".shx", ".dbf", ".prj"],
  },

  // Upload directories
  DIRECTORIES: {
    FOTO_PERSIL: "public/uploads/foto-persil",
    SHAPEFILES: "public/shapefiles",
    TEMP: "public/uploads/temp",
  },
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  // General
  INTERNAL_ERROR: "Internal server error",
  UNAUTHORIZED: "Akses tidak diizinkan",
  NOT_FOUND: "Data tidak ditemukan",
  BAD_REQUEST: "Permintaan tidak valid",

  // Validation
  INVALID_NOP: "Format NOP tidak valid (harus 18 digit)",
  INVALID_YEAR: "Tahun pajak tidak valid",
  INVALID_PAGINATION: "Parameter pagination tidak valid",
  REQUIRED_FIELD: (field: string) => `Parameter '${field}' diperlukan`,

  // Authentication
  INVALID_CREDENTIALS: "Username atau password salah",
  SESSION_EXPIRED: "Sesi telah berakhir, silakan login kembali",

  // Data operations
  DATA_NOT_FOUND: "Data tidak ditemukan",
  DUPLICATE_ENTRY: "Data sudah ada",
  DELETE_FAILED: "Gagal menghapus data",
  UPDATE_FAILED: "Gagal memperbarui data",
  CREATE_FAILED: "Gagal membuat data",
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  // Data operations
  DATA_RETRIEVED: "Data berhasil diambil",
  DATA_CREATED: "Data berhasil dibuat",
  DATA_UPDATED: "Data berhasil diperbarui",
  DATA_DELETED: "Data berhasil dihapus",

  // Authentication
  LOGIN_SUCCESS: "Login berhasil",
  LOGOUT_SUCCESS: "Logout berhasil",

  // File operations
  FILE_UPLOADED: "File berhasil diunggah",
  FILE_DELETED: "File berhasil dihapus",
} as const;

// ============================================================================
// DATE FORMATS
// ============================================================================

export const DATE_FORMATS = {
  ISO: "YYYY-MM-DD",
  INDONESIAN: "DD/MM/YYYY",
  LONG_INDONESIAN: "DD MMMM YYYY",
  WITH_TIME: "DD/MM/YYYY HH:mm",
  TIME_ONLY: "HH:mm:ss",
} as const;

// ============================================================================
// CACHE DURATIONS (in seconds)
// ============================================================================

export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAILY: 86400, // 24 hours
} as const;

// ============================================================================
// API RESPONSE CODES
// ============================================================================

export const API_RESPONSE_CODES = {
  SUCCESS: 200,
  ERROR: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
