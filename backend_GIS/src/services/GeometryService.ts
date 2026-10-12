/**
 * GeometryService
 *
 * Service layer for geometry transformations and operations.
 * Handles business logic for coordinate conversions, NOP parsing,
 * geometry type conversions, and GeoJSON operations.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles geometry operations
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

import proj4 from "proj4";

export type GeometryType = "Point" | "Polygon" | "MultiPolygon";

export interface Coordinates {
  [key: number]: number;
}

export interface NOPParts {
  KD_PROV: string;
  KD_KAB: string;
  KD_KEC: string;
  KD_KEL: string;
  KD_BLOK: string;
  NO_URUT: string;
  KD_JNS_OP: string;
}

export interface GeoJSONGeometry {
  type: GeometryType;
  coordinates: any;
}

export class GeometryService {
  /**
   * UTM Zone 50S projection (EPSG:32750)
   */
  private static readonly UTM_50S = "+proj=utm +zone=50 +south +datum=WGS84 +units=m +no_defs";

  /**
   * WGS84 projection (EPSG:4326)
   */
  private static readonly WGS84 = "+proj=longlat +datum=WGS84 +no_defs";

  /**
   * Parses NOP (Nomor Objek Pajak) into its component parts
   *
   * NOP Structure (18 digits):
   * - KD_PROV: 0-2 (2 digits) - Province code
   * - KD_KAB: 2-4 (2 digits) - Regency code
   * - KD_KEC: 4-7 (3 digits) - District code
   * - KD_KEL: 7-10 (3 digits) - Village code
   * - KD_BLOK: 10-13 (3 digits) - Block code
   * - NO_URUT: 13-17 (4 digits) - Serial number
   * - KD_JNS_OP: 17-18 (1 digit) - Object type code
   *
   * @param nop - 18-digit NOP string
   * @returns Object with all NOP components
   *
   * @example
   * const parts = GeometryService.parseNOP("527171234567891");
   * // Returns: {
   * //   KD_PROV: "52",
   * //   KD_KAB: "71",
   * //   KD_KEC: "712",
   * //   ...
   * // }
   */
  static parseNOP(nop: string): NOPParts {
    if (nop.length !== 18) {
      throw new Error(`Invalid NOP length: expected 18 digits, got ${nop.length}`);
    }

    return {
      KD_PROV: nop.substring(0, 2),
      KD_KAB: nop.substring(2, 4),
      KD_KEC: nop.substring(4, 7),
      KD_KEL: nop.substring(7, 10),
      KD_BLOK: nop.substring(10, 13),
      NO_URUT: nop.substring(13, 17),
      KD_JNS_OP: nop.substring(17, 18),
    };
  }

  /**
   * Extracts code from location string format
   * Supports formats: "XXX - Name" or "XXX"
   *
   * @param locationString - Location string (e.g., "710 - AMPENAN" or "710")
   * @returns Last 3 digits of the code
   *
   * @example
   * extractLocationCode("710 - AMPENAN") // returns "710"
   * extractLocationCode("710") // returns "710"
   */
  static extractLocationCode(locationString: string): string {
    if (!locationString || typeof locationString !== "string") {
      throw new Error("Invalid location string");
    }

    const trimmed = locationString.trim();

    // Check if format is "XXX - Name"
    if (trimmed.includes(" - ")) {
      const parts = trimmed.split(" - ");
      return parts[0].slice(-3);
    }

    // Otherwise, just take last 3 characters
    return trimmed.slice(-3);
  }

  /**
   * Converts coordinates from UTM 50S to WGS84
   *
   * @param coordinates - Coordinates to convert
   * @returns Converted coordinates in WGS84
   */
  static convertUTMtoWGS84(coordinates: number[]): number[] {
    return proj4(this.UTM_50S, this.WGS84, coordinates);
  }

  /**
   * Converts geometry coordinates based on geometry type
   *
   * @param geometryType - Type of geometry (Point, Polygon, MultiPolygon)
   * @param coordinates - Coordinates to convert
   * @returns Converted coordinates
   *
   * @example
   * // Point
   * convertGeometry("Point", [x, y])
   *
   * // Polygon
   * convertGeometry("Polygon", [[[x1,y1], [x2,y2], ...]])
   *
   * // MultiPolygon
   * convertGeometry("MultiPolygon", [[[[x1,y1], [x2,y2], ...]], ...])
   */
  static convertGeometry(geometryType: GeometryType, coordinates: any): any {
    switch (geometryType) {
      case "Point":
        return this.convertUTMtoWGS84(coordinates);

      case "Polygon":
        return coordinates.map((ring: any) =>
          ring.map((point: any) => this.convertUTMtoWGS84(point))
        );

      case "MultiPolygon":
        return coordinates.map((polygon: any) =>
          polygon.map((ring: any) =>
            ring.map((point: any) => this.convertUTMtoWGS84(point))
          )
        );

      default:
        throw new Error(`Unsupported geometry type: ${geometryType}`);
    }
  }

  /**
   * Converts Polygon to MultiPolygon format
   * Wraps polygon coordinates in an additional array
   *
   * @param polygonCoordinates - Polygon coordinates
   * @returns MultiPolygon coordinates
   */
  static polygonToMultiPolygon(polygonCoordinates: any): any {
    return [polygonCoordinates];
  }

  /**
   * Creates a GeoJSON geometry object with proper type conversion
   * Automatically converts Polygon to MultiPolygon if specified
   *
   * @param geometryType - Original geometry type
   * @param convertedCoordinates - Already converted coordinates
   * @param forceMultiPolygon - Whether to force Polygon → MultiPolygon conversion
   * @returns GeoJSON geometry object
   */
  static createGeoJSON(
    geometryType: GeometryType,
    convertedCoordinates: any,
    forceMultiPolygon: boolean = false
  ): GeoJSONGeometry {
    let finalType: GeometryType = geometryType;
    let finalCoordinates = convertedCoordinates;

    if (forceMultiPolygon && geometryType === "Polygon") {
      finalType = "MultiPolygon";
      finalCoordinates = this.polygonToMultiPolygon(convertedCoordinates);
    }

    return {
      type: finalType,
      coordinates: finalCoordinates,
    };
  }

  /**
   * Validates if coordinates are valid (not empty)
   *
   * @param coordinates - Coordinates to validate
   * @returns True if valid, false otherwise
   */
  static isValidCoordinates(coordinates: any): boolean {
    if (!coordinates) return false;
    if (Array.isArray(coordinates) && coordinates.length === 0) return false;
    return true;
  }

  /**
   * Validates required properties exist in shapefile feature
   *
   * @param properties - Feature properties
   * @param requiredFields - Array of required field names or objects with key/label
   * @returns Object with { valid: boolean, missingField?: string, missingLabel?: string }
   */
  static validateRequiredFields(
    properties: any,
    requiredFields: Array<string | { key: string; label: string }>
  ): { valid: boolean; missingField?: string; missingLabel?: string } {
    for (const field of requiredFields) {
      const key = typeof field === "string" ? field : field.key;
      const label = typeof field === "string" ? key : field.label;

      if (!properties || !properties[key]) {
        return {
          valid: false,
          missingField: key,
          missingLabel: label,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Validates property values against reference data
   *
   * @param properties - Feature properties
   * @param refData - Reference data to validate against
   * @param fieldsToCheck - Array of field names to check
   * @returns Object with { valid: boolean, invalidField?: string, expected?: string, actual?: string }
   */
  static validatePropertyValues(
    properties: any,
    refData: Record<string, string>,
    fieldsToCheck: string[]
  ): {
    valid: boolean;
    invalidField?: string;
    expected?: string;
    actual?: string;
  } {
    for (const key of fieldsToCheck) {
      if (refData[key] && properties[key] !== refData[key]) {
        return {
          valid: false,
          invalidField: key,
          expected: refData[key],
          actual: properties[key],
        };
      }
    }

    return { valid: true };
  }

  /**
   * Creates a SQL fragment for ST_GeomFromGeoJSON
   *
   * @param geoJSON - GeoJSON geometry object
   * @param multiType - Whether to wrap in ST_Multi
   * @returns SQL fragment string
   */
  static createGeomSQLFragment(geoJSON: GeoJSONGeometry, multiType: boolean = false): string {
    const jsonString = JSON.stringify(geoJSON);

    if (multiType) {
      return `ST_Multi(ST_GeomFromGeoJSON('${jsonString}'))`;
    }

    return `ST_GeomFromGeoJSON('${jsonString}')`;
  }

  /**
   * Generates unique key for duplicate detection
   *
   * @param parts - Parts to combine into unique key
   * @returns Unique key string
   *
   * @example
   * generateUniqueKey(["710", "001", "0001"]) // returns "710-001-0001"
   */
  static generateUniqueKey(parts: string[]): string {
    return parts.join("-");
  }

  /**
   * Sanitizes filename to prevent path traversal attacks
   *
   * @param filename - Filename to sanitize
   * @returns True if valid, false otherwise
   */
  static isValidFilename(filename: string): boolean {
    const filenamePattern = /^[A-Za-z0-9 _\-]+$/;
    return filenamePattern.test(filename.trim());
  }

  /**
   * Validates latitude value
   *
   * @param latitude - Latitude value
   * @returns True if valid (-90 to 90)
   */
  static isValidLatitude(latitude: number): boolean {
    return typeof latitude === "number" && latitude >= -90 && latitude <= 90;
  }

  /**
   * Validates longitude value
   *
   * @param longitude - Longitude value
   * @returns True if valid (-180 to 180)
   */
  static isValidLongitude(longitude: number): boolean {
    return typeof longitude === "number" && longitude >= -180 && longitude <= 180;
  }

  /**
   * Validates both latitude and longitude
   *
   * @param latitude - Latitude value
   * @param longitude - Longitude value
   * @returns Object with { valid: boolean, error?: string }
   */
  static validateCoordinatePair(
    latitude: number,
    longitude: number
  ): { valid: boolean; error?: string } {
    if (!this.isValidLatitude(latitude)) {
      return { valid: false, error: "Invalid latitude: must be between -90 and 90" };
    }

    if (!this.isValidLongitude(longitude)) {
      return { valid: false, error: "Invalid longitude: must be between -180 and 180" };
    }

    return { valid: true };
  }
}
