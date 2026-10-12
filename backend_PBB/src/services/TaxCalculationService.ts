/**
 * TaxCalculationService
 *
 * Service layer for tax-related calculations and metrics.
 * Handles business logic for collection rates, achievement rates,
 * growth calculations, and compliance metrics.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles tax calculation logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

export interface TaxMetrics {
  target: number;
  realization: number;
  totalNop?: number;
  paidNop?: number;
  unpaidNop?: number;
  paidCount?: number;
  unpaidCount?: number;
  totalCount?: number;
}

export interface CalculatedTaxMetrics extends TaxMetrics {
  collectionRate: number;
  achievementRate?: number;
  complianceRate?: number;
}

export interface TrendData extends CalculatedTaxMetrics {
  year: string;
  targetGrowth: number;
  realizationGrowth: number;
  collectionRateChange: number;
}

export interface RegionalTaxData {
  region: string;
  target: number;
  realization: number;
  paidCount: number;
  unpaidCount: number;
  totalCount: number;
  achievementRate: number;
}

export interface TrendSummary {
  totalYears: number;
  averageCollectionRate: number;
  bestYear: TrendData;
  worstYear: TrendData;
  totalTargetAllYears: number;
  totalRealizationAllYears: number;
}

export class TaxCalculationService {
  /**
   * Default precision for decimal rounding
   */
  private static readonly DEFAULT_PRECISION = 2;

  /**
   * Invalid region identifiers that should be filtered out
   */
  private static readonly INVALID_REGIONS = ["kota mataram", "0", "mtr", "cakranegra"];

  /**
   * Calculates collection rate (realization / target * 100)
   *
   * @param realization - Total amount collected
   * @param target - Target amount to collect
   * @param precision - Number of decimal places (default: 2)
   * @returns Collection rate percentage
   *
   * @example
   * calculateCollectionRate(75000, 100000) // returns 75.00
   * calculateCollectionRate(0, 100000) // returns 0
   * calculateCollectionRate(100000, 0) // returns 0
   */
  static calculateCollectionRate(
    realization: number,
    target: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    if (target <= 0) return 0;
    const rate = (realization / target) * 100;
    return parseFloat(rate.toFixed(precision));
  }

  /**
   * Calculates achievement rate (same as collection rate, different name for clarity)
   * Used in regional analysis contexts
   *
   * @param realization - Total amount collected
   * @param target - Target amount to collect
   * @param precision - Number of decimal places (default: 2)
   * @returns Achievement rate percentage
   */
  static calculateAchievementRate(
    realization: number,
    target: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    return this.calculateCollectionRate(realization, target, precision);
  }

  /**
   * Calculates compliance rate (paid / total * 100)
   *
   * @param paidCount - Number of paid records
   * @param totalCount - Total number of records
   * @param precision - Number of decimal places (default: 2)
   * @returns Compliance rate percentage
   *
   * @example
   * calculateComplianceRate(80, 100) // returns 80.00
   */
  static calculateComplianceRate(
    paidCount: number,
    totalCount: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    if (totalCount <= 0) return 0;
    const rate = (paidCount / totalCount) * 100;
    return parseFloat(rate.toFixed(precision));
  }

  /**
   * Calculates growth rate between current and previous value
   *
   * @param currentValue - Current period value
   * @param previousValue - Previous period value
   * @param precision - Number of decimal places (default: 2)
   * @returns Growth rate percentage (can be negative)
   *
   * @example
   * calculateGrowthRate(120000, 100000) // returns 20.00
   * calculateGrowthRate(80000, 100000) // returns -20.00
   */
  static calculateGrowthRate(
    currentValue: number,
    previousValue: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    if (previousValue <= 0) return 0;
    const growth = ((currentValue - previousValue) / previousValue) * 100;
    return parseFloat(growth.toFixed(precision));
  }

  /**
   * Calculates the difference between two rates
   *
   * @param currentRate - Current rate
   * @param previousRate - Previous rate
   * @param precision - Number of decimal places (default: 2)
   * @returns Rate change (can be negative)
   */
  static calculateRateChange(
    currentRate: number,
    previousRate: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    const change = currentRate - previousRate;
    return parseFloat(change.toFixed(precision));
  }

  /**
   * Processes raw tax data and calculates all metrics
   *
   * @param rawData - Raw tax data with target and realization
   * @returns Calculated tax metrics with all rates
   */
  static processBasicMetrics(rawData: TaxMetrics): CalculatedTaxMetrics {
    const target = parseFloat(String(rawData.target)) || 0;
    const realization = parseFloat(String(rawData.realization)) || 0;
    const totalNop = rawData.totalNop ? parseInt(String(rawData.totalNop)) : undefined;
    const paidNop = rawData.paidNop ? parseInt(String(rawData.paidNop)) : undefined;

    const collectionRate = this.calculateCollectionRate(realization, target);
    const complianceRate =
      totalNop !== undefined && paidNop !== undefined
        ? this.calculateComplianceRate(paidNop, totalNop)
        : undefined;

    return {
      target,
      realization,
      totalNop,
      paidNop,
      unpaidNop: totalNop && paidNop ? totalNop - paidNop : undefined,
      collectionRate,
      complianceRate,
    };
  }

  /**
   * Processes trend data with growth calculations
   *
   * @param rawDataArray - Array of raw data ordered by year
   * @returns Array of trend data with growth metrics
   */
  static processTrendData(
    rawDataArray: Array<{
      year: string;
      target: number | string;
      realization: number | string;
      totalNop?: number | string;
      paidNop?: number | string;
    }>
  ): TrendData[] {
    return rawDataArray.map((item, index) => {
      const target = parseFloat(String(item.target)) || 0;
      const realization = parseFloat(String(item.realization)) || 0;
      const totalNop = item.totalNop ? parseInt(String(item.totalNop)) : 0;
      const paidNop = item.paidNop ? parseInt(String(item.paidNop)) : 0;

      const collectionRate = this.calculateCollectionRate(realization, target);
      const complianceRate = this.calculateComplianceRate(paidNop, totalNop);

      // Calculate growth metrics
      let targetGrowth = 0;
      let realizationGrowth = 0;
      let collectionRateChange = 0;

      if (index > 0) {
        const prevTarget = parseFloat(String(rawDataArray[index - 1].target)) || 0;
        const prevRealization = parseFloat(String(rawDataArray[index - 1].realization)) || 0;
        const prevCollectionRate = this.calculateCollectionRate(prevRealization, prevTarget);

        targetGrowth = this.calculateGrowthRate(target, prevTarget);
        realizationGrowth = this.calculateGrowthRate(realization, prevRealization);
        collectionRateChange = this.calculateRateChange(collectionRate, prevCollectionRate);
      }

      return {
        year: item.year,
        target,
        realization,
        totalNop,
        paidNop,
        unpaidNop: totalNop - paidNop,
        collectionRate,
        complianceRate,
        targetGrowth,
        realizationGrowth,
        collectionRateChange,
      };
    });
  }

  /**
   * Calculates summary statistics from trend data
   *
   * @param trendsData - Array of trend data
   * @returns Summary with aggregated metrics
   */
  static calculateTrendSummary(trendsData: TrendData[]): TrendSummary {
    if (trendsData.length === 0) {
      throw new Error("Cannot calculate summary from empty trend data");
    }

    const totalYears = trendsData.length;

    const averageCollectionRate =
      trendsData.reduce((sum, item) => sum + item.collectionRate, 0) / totalYears;

    const bestYear = trendsData.reduce(
      (best, item) => (item.collectionRate > best.collectionRate ? item : best),
      trendsData[0]
    );

    const worstYear = trendsData.reduce(
      (worst, item) => (item.collectionRate < worst.collectionRate ? item : worst),
      trendsData[0]
    );

    const totalTargetAllYears = trendsData.reduce((sum, item) => sum + item.target, 0);

    const totalRealizationAllYears = trendsData.reduce((sum, item) => sum + item.realization, 0);

    return {
      totalYears,
      averageCollectionRate: parseFloat(averageCollectionRate.toFixed(this.DEFAULT_PRECISION)),
      bestYear,
      worstYear,
      totalTargetAllYears,
      totalRealizationAllYears,
    };
  }

  /**
   * Processes regional tax data with achievement rates
   *
   * @param rawRegionalData - Array of raw regional data
   * @returns Array of processed regional data with achievement rates
   */
  static processRegionalData(
    rawRegionalData: Array<{
      region: string;
      target: number | string;
      realization: number | string;
      paidCount: number | string;
      unpaidCount: number | string;
      totalCount: number | string;
    }>
  ): RegionalTaxData[] {
    return rawRegionalData.map((item) => {
      const target = parseFloat(String(item.target)) || 0;
      const realization = parseFloat(String(item.realization)) || 0;
      const achievementRate = this.calculateAchievementRate(realization, target);

      return {
        region: item.region,
        target,
        realization,
        paidCount: parseInt(String(item.paidCount)) || 0,
        unpaidCount: parseInt(String(item.unpaidCount)) || 0,
        totalCount: parseInt(String(item.totalCount)) || 0,
        achievementRate,
      };
    });
  }

  /**
   * Filters out invalid region names
   *
   * @param regionName - Region name to check
   * @returns True if valid, false if invalid
   */
  static isValidRegion(regionName: string): boolean {
    if (!regionName || regionName.trim() === "") return false;

    const lowerName = regionName.toLowerCase().trim();
    return !this.INVALID_REGIONS.includes(lowerName);
  }

  /**
   * Filters an array of items by valid region names
   *
   * @param items - Array of items with region property
   * @returns Filtered array with only valid regions
   */
  static filterValidRegions<T extends { region: string }>(items: T[]): T[] {
    return items.filter((item) => this.isValidRegion(item.region));
  }

  /**
   * Filters an array of string region names
   *
   * @param regionNames - Array of region names
   * @returns Filtered array with only valid region names
   */
  static filterValidRegionNames(regionNames: string[]): string[] {
    return regionNames.filter((name) => this.isValidRegion(name));
  }

  /**
   * Calculates unpaid count from total and paid counts
   *
   * @param totalCount - Total number of records
   * @param paidCount - Number of paid records
   * @returns Number of unpaid records
   */
  static calculateUnpaidCount(totalCount: number, paidCount: number): number {
    return Math.max(0, totalCount - paidCount);
  }

  /**
   * Safely parses numeric values with fallback
   *
   * @param value - Value to parse
   * @param defaultValue - Default value if parsing fails
   * @returns Parsed number or default
   */
  static parseNumeric(value: any, defaultValue: number = 0): number {
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Safely parses integer values with fallback
   *
   * @param value - Value to parse
   * @param defaultValue - Default value if parsing fails
   * @returns Parsed integer or default
   */
  static parseInteger(value: any, defaultValue: number = 0): number {
    const parsed = parseInt(String(value));
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Rounds a number to specified precision
   *
   * @param value - Number to round
   * @param precision - Number of decimal places
   * @returns Rounded number
   */
  static roundToPrecision(value: number, precision: number = this.DEFAULT_PRECISION): number {
    return parseFloat(value.toFixed(precision));
  }
}
