/**
 * Formatting Utilities
 *
 * Centralized formatting functions for common data transformations
 * including currency, NOP, dates, and percentages.
 */

/**
 * Format number as Indonesian Rupiah currency
 *
 * @param value - Number to format
 * @param options - Formatting options
 * @returns Formatted currency string
 *
 * @example
 * formatRupiah(1000000) // "Rp 1.000.000"
 * formatRupiah(1500000.50, { decimals: 2 }) // "Rp 1.500.000,50"
 * formatRupiah(0, { showZero: false }) // "-"
 */
export function formatRupiah(
  value: number | string | null | undefined,
  options: {
    showPrefix?: boolean;
    decimals?: number;
    showZero?: boolean;
  } = {}
): string {
  const {
    showPrefix = true,
    decimals = 0,
    showZero = true,
  } = options;

  // Handle null/undefined
  if (value === null || value === undefined) {
    return showZero ? (showPrefix ? "Rp 0" : "0") : "-";
  }

  // Parse to number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN
  if (isNaN(numValue)) {
    return showZero ? (showPrefix ? "Rp 0" : "0") : "-";
  }

  // Handle zero
  if (numValue === 0 && !showZero) {
    return "-";
  }

  // Format with decimals
  const formatted = numValue.toFixed(decimals);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = formatted.split(".");

  // Add thousand separators (Indonesian format uses dots)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine with decimal part if exists (Indonesian uses comma)
  const result = decimalPart
    ? `${formattedInteger},${decimalPart}`
    : formattedInteger;

  return showPrefix ? `Rp ${result}` : result;
}

/**
 * Format number as short Rupiah (K, M, B notation)
 *
 * @param value - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted short currency string
 *
 * @example
 * formatRupiahShort(1500000) // "Rp 1.5 Jt"
 * formatRupiahShort(2500000000) // "Rp 2.5 M"
 * formatRupiahShort(1500000000000) // "Rp 1.5 T"
 */
export function formatRupiahShort(
  value: number | string | null | undefined,
  decimals: number = 1
): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return "Rp 0";
  }

  // Parse to number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN or zero
  if (isNaN(numValue) || numValue === 0) {
    return "Rp 0";
  }

  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? "-" : "";

  // Trillion (Triliun)
  if (absValue >= 1_000_000_000_000) {
    return `${sign}Rp ${(absValue / 1_000_000_000_000).toFixed(decimals)} T`;
  }

  // Billion (Miliar)
  if (absValue >= 1_000_000_000) {
    return `${sign}Rp ${(absValue / 1_000_000_000).toFixed(decimals)} M`;
  }

  // Million (Juta)
  if (absValue >= 1_000_000) {
    return `${sign}Rp ${(absValue / 1_000_000).toFixed(decimals)} Jt`;
  }

  // Thousand (Ribu)
  if (absValue >= 1_000) {
    return `${sign}Rp ${(absValue / 1_000).toFixed(decimals)} Rb`;
  }

  // Less than 1000
  return `${sign}Rp ${absValue.toFixed(0)}`;
}

/**
 * Format NOP (Nomor Objek Pajak) with dots separator
 *
 * @param nop - 18-digit NOP string
 * @returns Formatted NOP with dots
 *
 * @example
 * formatNOP("527171000100010001") // "52.71.710.001.000.1000.1"
 */
export function formatNOP(nop: string | null | undefined): string {
  if (!nop) return "-";

  // Remove any existing dots or spaces
  const cleanNOP = nop.replace(/[.\s]/g, "");

  // Validate length
  if (cleanNOP.length !== 18) {
    return nop; // Return as-is if invalid length
  }

  // Format: XX.XX.XXX.XXX.XXX.XXXX.X
  // Positions: 0-2, 2-4, 4-7, 7-10, 10-13, 13-17, 17-18
  return `${cleanNOP.substring(0, 2)}.${cleanNOP.substring(2, 4)}.${cleanNOP.substring(4, 7)}.${cleanNOP.substring(7, 10)}.${cleanNOP.substring(10, 13)}.${cleanNOP.substring(13, 17)}.${cleanNOP.substring(17, 18)}`;
}

/**
 * Parse formatted NOP back to 18-digit string
 *
 * @param formattedNOP - NOP with dots
 * @returns Clean 18-digit NOP
 *
 * @example
 * parseNOP("52.71.710.001.000.1000.1") // "527171000100010001"
 */
export function parseNOP(formattedNOP: string | null | undefined): string {
  if (!formattedNOP) return "";
  return formattedNOP.replace(/[.\s]/g, "");
}

/**
 * Format percentage value
 *
 * @param value - Number to format as percentage
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(0.7524) // "75.24%"
 * formatPercentage(75.24, { isAlreadyPercentage: true }) // "75.24%"
 * formatPercentage(0.7524, { decimals: 0 }) // "75%"
 */
export function formatPercentage(
  value: number | string | null | undefined,
  options: {
    decimals?: number;
    isAlreadyPercentage?: boolean;
    showZero?: boolean;
  } = {}
): string {
  const {
    decimals = 2,
    isAlreadyPercentage = false,
    showZero = true,
  } = options;

  // Handle null/undefined
  if (value === null || value === undefined) {
    return showZero ? "0%" : "-";
  }

  // Parse to number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN
  if (isNaN(numValue)) {
    return showZero ? "0%" : "-";
  }

  // Handle zero
  if (numValue === 0 && !showZero) {
    return "-";
  }

  // Convert to percentage if needed
  const percentValue = isAlreadyPercentage ? numValue : numValue * 100;

  return `${percentValue.toFixed(decimals)}%`;
}

/**
 * Format number with thousand separators (Indonesian format)
 *
 * @param value - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1000000) // "1.000.000"
 * formatNumber(1500000.75, 2) // "1.500.000,75"
 */
export function formatNumber(
  value: number | string | null | undefined,
  decimals: number = 0
): string {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return "0";
  }

  // Parse to number
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle NaN
  if (isNaN(numValue)) {
    return "0";
  }

  // Format with decimals
  const formatted = numValue.toFixed(decimals);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = formatted.split(".");

  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine with decimal part if exists
  return decimalPart
    ? `${formattedInteger},${decimalPart}`
    : formattedInteger;
}

/**
 * Format date to Indonesian format (DD/MM/YYYY)
 *
 * @param date - Date object, string, or timestamp
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date("2024-03-15")) // "15/03/2024"
 * formatDate("2024-03-15", { format: "long" }) // "15 Maret 2024"
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  options: {
    format?: "short" | "long" | "iso";
    showTime?: boolean;
  } = {}
): string {
  const { format = "short", showTime = false } = options;

  // Handle null/undefined
  if (!date) {
    return "-";
  }

  // Parse to Date object
  const dateObj = date instanceof Date ? date : new Date(date);

  // Handle invalid date
  if (isNaN(dateObj.getTime())) {
    return "-";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  // Indonesian month names
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  let result = "";

  if (format === "long") {
    result = `${day} ${monthNames[dateObj.getMonth()]} ${year}`;
  } else if (format === "iso") {
    result = dateObj.toISOString().split("T")[0];
  } else {
    // short format (default)
    result = `${day}/${month}/${year}`;
  }

  // Add time if requested
  if (showTime) {
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    result += ` ${hours}:${minutes}`;
  }

  return result;
}

/**
 * Truncate text with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 *
 * @example
 * truncateText("Lorem ipsum dolor sit amet", 10) // "Lorem ipsu..."
 */
export function truncateText(
  text: string | null | undefined,
  maxLength: number
): string {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + "...";
}

/**
 * Format file size in human-readable format
 *
 * @param bytes - File size in bytes
 * @returns Formatted file size
 *
 * @example
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1048576) // "1 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
