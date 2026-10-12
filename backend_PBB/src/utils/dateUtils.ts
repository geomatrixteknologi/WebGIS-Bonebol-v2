/**
 * Date Utility Functions
 *
 * Centralized date manipulation and calculation utilities
 * for tax payment deadlines, overdue calculations, and date ranges.
 */

/**
 * Calculate number of days between two dates
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days between dates
 *
 * @example
 * getDaysBetween(new Date("2024-01-01"), new Date("2024-01-10")) // 9
 */
export function getDaysBetween(
  startDate: Date | string,
  endDate: Date | string
): number {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Calculate overdue days from payment deadline
 *
 * @param dueDate - Payment due date
 * @param currentDate - Current date (defaults to today)
 * @returns Number of overdue days (0 if not overdue)
 *
 * @example
 * getOverdueDays(new Date("2024-01-01")) // Returns days since Jan 1
 * getOverdueDays(new Date("2024-12-31")) // 0 (not overdue yet)
 */
export function getOverdueDays(
  dueDate: Date | string,
  currentDate?: Date | string
): number {
  const due = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const current = currentDate
    ? currentDate instanceof Date
      ? currentDate
      : new Date(currentDate)
    : new Date();

  // If not overdue, return 0
  if (current <= due) {
    return 0;
  }

  return getDaysBetween(due, current);
}

/**
 * Get payment deadline for a tax year
 * PBB payment deadline is September 30th of each year
 *
 * @param taxYear - Tax year (YYYY)
 * @returns Payment deadline date
 *
 * @example
 * getPaymentDeadline(2024) // Date object for Sept 30, 2024
 */
export function getPaymentDeadline(taxYear: number | string): Date {
  const year = typeof taxYear === "string" ? parseInt(taxYear, 10) : taxYear;

  // PBB deadline: September 30th
  return new Date(year, 8, 30); // Month is 0-indexed (8 = September)
}

/**
 * Check if a date is overdue
 *
 * @param dueDate - Payment due date
 * @param currentDate - Current date (defaults to today)
 * @returns True if overdue
 *
 * @example
 * isOverdue(new Date("2024-01-01")) // true (if today > Jan 1)
 */
export function isOverdue(
  dueDate: Date | string,
  currentDate?: Date | string
): boolean {
  return getOverdueDays(dueDate, currentDate) > 0;
}

/**
 * Get overdue category based on days overdue
 *
 * @param overdueDays - Number of days overdue
 * @returns Overdue category
 *
 * @example
 * getOverdueCategory(15) // "1-30"
 * getOverdueCategory(45) // "31-60"
 * getOverdueCategory(100) // "90+"
 */
export function getOverdueCategory(
  overdueDays: number
): "on-time" | "1-30" | "31-60" | "61-90" | "90+" {
  if (overdueDays <= 0) return "on-time";
  if (overdueDays <= 30) return "1-30";
  if (overdueDays <= 60) return "31-60";
  if (overdueDays <= 90) return "61-90";
  return "90+";
}

/**
 * Get start and end date for a tax year
 *
 * @param taxYear - Tax year
 * @returns Object with startDate and endDate
 *
 * @example
 * getTaxYearRange(2024)
 * // { startDate: Date(2024-01-01), endDate: Date(2024-12-31) }
 */
export function getTaxYearRange(taxYear: number | string): {
  startDate: Date;
  endDate: Date;
} {
  const year = typeof taxYear === "string" ? parseInt(taxYear, 10) : taxYear;

  return {
    startDate: new Date(year, 0, 1), // January 1
    endDate: new Date(year, 11, 31, 23, 59, 59), // December 31
  };
}

/**
 * Get current tax year
 *
 * @returns Current tax year (YYYY)
 *
 * @example
 * getCurrentTaxYear() // 2024
 */
export function getCurrentTaxYear(): number {
  return new Date().getFullYear();
}

/**
 * Get array of tax years from start year to current year
 *
 * @param startYear - Starting year (defaults to 2000)
 * @returns Array of tax years in descending order
 *
 * @example
 * getTaxYearList(2020) // [2024, 2023, 2022, 2021, 2020]
 */
export function getTaxYearList(startYear: number = 2000): number[] {
  const currentYear = getCurrentTaxYear();
  const years: number[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
}

/**
 * Check if a date falls within a specific year
 *
 * @param date - Date to check
 * @param year - Year to check against
 * @returns True if date is in the year
 *
 * @example
 * isDateInYear(new Date("2024-06-15"), 2024) // true
 * isDateInYear(new Date("2023-12-31"), 2024) // false
 */
export function isDateInYear(date: Date | string, year: number): boolean {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.getFullYear() === year;
}

/**
 * Add days to a date
 *
 * @param date - Starting date
 * @param days - Number of days to add
 * @returns New date with days added
 *
 * @example
 * addDays(new Date("2024-01-01"), 10) // Date("2024-01-11")
 */
export function addDays(date: Date | string, days: number): Date {
  const result = date instanceof Date ? new Date(date) : new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtract days from a date
 *
 * @param date - Starting date
 * @param days - Number of days to subtract
 * @returns New date with days subtracted
 *
 * @example
 * subtractDays(new Date("2024-01-11"), 10) // Date("2024-01-01")
 */
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

/**
 * Get start of day (00:00:00)
 *
 * @param date - Date to process
 * @returns Date at start of day
 *
 * @example
 * getStartOfDay(new Date("2024-01-15 14:30:00")) // Date("2024-01-15 00:00:00")
 */
export function getStartOfDay(date: Date | string): Date {
  const result = date instanceof Date ? new Date(date) : new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get end of day (23:59:59)
 *
 * @param date - Date to process
 * @returns Date at end of day
 *
 * @example
 * getEndOfDay(new Date("2024-01-15 14:30:00")) // Date("2024-01-15 23:59:59")
 */
export function getEndOfDay(date: Date | string): Date {
  const result = date instanceof Date ? new Date(date) : new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Check if date is valid
 *
 * @param date - Date to validate
 * @returns True if valid date
 *
 * @example
 * isValidDate(new Date("2024-01-15")) // true
 * isValidDate(new Date("invalid")) // false
 */
export function isValidDate(date: Date | string | null | undefined): boolean {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return !isNaN(dateObj.getTime());
}

/**
 * Parse date from various formats
 *
 * @param dateString - Date string to parse
 * @returns Parsed Date object or null if invalid
 *
 * @example
 * parseDate("2024-01-15") // Date object
 * parseDate("15/01/2024") // Date object
 * parseDate("invalid") // null
 */
export function parseDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isValidDate(date) ? date : null;
}

/**
 * Get month name in Indonesian
 *
 * @param monthIndex - Month index (0-11)
 * @returns Indonesian month name
 *
 * @example
 * getMonthName(0) // "Januari"
 * getMonthName(11) // "Desember"
 */
export function getMonthName(monthIndex: number): string {
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return monthNames[monthIndex] || "";
}

/**
 * Get short month name in Indonesian
 *
 * @param monthIndex - Month index (0-11)
 * @returns Short Indonesian month name
 *
 * @example
 * getShortMonthName(0) // "Jan"
 * getShortMonthName(11) // "Des"
 */
export function getShortMonthName(monthIndex: number): string {
  const shortMonthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];

  return shortMonthNames[monthIndex] || "";
}
