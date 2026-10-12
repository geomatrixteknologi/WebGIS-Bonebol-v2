/**
 * ColorInterpolationService
 *
 * Service layer for color interpolation and gradient generation.
 * Handles business logic for color calculations, RGB conversions,
 * and gradient mapping for thematic maps.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles color interpolation logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorStop {
  position: number; // 0 to 1
  color: RGB;
}

export interface MinMaxValues {
  min: number;
  max: number;
}

export class ColorInterpolationService {
  /**
   * Default color stops for green → yellow → red gradient
   */
  private static readonly DEFAULT_GRADIENT: ColorStop[] = [
    { position: 0, color: { r: 0, g: 255, b: 0 } },     // Green
    { position: 0.5, color: { r: 255, g: 255, b: 0 } }, // Yellow
    { position: 1, color: { r: 255, g: 0, b: 0 } },     // Red
  ];

  /**
   * Interpolates a value between min and max to get a color in hex format
   * Uses green → yellow → red gradient
   *
   * @param value - The value to interpolate
   * @param min - Minimum value in range
   * @param max - Maximum value in range
   * @returns Hex color string (e.g., "#00FF00")
   *
   * @example
   * interpolateColor(50, 0, 100) // returns "#7FFF00" (yellowish-green)
   * interpolateColor(0, 0, 100)  // returns "#00FF00" (green)
   * interpolateColor(100, 0, 100) // returns "#FF0000" (red)
   */
  static interpolateColor(value: number, min: number, max: number): string {
    const ratio = this.calculateRatio(value, min, max);
    const rgb = this.interpolateRGB(ratio, this.DEFAULT_GRADIENT);
    return this.rgbToHex(rgb);
  }

  /**
   * Calculates the ratio (0 to 1) of a value within a range
   *
   * @param value - The value to calculate ratio for
   * @param min - Minimum value in range
   * @param max - Maximum value in range
   * @returns Ratio between 0 and 1
   */
  static calculateRatio(value: number, min: number, max: number): number {
    const range = max - min;
    if (range === 0) return 0;

    const ratio = (value - min) / range;
    return Math.max(0, Math.min(1, ratio)); // Clamp between 0 and 1
  }

  /**
   * Interpolates RGB color based on ratio and gradient stops
   *
   * @param ratio - Position in gradient (0 to 1)
   * @param gradient - Array of color stops
   * @returns Interpolated RGB color
   */
  static interpolateRGB(ratio: number, gradient: ColorStop[]): RGB {
    // Handle edge cases
    if (ratio <= gradient[0].position) return { ...gradient[0].color };
    if (ratio >= gradient[gradient.length - 1].position) {
      return { ...gradient[gradient.length - 1].color };
    }

    // Find the two stops to interpolate between
    for (let i = 0; i < gradient.length - 1; i++) {
      const stop1 = gradient[i];
      const stop2 = gradient[i + 1];

      if (ratio >= stop1.position && ratio <= stop2.position) {
        const segmentRatio = (ratio - stop1.position) / (stop2.position - stop1.position);
        return this.lerpRGB(stop1.color, stop2.color, segmentRatio);
      }
    }

    // Fallback (shouldn't reach here)
    return { ...gradient[0].color };
  }

  /**
   * Linear interpolation between two RGB colors
   *
   * @param color1 - Starting color
   * @param color2 - Ending color
   * @param t - Interpolation factor (0 to 1)
   * @returns Interpolated RGB color
   */
  static lerpRGB(color1: RGB, color2: RGB, t: number): RGB {
    return {
      r: Math.round(color1.r + (color2.r - color1.r) * t),
      g: Math.round(color1.g + (color2.g - color1.g) * t),
      b: Math.round(color1.b + (color2.b - color1.b) * t),
    };
  }

  /**
   * Converts RGB values to hex color string
   *
   * @param rgb - RGB color object
   * @returns Hex color string (e.g., "#FF0000")
   */
  static rgbToHex(rgb: RGB): string {
    const { r, g, b } = rgb;
    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    return `#${hex}`;
  }

  /**
   * Converts hex color string to RGB object
   *
   * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
   * @returns RGB color object
   */
  static hexToRGB(hex: string): RGB {
    const cleanHex = hex.replace("#", "");
    const num = parseInt(cleanHex, 16);

    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  /**
   * Finds minimum and maximum values from an array of numbers
   *
   * @param values - Array of numeric values
   * @returns Object with min and max values
   */
  static findMinMax(values: number[]): MinMaxValues {
    if (values.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }

  /**
   * Parses numeric values from array of strings/numbers and filters out NaN
   *
   * @param values - Array of values to parse
   * @returns Array of valid numbers
   */
  static parseNumericValues(values: (string | number)[]): number[] {
    return values.map((v) => parseFloat(String(v))).filter((v) => !isNaN(v));
  }

  /**
   * Creates a custom gradient with specified colors
   *
   * @param colors - Array of RGB colors
   * @returns Array of color stops evenly distributed
   *
   * @example
   * createGradient([
   *   { r: 0, g: 0, b: 255 },    // Blue
   *   { r: 255, g: 255, b: 0 },  // Yellow
   *   { r: 255, g: 0, b: 0 }     // Red
   * ])
   */
  static createGradient(colors: RGB[]): ColorStop[] {
    if (colors.length === 0) return [];
    if (colors.length === 1) return [{ position: 0, color: colors[0] }];

    const stops: ColorStop[] = [];
    const step = 1 / (colors.length - 1);

    colors.forEach((color, index) => {
      stops.push({
        position: index * step,
        color,
      });
    });

    return stops;
  }

  /**
   * Interpolates color with a custom gradient
   *
   * @param value - The value to interpolate
   * @param min - Minimum value in range
   * @param max - Maximum value in range
   * @param gradient - Custom gradient stops
   * @returns Hex color string
   */
  static interpolateWithGradient(
    value: number,
    min: number,
    max: number,
    gradient: ColorStop[]
  ): string {
    const ratio = this.calculateRatio(value, min, max);
    const rgb = this.interpolateRGB(ratio, gradient);
    return this.rgbToHex(rgb);
  }

  /**
   * Gets a color for a value with default fallback
   *
   * @param value - The value (may be NaN or undefined)
   * @param min - Minimum value in range
   * @param max - Maximum value in range
   * @param fallbackColor - Color to use if value is invalid (default: "#CCCCCC")
   * @returns Hex color string
   */
  static getColorWithFallback(
    value: number | string | null | undefined,
    min: number,
    max: number,
    fallbackColor: string = "#CCCCCC"
  ): string {
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return fallbackColor;
    return this.interpolateColor(numValue, min, max);
  }

  /**
   * Generates a legend array with color mappings
   *
   * @param uniqueValues - Array of unique values to map
   * @param min - Minimum value for color scale
   * @param max - Maximum value for color scale
   * @returns Array of legend items with value and color
   */
  static generateLegend(
    uniqueValues: number[],
    min: number,
    max: number
  ): Array<{ value: number; color: string }> {
    return uniqueValues
      .map((value) => ({
        value,
        color: this.interpolateColor(value, min, max),
      }))
      .sort((a, b) => b.value - a.value); // Sort descending
  }

  /**
   * Creates a color scale with N steps
   *
   * @param steps - Number of steps in the scale
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Array of { value, color } objects
   */
  static createColorScale(
    steps: number,
    min: number,
    max: number
  ): Array<{ value: number; color: string }> {
    const scale: Array<{ value: number; color: string }> = [];
    const range = max - min;
    const stepSize = range / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const value = min + stepSize * i;
      const color = this.interpolateColor(value, min, max);
      scale.push({ value, color });
    }

    return scale;
  }

  /**
   * Validates RGB color values
   *
   * @param rgb - RGB object to validate
   * @returns True if valid (all values 0-255)
   */
  static isValidRGB(rgb: RGB): boolean {
    const { r, g, b } = rgb;
    return (
      r >= 0 && r <= 255 &&
      g >= 0 && g <= 255 &&
      b >= 0 && b <= 255 &&
      Number.isInteger(r) &&
      Number.isInteger(g) &&
      Number.isInteger(b)
    );
  }

  /**
   * Validates hex color string
   *
   * @param hex - Hex string to validate
   * @returns True if valid hex color
   */
  static isValidHex(hex: string): boolean {
    const hexPattern = /^#?[0-9A-Fa-f]{6}$/;
    return hexPattern.test(hex);
  }
}
