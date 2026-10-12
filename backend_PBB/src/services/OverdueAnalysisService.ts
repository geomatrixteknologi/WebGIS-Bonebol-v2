/**
 * OverdueAnalysisService
 *
 * Service layer for analyzing overdue tax payments.
 * Handles business logic for severity calculation, data aggregation,
 * and processing of overdue records.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles overdue analysis logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

export type SeverityLevel = "critical" | "high" | "medium" | "low";

export interface SeverityThresholds {
  readonly CRITICAL: number; // days
  readonly HIGH: number;
  readonly MEDIUM: number;
}

export interface SeverityCount {
  count: number;
  amount: number;
  daysAvg?: number;
}

export interface SeverityGroups {
  critical: SeverityCount;
  high: SeverityCount;
  medium: SeverityCount;
  low: SeverityCount;
}

export interface RegionalData {
  region: string;
  count: number;
  amount: number;
}

export interface RegionalSeverityData {
  region: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  totalAmount: number;
}

export interface UnpaidRecord {
  nop: string;
  nmWpSppt?: string | null;
  kdKecamatan?: string | null;
  kdKelurahan?: string | null;
  opAlamat?: string | null;
  thnPajakSppt: string;
  tglJatuhTempoSppt: Date | string | null;
  pbbYgHarusDibayarSppt: number | string | null;
  pbbTerhutangSppt?: number | string | null;
}

export interface NopAggregation {
  nop: string;
  nmWpSppt: string;
  kdKecamatan: string;
  kdKelurahan: string;
  opAlamat?: string;
  years: string[];
  oldestDueDate: Date;
  totalAmount: number;
  totalPenalty: number;
}

export interface ProcessedOverdueRecord extends NopAggregation {
  daysOverdue: number;
  severity: SeverityLevel;
  totalOwed: number;
  yearCount: number;
  yearsList?: string;
  oldestYear?: string;
}

export class OverdueAnalysisService {
  /**
   * Severity thresholds in days
   * CRITICAL: > 5 years (1825 days)
   * HIGH: > 3 years (1095 days)
   * MEDIUM: > 1 year (365 days)
   * LOW: < 1 year
   */
  private static readonly SEVERITY_THRESHOLDS: SeverityThresholds = {
    CRITICAL: 1825, // 5 years
    HIGH: 1095, // 3 years
    MEDIUM: 365, // 1 year
  } as const;

  /**
   * Invalid region identifiers that should be filtered out
   */
  private static readonly INVALID_REGIONS = ["kota mataram", "0", "mtr", "cakranegra"];

  /**
   * Calculates severity level based on days overdue
   *
   * @param daysOverdue - Number of days the payment is overdue
   * @returns Severity level (critical, high, medium, or low)
   *
   * @example
   * calculateSeverity(2000) // returns "critical"
   * calculateSeverity(500) // returns "medium"
   */
  static calculateSeverity(daysOverdue: number): SeverityLevel {
    if (daysOverdue > this.SEVERITY_THRESHOLDS.CRITICAL) return "critical";
    if (daysOverdue > this.SEVERITY_THRESHOLDS.HIGH) return "high";
    if (daysOverdue > this.SEVERITY_THRESHOLDS.MEDIUM) return "medium";
    return "low";
  }

  /**
   * Calculates the number of days between two dates
   *
   * @param dueDate - The original due date
   * @param currentDate - The current date (defaults to today)
   * @returns Number of days overdue
   */
  static calculateDaysOverdue(dueDate: Date, currentDate: Date = new Date()): number {
    const timeDiff = currentDate.getTime() - dueDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  /**
   * Aggregates unpaid records by NOP (Nomor Objek Pajak)
   * Combines multiple years of unpaid taxes for the same NOP
   *
   * @param unpaidRecords - Array of unpaid tax records
   * @param lastPaidMap - Map of NOP to last paid year
   * @param yearFilter - Optional year filter
   * @returns Map of NOP to aggregated data
   */
  static aggregateByNop(unpaidRecords: UnpaidRecord[], lastPaidMap: Record<string, string | null>, yearFilter?: string | null): Record<string, NopAggregation> {
    const nopMap: Record<string, NopAggregation> = {};

    unpaidRecords.forEach((record) => {
      const lastPaidYear = lastPaidMap[record.nop];
      const recordYear = record.thnPajakSppt;

      // Skip if this year was already paid
      if (lastPaidYear && recordYear <= lastPaidYear) {
        return;
      }

      // Apply year filter if provided
      if (yearFilter && yearFilter !== "all" && recordYear !== yearFilter) {
        return;
      }

      // Skip if tglJatuhTempoSppt is null
      if (!record.tglJatuhTempoSppt) {
        return;
      }

      // Initialize NOP entry if it doesn't exist
      if (!nopMap[record.nop]) {
        nopMap[record.nop] = {
          nop: record.nop,
          nmWpSppt: record.nmWpSppt || "",
          kdKecamatan: record.kdKecamatan || "",
          kdKelurahan: record.kdKelurahan || "",
          // opAlamat: record.opAlamat || "",
          years: [],
          oldestDueDate: new Date(record.tglJatuhTempoSppt),
          totalAmount: 0,
          totalPenalty: 0,
        };
      }

      const nopData = nopMap[record.nop];
      nopData.years.push(recordYear);

      // Update oldest due date
      const dueDate = new Date(record.tglJatuhTempoSppt);
      if (dueDate < nopData.oldestDueDate) {
        nopData.oldestDueDate = dueDate;
      }

      // Accumulate amounts
      nopData.totalAmount += parseFloat(String(record.pbbYgHarusDibayarSppt || 0)) || 0;
      nopData.totalPenalty += parseFloat(String(record.pbbTerhutangSppt || 0)) || 0;
    });

    return nopMap;
  }

  /**
   * Processes aggregated NOP data to calculate overdue information
   *
   * @param nopMap - Map of aggregated NOP data
   * @param currentDate - Current date for calculation (defaults to today)
   * @returns Array of processed overdue records with severity and days overdue
   */
  static processOverdueRecords(nopMap: Record<string, NopAggregation>, currentDate: Date = new Date()): ProcessedOverdueRecord[] {
    return Object.values(nopMap).map((nopData) => {
      const daysOverdue = this.calculateDaysOverdue(nopData.oldestDueDate, currentDate);
      const severity = this.calculateSeverity(daysOverdue);

      return {
        ...nopData,
        daysOverdue,
        severity,
        totalOwed: nopData.totalAmount + nopData.totalPenalty,
        yearCount: nopData.years.length,
        yearsList: nopData.years.sort().join(", "),
        oldestYear: nopData.years.sort()[0],
      };
    });
  }

  /**
   * Groups processed records by severity level
   * Calculates count, total amount, and average days for each severity
   *
   * @param processedRecords - Array of processed overdue records
   * @returns Severity groups with aggregated statistics
   */
  static groupBySeverity(processedRecords: ProcessedOverdueRecord[]): SeverityGroups {
    const bySeverity: SeverityGroups = {
      critical: { count: 0, amount: 0, daysAvg: 0 },
      high: { count: 0, amount: 0, daysAvg: 0 },
      medium: { count: 0, amount: 0, daysAvg: 0 },
      low: { count: 0, amount: 0, daysAvg: 0 },
    };

    // Accumulate totals
    const daysTotals: Record<SeverityLevel, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    processedRecords.forEach((record) => {
      bySeverity[record.severity].count++;
      bySeverity[record.severity].amount += record.totalOwed;
      daysTotals[record.severity] += record.daysOverdue;
    });

    // Calculate averages
    (Object.keys(bySeverity) as SeverityLevel[]).forEach((severity) => {
      if (bySeverity[severity].count > 0) {
        bySeverity[severity].daysAvg = Math.round(daysTotals[severity] / bySeverity[severity].count);
      }
    });

    return bySeverity;
  }

  /**
   * Aggregates processed records by region (kecamatan)
   *
   * @param processedRecords - Array of processed overdue records
   * @returns Array of regional data sorted by count (descending)
   */
  static aggregateByRegion(processedRecords: ProcessedOverdueRecord[]): RegionalData[] {
    const regionMap: Record<string, { count: number; amount: number }> = {};

    processedRecords.forEach((record) => {
      const region = record.kdKecamatan || "Unknown";

      if (!regionMap[region]) {
        regionMap[region] = { count: 0, amount: 0 };
      }

      regionMap[region].count++;
      regionMap[region].amount += record.totalOwed;
    });

    return Object.entries(regionMap)
      .map(([region, data]) => ({
        region,
        count: data.count,
        amount: data.amount,
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Aggregates processed records by region with severity breakdown
   * Filters out invalid regions
   *
   * @param processedRecords - Array of processed overdue records
   * @returns Array of regional severity data sorted by critical count
   */
  static aggregateByRegionWithSeverity(processedRecords: ProcessedOverdueRecord[]): RegionalSeverityData[] {
    const regionMap: Record<
      string,
      {
        critical: number;
        high: number;
        medium: number;
        low: number;
        totalAmount: number;
      }
    > = {};

    processedRecords.forEach((record) => {
      const region = record.kdKecamatan || "Unknown";

      if (!regionMap[region]) {
        regionMap[region] = {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          totalAmount: 0,
        };
      }

      // Increment severity count
      regionMap[region][record.severity]++;
      regionMap[region].totalAmount += record.totalOwed;
    });

    // Filter invalid regions and map to output format
    return Object.entries(regionMap)
      .filter(([region]) => {
        const lowerRegion = region?.toLowerCase().trim();
        return !this.INVALID_REGIONS.includes(lowerRegion);
      })
      .map(([region, data]) => ({
        region,
        ...data,
      }))
      .sort((a, b) => b.critical - a.critical);
  }

  /**
   * Aggregates processed overdue records by KELURAHAN (desa) code, with a
   * per-severity breakdown. Used by the AI /ai/overdue/kelurahan endpoint to
   * answer "desa mana paling parah tunggakannya" in a single query (the AI
   * service previously had to loop one request per kelurahan).
   */
  static aggregateByKelurahanWithSeverity(
    processedRecords: ProcessedOverdueRecord[]
  ): Array<{
    kdKelurahan: string;
    count: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    totalAmount: number;
  }> {
    const map: Record<
      string,
      { count: number; critical: number; high: number; medium: number; low: number; totalAmount: number }
    > = {};

    processedRecords.forEach((record) => {
      const key = record.kdKelurahan || "Unknown";
      if (!map[key]) {
        map[key] = { count: 0, critical: 0, high: 0, medium: 0, low: 0, totalAmount: 0 };
      }
      map[key].count++;
      map[key][record.severity]++;
      map[key].totalAmount += record.totalOwed;
    });

    return Object.entries(map)
      .map(([kdKelurahan, data]) => ({ kdKelurahan, ...data }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }

  /**
   * Filters processed records by severity level
   *
   * @param processedRecords - Array of processed overdue records
   * @param severityFilter - Severity level to filter by (or "all")
   * @returns Filtered array of records
   */
  static filterBySeverity(processedRecords: ProcessedOverdueRecord[], severityFilter?: string | null): ProcessedOverdueRecord[] {
    if (!severityFilter || severityFilter === "all") {
      return processedRecords;
    }

    return processedRecords.filter((record) => record.severity === severityFilter);
  }

  /**
   * Sorts processed records by specified field and order
   *
   * @param processedRecords - Array of processed overdue records
   * @param sortBy - Field to sort by (daysOverdue, amount, totalOwed)
   * @param sortOrder - Sort order (ASC or DESC)
   * @returns Sorted array of records
   */
  static sortRecords(processedRecords: ProcessedOverdueRecord[], sortBy: string = "daysOverdue", sortOrder: string = "DESC"): ProcessedOverdueRecord[] {
    return [...processedRecords].sort((a, b) => {
      let compareValue = 0;

      if (sortBy === "daysOverdue") {
        compareValue = a.daysOverdue - b.daysOverdue;
      } else if (sortBy === "amount" || sortBy === "totalOwed") {
        compareValue = a.totalOwed - b.totalOwed;
      }

      return sortOrder === "DESC" ? -compareValue : compareValue;
    });
  }

  /**
   * Paginates an array of records
   *
   * @param records - Array of records to paginate
   * @param page - Page number (1-indexed)
   * @param limit - Number of records per page
   * @returns Paginated subset of records
   */
  static paginateRecords<T>(records: T[], page: number, limit: number): T[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return records.slice(startIndex, endIndex);
  }

  /**
   * Calculates total pages for pagination
   *
   * @param totalRecords - Total number of records
   * @param limit - Number of records per page
   * @returns Total number of pages
   */
  static calculateTotalPages(totalRecords: number, limit: number): number {
    return Math.ceil(totalRecords / limit);
  }

  /**
   * Calculates total amounts from processed records
   *
   * @param processedRecords - Array of processed overdue records
   * @returns Object with totalAmount and totalPenalty
   */
  static calculateTotals(processedRecords: ProcessedOverdueRecord[]): {
    totalAmount: number;
    totalPenalty: number;
  } {
    let totalAmount = 0;
    let totalPenalty = 0;

    processedRecords.forEach((record) => {
      totalAmount += record.totalAmount;
      totalPenalty += record.totalPenalty;
    });

    return { totalAmount, totalPenalty };
  }
}
