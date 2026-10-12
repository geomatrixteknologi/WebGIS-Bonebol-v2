/**
 * PaymentAnalysisService
 *
 * Service layer for payment analysis and timing calculations.
 * Handles business logic for payment lateness, on-time rates,
 * monthly distributions, and payment status aggregations.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles payment analysis logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

export type PaymentStatus = "paid" | "unpaid";
export type LatenessCategory = "onTime" | "late1to30" | "late31to60" | "late61to90" | "lateOver90";

export interface PaymentRecord {
  paymentDate: Date | string;
  dueDate: Date | string;
  amount: number | string;
  year?: string;
}

export interface PaymentTimingData {
  onTime: number;
  late1to30: number;
  late31to60: number;
  late61to90: number;
  lateOver90: number;
  onTimeAmount: number;
  lateAmount: number;
  totalPaid: number;
  totalAmount: number;
}

export interface PaymentTimingSummary extends PaymentTimingData {
  onTimeRate: number;
  lateRate: number;
}

export interface MonthlyDistribution {
  month: string;
  count: number;
}

export interface PaymentTimingResult {
  summary: PaymentTimingSummary;
  monthlyDistribution: MonthlyDistribution[];
}

export class PaymentAnalysisService {
  /**
   * Lateness thresholds in days
   */
  private static readonly LATENESS_THRESHOLDS = {
    CATEGORY_1: 30,  // 1-30 days
    CATEGORY_2: 60,  // 31-60 days
    CATEGORY_3: 90,  // 61-90 days
  } as const;

  /**
   * Default precision for percentage calculations
   */
  private static readonly DEFAULT_PRECISION = 2;

  /**
   * Calculates the number of days between payment date and due date
   * Positive value = late payment
   * Negative/zero value = on-time payment
   *
   * @param paymentDate - Date when payment was made
   * @param dueDate - Date when payment was due
   * @returns Number of days (positive if late, negative/zero if on-time)
   */
  static calculateDaysLate(paymentDate: Date, dueDate: Date): number {
    const diffTime = paymentDate.getTime() - dueDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Categorizes payment lateness based on days late
   *
   * @param daysLate - Number of days late (positive = late, negative/zero = on-time)
   * @returns Lateness category
   *
   * @example
   * categorizeLatePayment(-5) // returns "onTime"
   * categorizeLatePayment(15) // returns "late1to30"
   * categorizeLatePayment(45) // returns "late31to60"
   * categorizeLatePayment(100) // returns "lateOver90"
   */
  static categorizeLatePayment(daysLate: number): LatenessCategory {
    if (daysLate <= 0) return "onTime";
    if (daysLate <= this.LATENESS_THRESHOLDS.CATEGORY_1) return "late1to30";
    if (daysLate <= this.LATENESS_THRESHOLDS.CATEGORY_2) return "late31to60";
    if (daysLate <= this.LATENESS_THRESHOLDS.CATEGORY_3) return "late61to90";
    return "lateOver90";
  }

  /**
   * Checks if a payment was made on time
   *
   * @param paymentDate - Date when payment was made
   * @param dueDate - Date when payment was due
   * @returns True if payment was on time or early
   */
  static isOnTimePayment(paymentDate: Date, dueDate: Date): boolean {
    return this.calculateDaysLate(paymentDate, dueDate) <= 0;
  }

  /**
   * Formats date to YYYY-MM format for monthly grouping
   *
   * @param date - Date to format
   * @returns Formatted month string (e.g., "2024-03")
   */
  static formatToMonthKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  /**
   * Processes payment records and calculates timing statistics
   *
   * @param paymentRecords - Array of payment records with dates and amounts
   * @param yearFilter - Optional year filter for monthly distribution
   * @returns Payment timing data with categorized payments
   */
  static processPaymentTiming(
    paymentRecords: PaymentRecord[],
    yearFilter?: string
  ): PaymentTimingResult {
    // Initialize counters
    const timingData: PaymentTimingData = {
      onTime: 0,
      late1to30: 0,
      late31to60: 0,
      late61to90: 0,
      lateOver90: 0,
      onTimeAmount: 0,
      lateAmount: 0,
      totalPaid: paymentRecords.length,
      totalAmount: 0,
    };

    const monthlyDistribution: { [key: string]: number } = {};

    // Process each payment record
    paymentRecords.forEach((record) => {
      const paymentDate = new Date(record.paymentDate);
      const dueDate = new Date(record.dueDate);
      const amount = parseFloat(String(record.amount)) || 0;

      timingData.totalAmount += amount;

      // Calculate lateness
      const daysLate = this.calculateDaysLate(paymentDate, dueDate);
      const category = this.categorizeLatePayment(daysLate);

      // Update category counters
      if (category === "onTime") {
        timingData.onTime++;
        timingData.onTimeAmount += amount;
      } else {
        timingData.lateAmount += amount;
        timingData[category]++;
      }

      // Update monthly distribution
      const paymentYear = paymentDate.getFullYear().toString();
      if (!yearFilter || paymentYear === yearFilter) {
        const monthKey = this.formatToMonthKey(paymentDate);
        monthlyDistribution[monthKey] = (monthlyDistribution[monthKey] || 0) + 1;
      }
    });

    // Convert monthly distribution to array and sort
    const monthlyArray = Object.entries(monthlyDistribution)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Calculate rates
    const onTimeRate = this.calculateOnTimeRate(timingData.onTime, timingData.totalPaid);
    const lateRate = 100 - onTimeRate;

    return {
      summary: {
        ...timingData,
        onTimeRate: parseFloat(onTimeRate.toFixed(this.DEFAULT_PRECISION)),
        lateRate: parseFloat(lateRate.toFixed(this.DEFAULT_PRECISION)),
      },
      monthlyDistribution: monthlyArray,
    };
  }

  /**
   * Calculates on-time payment rate
   *
   * @param onTimeCount - Number of on-time payments
   * @param totalCount - Total number of payments
   * @param precision - Decimal precision (default: 2)
   * @returns On-time rate percentage
   */
  static calculateOnTimeRate(
    onTimeCount: number,
    totalCount: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    if (totalCount <= 0) return 0;
    const rate = (onTimeCount / totalCount) * 100;
    return parseFloat(rate.toFixed(precision));
  }

  /**
   * Calculates late payment rate
   *
   * @param lateCount - Number of late payments
   * @param totalCount - Total number of payments
   * @param precision - Decimal precision (default: 2)
   * @returns Late payment rate percentage
   */
  static calculateLateRate(
    lateCount: number,
    totalCount: number,
    precision: number = this.DEFAULT_PRECISION
  ): number {
    if (totalCount <= 0) return 0;
    const rate = (lateCount / totalCount) * 100;
    return parseFloat(rate.toFixed(precision));
  }

  /**
   * Creates a payment status map from an array of records
   *
   * @param paymentData - Array of records with nop and paymentFlag
   * @returns Map of NOP to payment status
   */
  static createPaymentStatusMap(
    paymentData: Array<{ nop: string; paymentFlag: number | null }>
  ): Record<string, PaymentStatus> {
    return paymentData.reduce((acc, item) => {
      acc[item.nop] = item.paymentFlag === 1 ? "paid" : "unpaid";
      return acc;
    }, {} as Record<string, PaymentStatus>);
  }

  /**
   * Counts payments by status
   *
   * @param paymentData - Array of records with paymentFlag
   * @returns Object with paid and unpaid counts
   */
  static countPaymentsByStatus(
    paymentData: Array<{ paymentFlag: number | null }>
  ): { paid: number; unpaid: number } {
    let paid = 0;
    let unpaid = 0;

    paymentData.forEach((item) => {
      if (item.paymentFlag === 1) {
        paid++;
      } else {
        unpaid++;
      }
    });

    return { paid, unpaid };
  }

  /**
   * Filters payment records by date range
   *
   * @param records - Array of payment records
   * @param startDate - Start date (inclusive)
   * @param endDate - End date (inclusive)
   * @returns Filtered records within date range
   */
  static filterByDateRange(
    records: PaymentRecord[],
    startDate: Date,
    endDate: Date
  ): PaymentRecord[] {
    return records.filter((record) => {
      const paymentDate = new Date(record.paymentDate);
      return paymentDate >= startDate && paymentDate <= endDate;
    });
  }

  /**
   * Groups payment records by month
   *
   * @param records - Array of payment records
   * @returns Map of month key to records
   */
  static groupByMonth(
    records: PaymentRecord[]
  ): Record<string, PaymentRecord[]> {
    return records.reduce((acc, record) => {
      const monthKey = this.formatToMonthKey(new Date(record.paymentDate));
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(record);
      return acc;
    }, {} as Record<string, PaymentRecord[]>);
  }

  /**
   * Calculates average payment delay
   *
   * @param records - Array of payment records
   * @returns Average number of days late (can be negative for early payments)
   */
  static calculateAverageDelay(records: PaymentRecord[]): number {
    if (records.length === 0) return 0;

    const totalDelay = records.reduce((sum, record) => {
      const paymentDate = new Date(record.paymentDate);
      const dueDate = new Date(record.dueDate);
      return sum + this.calculateDaysLate(paymentDate, dueDate);
    }, 0);

    return Math.round(totalDelay / records.length);
  }

  /**
   * Gets lateness distribution percentages
   *
   * @param timingData - Payment timing data
   * @returns Object with percentage for each lateness category
   */
  static getLatenessDistribution(timingData: PaymentTimingData): Record<LatenessCategory, number> {
    const total = timingData.totalPaid;
    if (total === 0) {
      return {
        onTime: 0,
        late1to30: 0,
        late31to60: 0,
        late61to90: 0,
        lateOver90: 0,
      };
    }

    return {
      onTime: parseFloat(((timingData.onTime / total) * 100).toFixed(this.DEFAULT_PRECISION)),
      late1to30: parseFloat(((timingData.late1to30 / total) * 100).toFixed(this.DEFAULT_PRECISION)),
      late31to60: parseFloat(((timingData.late31to60 / total) * 100).toFixed(this.DEFAULT_PRECISION)),
      late61to90: parseFloat(((timingData.late61to90 / total) * 100).toFixed(this.DEFAULT_PRECISION)),
      lateOver90: parseFloat(((timingData.lateOver90 / total) * 100).toFixed(this.DEFAULT_PRECISION)),
    };
  }
}
