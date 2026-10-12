/**
 * DataAggregationService
 *
 * Service layer for common data aggregation patterns.
 * Handles business logic for building last payment maps,
 * grouping data by keys, and common reduce operations.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles data aggregation logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

export interface LastPaymentRecord {
  nop: string;
  lastPaidYear: string | null;
}

export interface GroupedData<T> {
  [key: string]: T[];
}

export interface CountMap {
  [key: string]: number;
}

export interface SumMap {
  [key: string]: number;
}

export class DataAggregationService {
  /**
   * Builds a map of NOP to last paid year from raw query results
   *
   * @param lastPaymentRecords - Array of records with nop and lastPaidYear
   * @returns Map of NOP to last paid year
   *
   * @example
   * const map = buildLastPaidMap([
   *   { nop: "123", lastPaidYear: "2023" },
   *   { nop: "456", lastPaidYear: null }
   * ]);
   * // Returns: { "123": "2023", "456": null }
   */
  static buildLastPaidMap(lastPaymentRecords: LastPaymentRecord[]): Record<string, string | null> {
    const lastPaidMap: Record<string, string | null> = {};

    lastPaymentRecords.forEach((record) => {
      lastPaidMap[record.nop] = record.lastPaidYear;
    });

    return lastPaidMap;
  }

  /**
   * Groups an array of items by a specified key
   *
   * @param items - Array of items to group
   * @param keySelector - Function that returns the grouping key for each item
   * @returns Object with keys mapping to arrays of items
   *
   * @example
   * const data = [
   *   { region: "A", value: 10 },
   *   { region: "A", value: 20 },
   *   { region: "B", value: 30 }
   * ];
   * const grouped = groupBy(data, item => item.region);
   * // Returns: { "A": [{ region: "A", value: 10 }, { region: "A", value: 20 }], "B": [...] }
   */
  static groupBy<T>(items: T[], keySelector: (item: T) => string): GroupedData<T> {
    return items.reduce((acc, item) => {
      const key = keySelector(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as GroupedData<T>);
  }

  /**
   * Counts occurrences of each unique value from key selector
   *
   * @param items - Array of items to count
   * @param keySelector - Function that returns the key to count for each item
   * @returns Object with keys mapping to counts
   *
   * @example
   * const data = [
   *   { status: "paid" },
   *   { status: "paid" },
   *   { status: "unpaid" }
   * ];
   * const counts = countBy(data, item => item.status);
   * // Returns: { "paid": 2, "unpaid": 1 }
   */
  static countBy<T>(items: T[], keySelector: (item: T) => string): CountMap {
    return items.reduce((acc, item) => {
      const key = keySelector(item);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as CountMap);
  }

  /**
   * Sums numeric values grouped by a key
   *
   * @param items - Array of items to sum
   * @param keySelector - Function that returns the grouping key
   * @param valueSelector - Function that returns the numeric value to sum
   * @returns Object with keys mapping to summed values
   *
   * @example
   * const data = [
   *   { region: "A", amount: 100 },
   *   { region: "A", amount: 200 },
   *   { region: "B", amount: 150 }
   * ];
   * const sums = sumBy(data, item => item.region, item => item.amount);
   * // Returns: { "A": 300, "B": 150 }
   */
  static sumBy<T>(
    items: T[],
    keySelector: (item: T) => string,
    valueSelector: (item: T) => number
  ): SumMap {
    return items.reduce((acc, item) => {
      const key = keySelector(item);
      const value = valueSelector(item);
      acc[key] = (acc[key] || 0) + value;
      return acc;
    }, {} as SumMap);
  }

  /**
   * Creates a lookup map from an array
   *
   * @param items - Array of items
   * @param keySelector - Function that returns the key for each item
   * @param valueSelector - Optional function to transform the value (defaults to identity)
   * @returns Object with keys mapping to values
   *
   * @example
   * const data = [
   *   { id: "1", name: "Alice" },
   *   { id: "2", name: "Bob" }
   * ];
   * const map = createLookupMap(data, item => item.id, item => item.name);
   * // Returns: { "1": "Alice", "2": "Bob" }
   */
  static createLookupMap<T, V = T>(
    items: T[],
    keySelector: (item: T) => string,
    valueSelector?: (item: T) => V
  ): Record<string, V> {
    const selector = valueSelector || ((item: T) => item as unknown as V);

    return items.reduce((acc, item) => {
      const key = keySelector(item);
      acc[key] = selector(item);
      return acc;
    }, {} as Record<string, V>);
  }

  /**
   * Finds the minimum value in an array based on a selector
   *
   * @param items - Array of items
   * @param valueSelector - Function that returns the comparable value
   * @returns The item with the minimum value, or undefined if array is empty
   *
   * @example
   * const data = [
   *   { date: new Date("2023-01-01") },
   *   { date: new Date("2022-01-01") },
   *   { date: new Date("2024-01-01") }
   * ];
   * const oldest = findMin(data, item => item.date.getTime());
   * // Returns: { date: new Date("2022-01-01") }
   */
  static findMin<T>(items: T[], valueSelector: (item: T) => number): T | undefined {
    if (items.length === 0) return undefined;

    return items.reduce((min, item) => {
      const value = valueSelector(item);
      const minValue = valueSelector(min);
      return value < minValue ? item : min;
    }, items[0]);
  }

  /**
   * Finds the maximum value in an array based on a selector
   *
   * @param items - Array of items
   * @param valueSelector - Function that returns the comparable value
   * @returns The item with the maximum value, or undefined if array is empty
   */
  static findMax<T>(items: T[], valueSelector: (item: T) => number): T | undefined {
    if (items.length === 0) return undefined;

    return items.reduce((max, item) => {
      const value = valueSelector(item);
      const maxValue = valueSelector(max);
      return value > maxValue ? item : max;
    }, items[0]);
  }

  /**
   * Aggregates data with custom reducer function
   *
   * @param items - Array of items to aggregate
   * @param keySelector - Function that returns the grouping key
   * @param initialValue - Initial value for the aggregation
   * @param reducer - Function to aggregate values
   * @returns Object with keys mapping to aggregated values
   *
   * @example
   * const data = [
   *   { region: "A", count: 5, amount: 100 },
   *   { region: "A", count: 3, amount: 200 },
   *   { region: "B", count: 2, amount: 150 }
   * ];
   * const aggregated = aggregateBy(
   *   data,
   *   item => item.region,
   *   { totalCount: 0, totalAmount: 0 },
   *   (acc, item) => ({
   *     totalCount: acc.totalCount + item.count,
   *     totalAmount: acc.totalAmount + item.amount
   *   })
   * );
   * // Returns: { "A": { totalCount: 8, totalAmount: 300 }, "B": { ... } }
   */
  static aggregateBy<T, R>(
    items: T[],
    keySelector: (item: T) => string,
    initialValue: R,
    reducer: (accumulator: R, item: T) => R
  ): Record<string, R> {
    return items.reduce((acc, item) => {
      const key = keySelector(item);
      if (!acc[key]) {
        acc[key] = { ...initialValue };
      }
      acc[key] = reducer(acc[key], item);
      return acc;
    }, {} as Record<string, R>);
  }

  /**
   * Converts a map/object to a sorted array
   *
   * @param map - Object to convert
   * @param sortBy - Optional sort function (defaults to no sorting)
   * @returns Array of { key, value } objects
   *
   * @example
   * const map = { "A": 100, "B": 200, "C": 150 };
   * const sorted = mapToSortedArray(map, (a, b) => b.value - a.value);
   * // Returns: [{ key: "B", value: 200 }, { key: "C", value: 150 }, { key: "A", value: 100 }]
   */
  static mapToSortedArray<V>(
    map: Record<string, V>,
    sortBy?: (a: { key: string; value: V }, b: { key: string; value: V }) => number
  ): Array<{ key: string; value: V }> {
    const array = Object.entries(map).map(([key, value]) => ({ key, value }));

    if (sortBy) {
      array.sort(sortBy);
    }

    return array;
  }

  /**
   * Filters items and returns unique values based on key selector
   *
   * @param items - Array of items
   * @param keySelector - Function that returns the unique key
   * @returns Array of unique items (first occurrence kept)
   *
   * @example
   * const data = [
   *   { id: "1", name: "Alice" },
   *   { id: "2", name: "Bob" },
   *   { id: "1", name: "Alice Updated" }
   * ];
   * const unique = uniqueBy(data, item => item.id);
   * // Returns: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob" }]
   */
  static uniqueBy<T>(items: T[], keySelector: (item: T) => string): T[] {
    const seen = new Set<string>();
    const result: T[] = [];

    items.forEach((item) => {
      const key = keySelector(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    });

    return result;
  }

  /**
   * Partitions an array into two arrays based on a predicate
   *
   * @param items - Array of items to partition
   * @param predicate - Function that returns true for first array, false for second
   * @returns Tuple of [matching items, non-matching items]
   *
   * @example
   * const data = [1, 2, 3, 4, 5, 6];
   * const [evens, odds] = partition(data, n => n % 2 === 0);
   * // evens: [2, 4, 6], odds: [1, 3, 5]
   */
  static partition<T>(items: T[], predicate: (item: T) => boolean): [T[], T[]] {
    const matching: T[] = [];
    const nonMatching: T[] = [];

    items.forEach((item) => {
      if (predicate(item)) {
        matching.push(item);
      } else {
        nonMatching.push(item);
      }
    });

    return [matching, nonMatching];
  }

  /**
   * Calculates the sum of numeric values in an array
   *
   * @param items - Array of items
   * @param valueSelector - Function that returns the numeric value to sum
   * @returns Total sum
   *
   * @example
   * const data = [{ amount: 100 }, { amount: 200 }, { amount: 50 }];
   * const total = sum(data, item => item.amount);
   * // Returns: 350
   */
  static sum<T>(items: T[], valueSelector: (item: T) => number): number {
    return items.reduce((total, item) => total + valueSelector(item), 0);
  }

  /**
   * Calculates the average of numeric values in an array
   *
   * @param items - Array of items
   * @param valueSelector - Function that returns the numeric value
   * @returns Average value, or 0 if array is empty
   *
   * @example
   * const data = [{ score: 80 }, { score: 90 }, { score: 70 }];
   * const avg = average(data, item => item.score);
   * // Returns: 80
   */
  static average<T>(items: T[], valueSelector: (item: T) => number): number {
    if (items.length === 0) return 0;
    return this.sum(items, valueSelector) / items.length;
  }
}
