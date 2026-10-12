/**
 * Validation Utilities
 *
 * Centralized validation functions for common data types and business rules.
 *
 * Following DRY principle by eliminating validation logic duplication
 * across controllers and services.
 *
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const NOP_PATTERN = /^\d{18}$/;
const NPWPD_PATTERN = /^\d{18}$/;
const KECAMATAN_PATTERN = /^\d{3}$/;
const KELURAHAN_PATTERN = /^\d{3}$/;

// ============================================================================
// NOP VALIDATION
// ============================================================================

/**
 * Validates if a string is a valid NOP (Nomor Objek Pajak)
 *
 * @param nop - NOP string to validate
 * @returns True if valid 18-digit NOP
 *
 * @example
 * validateNOP("527172001001001000") // true
 * validateNOP("123") // false
 */
export function validateNOP(nop: string): boolean {
  return NOP_PATTERN.test(nop);
}

/**
 * Validates and sanitizes NOP input
 *
 * @param nop - NOP input (may be undefined)
 * @returns Validation result with sanitized value or error
 *
 * @example
 * const result = validateNOPInput("527172001001001000");
 * if (!result.valid) {
 *   return res.status(400).json({ message: result.error });
 * }
 */
export function validateNOPInput(nop: any): {
  valid: boolean;
  value?: string;
  error?: string;
} {
  if (!nop) {
    return { valid: false, error: "NOP tidak diberikan" };
  }

  const nopString = String(nop).trim();

  if (!validateNOP(nopString)) {
    return {
      valid: false,
      error: "Format NOP tidak valid. NOP harus 18 digit angka",
    };
  }

  return { valid: true, value: nopString };
}

// ============================================================================
// YEAR VALIDATION
// ============================================================================

/**
 * Validates if a year is within acceptable range
 *
 * @param year - Year to validate
 * @param minYear - Minimum acceptable year (default: 2000)
 * @param maxYearsAhead - How many years ahead to allow (default: 1)
 * @returns True if year is valid
 *
 * @example
 * validateYear(2024) // true
 * validateYear(1999) // false
 * validateYear(2030) // false
 */
export function validateYear(
  year: number,
  minYear: number = 2000,
  maxYearsAhead: number = 1
): boolean {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + maxYearsAhead;
  return year >= minYear && year <= maxYear;
}

/**
 * Validates and parses year input
 *
 * @param year - Year input (string or number)
 * @returns Validation result with parsed value or error
 *
 * @example
 * const result = validateYearInput("2024");
 * if (!result.valid) {
 *   return res.status(400).json({ message: result.error });
 * }
 */
export function validateYearInput(year: any): {
  valid: boolean;
  value?: number;
  error?: string;
} {
  if (!year) {
    return { valid: false, error: "Tahun tidak diberikan" };
  }

  const yearNum = Number(year);

  if (isNaN(yearNum)) {
    return { valid: false, error: "Tahun harus berupa angka" };
  }

  if (!validateYear(yearNum)) {
    const currentYear = new Date().getFullYear();
    return {
      valid: false,
      error: `Tahun harus antara 2000 dan ${currentYear + 1}`,
    };
  }

  return { valid: true, value: yearNum };
}

// ============================================================================
// PAGINATION VALIDATION
// ============================================================================

/**
 * Pagination configuration
 */
export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

/**
 * Validates and sanitizes pagination parameters
 *
 * Ensures page and limit are positive integers within acceptable ranges
 *
 * @param page - Page number (may be string or number)
 * @param limit - Items per page (may be string or number)
 * @returns Sanitized pagination parameters
 *
 * @example
 * const { page, limit } = validatePagination("1", "20");
 * // { page: 1, limit: 20 }
 *
 * const { page, limit } = validatePagination("-1", "999");
 * // { page: 1, limit: 100 } - sanitized to valid values
 */
export function validatePagination(
  page: any,
  limit: any
): { page: number; limit: number } {
  // Parse page
  let pageNum = parseInt(String(page), 10);
  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = PAGINATION_DEFAULTS.DEFAULT_PAGE;
  }

  // Parse limit
  let limitNum = parseInt(String(limit), 10);
  if (isNaN(limitNum) || limitNum < PAGINATION_DEFAULTS.MIN_LIMIT) {
    limitNum = PAGINATION_DEFAULTS.DEFAULT_LIMIT;
  } else if (limitNum > PAGINATION_DEFAULTS.MAX_LIMIT) {
    limitNum = PAGINATION_DEFAULTS.MAX_LIMIT;
  }

  return { page: pageNum, limit: limitNum };
}

// ============================================================================
// REGION CODE VALIDATION
// ============================================================================

/**
 * Validates kecamatan code format
 *
 * @param kdKec - Kecamatan code
 * @returns True if valid 3-digit code
 *
 * @example
 * validateKecamatanCode("720") // true
 * validateKecamatanCode("12") // false
 */
export function validateKecamatanCode(kdKec: string): boolean {
  return KECAMATAN_PATTERN.test(kdKec);
}

/**
 * Validates kelurahan code format
 *
 * @param kdKel - Kelurahan code
 * @returns True if valid 3-digit code
 *
 * @example
 * validateKelurahanCode("001") // true
 * validateKelurahanCode("1") // false
 */
export function validateKelurahanCode(kdKel: string): boolean {
  return KELURAHAN_PATTERN.test(kdKel);
}

/**
 * Validates region code input
 *
 * @param code - Region code input
 * @param type - Type of code ("kecamatan" or "kelurahan")
 * @returns Validation result
 */
export function validateRegionCode(
  code: any,
  type: "kecamatan" | "kelurahan"
): {
  valid: boolean;
  value?: string;
  error?: string;
} {
  if (!code) {
    return {
      valid: false,
      error: `Kode ${type} tidak diberikan`,
    };
  }

  const codeString = String(code).trim();

  const isValid =
    type === "kecamatan"
      ? validateKecamatanCode(codeString)
      : validateKelurahanCode(codeString);

  if (!isValid) {
    return {
      valid: false,
      error: `Format kode ${type} tidak valid. Harus 3 digit angka`,
    };
  }

  return { valid: true, value: codeString };
}

// ============================================================================
// NPWPD VALIDATION
// ============================================================================

/**
 * Validates NPWPD format (Nomor Pokok Wajib Pajak Daerah)
 *
 * @param npwpd - NPWPD string
 * @returns True if valid NPWPD format
 *
 * @example
 * validateNPWPD("P.1.00000001.01.01") // true
 * validateNPWPD("123") // false
 */
export function validateNPWPD(npwpd: string): boolean {
  return NPWPD_PATTERN.test(npwpd);
}

// ============================================================================
// NUMERIC VALIDATION
// ============================================================================

/**
 * Validates if value is a positive number
 *
 * @param value - Value to validate
 * @returns True if positive number
 *
 * @example
 * isPositiveNumber(100) // true
 * isPositiveNumber(-5) // false
 * isPositiveNumber(0) // false
 */
export function isPositiveNumber(value: any): boolean {
  const num = Number(value);
  return !isNaN(num) && num > 0;
}

/**
 * Validates if value is a non-negative number (includes 0)
 *
 * @param value - Value to validate
 * @returns True if non-negative number
 *
 * @example
 * isNonNegativeNumber(0) // true
 * isNonNegativeNumber(-5) // false
 */
export function isNonNegativeNumber(value: any): boolean {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
}

/**
 * Validates and parses numeric input
 *
 * @param value - Input value
 * @param fieldName - Field name for error message
 * @param options - Validation options
 * @returns Validation result
 */
export function validateNumericInput(
  value: any,
  fieldName: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    allowZero?: boolean;
  } = {}
): {
  valid: boolean;
  value?: number;
  error?: string;
} {
  const { required = true, min, max, allowZero = true } = options;

  if (!value && value !== 0) {
    if (required) {
      return { valid: false, error: `${fieldName} tidak diberikan` };
    }
    return { valid: true, value: undefined };
  }

  const num = Number(value);

  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} harus berupa angka` };
  }

  if (!allowZero && num === 0) {
    return { valid: false, error: `${fieldName} tidak boleh 0` };
  }

  if (min !== undefined && num < min) {
    return {
      valid: false,
      error: `${fieldName} tidak boleh kurang dari ${min}`,
    };
  }

  if (max !== undefined && num > max) {
    return {
      valid: false,
      error: `${fieldName} tidak boleh lebih dari ${max}`,
    };
  }

  return { valid: true, value: num };
}

// ============================================================================
// STRING VALIDATION
// ============================================================================

/**
 * Validates if string is not empty
 *
 * @param value - String to validate
 * @returns True if string is not empty after trimming
 */
export function isNonEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validates required string input
 *
 * @param value - Input value
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateStringInput(
  value: any,
  fieldName: string
): {
  valid: boolean;
  value?: string;
  error?: string;
} {
  if (!value) {
    return { valid: false, error: `${fieldName} tidak diberikan` };
  }

  const str = String(value).trim();

  if (str.length === 0) {
    return { valid: false, error: `${fieldName} tidak boleh kosong` };
  }

  return { valid: true, value: str };
}

// ============================================================================
// ENUM VALIDATION
// ============================================================================

/**
 * Validates if value is in allowed list
 *
 * @param value - Value to validate
 * @param allowedValues - Array of allowed values
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateEnum<T extends string>(
  value: any,
  allowedValues: readonly T[],
  fieldName: string
): {
  valid: boolean;
  value?: T;
  error?: string;
} {
  if (!value) {
    return { valid: false, error: `${fieldName} tidak diberikan` };
  }

  const str = String(value);

  if (!allowedValues.includes(str as T)) {
    return {
      valid: false,
      error: `${fieldName} harus salah satu dari: ${allowedValues.join(", ")}`,
    };
  }

  return { valid: true, value: str as T };
}
