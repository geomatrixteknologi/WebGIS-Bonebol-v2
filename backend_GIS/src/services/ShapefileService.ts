/**
 * ShapefileService
 *
 * Service layer for shapefile processing operations.
 * Handles business logic for file path resolution, batch operations,
 * duplicate detection, and common shapefile processing patterns.
 *
 * Follows SOLID principles:
 * - Single Responsibility: Only handles shapefile processing logic
 * - Open/Closed: Extensible through inheritance, closed for modification
 * - Dependency Inversion: Depends on abstractions (types), not concrete implementations
 */

import path from "path";
import fs from "fs";

export interface ShapefilePathOptions {
  baseDir: string;
  kecamatan?: string;
  kelurahan?: string;
  jenis: string;
}

export interface FileResolutionResult {
  found: boolean;
  filePath?: string;
  triedPaths: string[];
}

export interface BatchConfig {
  batchSize: number;
}

export class ShapefileService {
  /**
   * Default batch size for database operations
   */
  private static readonly DEFAULT_BATCH_SIZE = 1000;

  /**
   * Default shapefile directories
   */
  private static readonly SHAPEFILE_DIRS = {
    kecamatan: "../../public/kecamatan",
    kelurahan: "../../public/kelurahan",
    persil: "../../public/persil",
    znt: "../../public/ZNT",
    blok: "../../public/blok",
  };

  /**
   * Resolves shapefile path with fallback patterns
   * Tries primary path first, then fallback with "XX" pattern
   *
   * @param options - Path resolution options
   * @returns Resolution result with path or tried paths
   */
  static resolveShapefilePath(options: ShapefilePathOptions): FileResolutionResult {
    const { baseDir, kecamatan, kelurahan, jenis } = options;

    const dir = path.join(__dirname, baseDir);

    // For kecamatan upload, no kecamatan code in filename (just jenis.shp)
    if (!kecamatan) {
      const primaryName = `${jenis}.shp`;
      const primaryPath = path.join(dir, primaryName);

      if (fs.existsSync(primaryPath)) {
        return {
          found: true,
          filePath: primaryPath,
          triedPaths: [primaryPath],
        };
      }

      return {
        found: false,
        triedPaths: [primaryPath],
      };
    }

    // Build primary and alternative names
    const primaryName = kelurahan ? `${kecamatan}_${kelurahan}_${jenis}.shp` : `${kecamatan}_${jenis}.shp`;

    const altName = `${kecamatan}_XX_${jenis}.shp`;

    const primaryPath = path.join(dir, primaryName);
    const altPath = path.join(dir, altName);

    // Try primary path first
    if (fs.existsSync(primaryPath)) {
      return {
        found: true,
        filePath: primaryPath,
        triedPaths: [primaryPath],
      };
    }

    // Try alternative path
    if (fs.existsSync(altPath)) {
      return {
        found: true,
        filePath: altPath,
        triedPaths: [primaryPath, altPath],
      };
    }

    // Not found
    return {
      found: false,
      triedPaths: [primaryPath, altPath],
    };
  }

  /**
   * Creates batches from an array for batch processing
   *
   * @param items - Array of items to batch
   * @param batchSize - Size of each batch (default: 1000)
   * @returns Array of batches
   */
  static createBatches<T>(items: T[], batchSize: number = this.DEFAULT_BATCH_SIZE): T[][] {
    const batches: T[][] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    return batches;
  }

  /**
   * Generates unique key for duplicate detection
   *
   * @param parts - Array of parts to combine
   * @returns Unique key string
   *
   * @example
   * generateDuplicateKey(["710", "001", "0001"]) // returns "710-001-0001"
   */
  static generateDuplicateKey(parts: (string | number | null)[]): string {
    return parts.map((p) => String(p)).join("-");
  }

  /**
   * Checks for duplicates in a set
   *
   * @param uniqueSet - Set to check against
   * @param key - Key to check
   * @returns True if duplicate exists
   */
  static isDuplicate(uniqueSet: Set<string>, key: string): boolean {
    return uniqueSet.has(key);
  }

  /**
   * Adds key to duplicate detection set
   *
   * @param uniqueSet - Set to add to
   * @param key - Key to add
   */
  static addToUniqueSet(uniqueSet: Set<string>, key: string): void {
    uniqueSet.add(key);
  }

  /**
   * Validates shapefile properties exist
   *
   * @param properties - Properties object to validate
   * @param requiredFields - Array of required field names
   * @returns True if all fields exist
   */
  static validateRequiredFields(properties: any, requiredFields: string[]): boolean {
    for (const field of requiredFields) {
      if (!properties || !properties[field]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Validates property values against reference data
   *
   * @param properties - Properties to validate
   * @param refData - Reference data to validate against
   * @param fieldsToValidate - Array of field names to validate
   * @returns Object with validation result and details
   */
  static validateAgainstReference(properties: any, refData: Record<string, string>, fieldsToValidate: string[]): { valid: boolean; invalidField?: string; expected?: string; actual?: string } {
    for (const field of fieldsToValidate) {
      if (refData[field] && properties[field] !== refData[field]) {
        return {
          valid: false,
          invalidField: field,
          expected: refData[field],
          actual: properties[field],
        };
      }
    }

    return { valid: true };
  }

  /**
   * Gets shapefile directory path
   *
   * @param type - Type of shapefile (kelurahan, persil, znt, blok)
   * @returns Directory path relative to controller
   */
  static getShapefileDirectory(type: keyof typeof ShapefileService.SHAPEFILE_DIRS): string {
    return this.SHAPEFILE_DIRS[type];
  }

  /**
   * Checks if no valid features were processed
   *
   * @param features - Array of features
   * @returns True if no valid features
   */
  static hasNoValidFeatures(features: any[]): boolean {
    return features.length === 0;
  }

  /**
   * Creates SQL CASE statement for batch geometry updates
   *
   * @param batch - Batch of updates with id and geometry
   * @param multiType - Whether to use ST_Multi
   * @returns Object with SQL query string and parameters
   */
  static createBatchGeometryUpdateSQL(batch: Array<{ id?: number; geoJsonData: string }>, multiType: boolean = false): { sql: string; parameters: any[] } {
    let updateQuery = `UPDATE "GIS_BONEBOL".batas_persil SET geom = CASE `;
    const parameters: any[] = [];
    const conditions: string[] = [];

    const geomFunction = multiType ? "ST_Multi(ST_GeomFromGeoJSON($" : "ST_GeomFromGeoJSON($";

    batch.forEach((update, index) => {
      const idParam = index * 2 + 1;
      const geomParam = index * 2 + 2;

      updateQuery += `WHEN "id" = $${idParam} THEN ${geomFunction}${geomParam}${multiType ? ")" : ""}) `;
      parameters.push(update.id, update.geoJsonData);
      conditions.push(`"id" = $${idParam}`);
    });

    updateQuery += `END WHERE ${conditions.join(" OR ")}`;

    return { sql: updateQuery, parameters };
  }

  /**
   * Builds file path for shapefile upload
   *
   * @param baseDir - Base directory path
   * @param parts - Path parts (kecamatan, kelurahan, jenis)
   * @returns Complete file path
   */
  static buildFilePath(baseDir: string, ...parts: string[]): string {
    const filename = parts.join("_") + ".shp";
    return path.join(__dirname, baseDir, filename);
  }

  /**
   * Checks if geometry coordinates are valid
   *
   * @param coordinates - Coordinates to check
   * @returns True if valid
   */
  static hasValidCoordinates(coordinates: any): boolean {
    if (!coordinates) return false;
    if (Array.isArray(coordinates) && coordinates.length === 0) return false;
    return true;
  }

  /**
   * Creates a feature collection structure
   *
   * @param features - Array of features
   * @returns GeoJSON FeatureCollection
   */
  static createFeatureCollection(features: any[]): any {
    return {
      type: "FeatureCollection",
      features,
    };
  }

  /**
   * Extracts properties for database insert
   *
   * @param properties - Full properties object
   * @param fields - Array of field names to extract
   * @returns Object with only specified fields
   */
  static extractProperties(properties: any, fields: string[]): any {
    const extracted: any = {};

    fields.forEach((field) => {
      extracted[field] = properties[field];
    });

    return extracted;
  }

  /**
   * Logs shapefile processing progress
   *
   * @param message - Message to log
   * @param details - Optional details object
   */
  static logProgress(message: string, details?: any): void {
    if (details) {
      console.log(`[ShapefileService] ${message}`, details);
    } else {
      console.log(`[ShapefileService] ${message}`);
    }
  }

  /**
   * Logs shapefile processing warning
   *
   * @param message - Warning message
   * @param details - Optional details object
   */
  static logWarning(message: string, details?: any): void {
    if (details) {
      console.warn(`[ShapefileService] WARNING: ${message}`, details);
    } else {
      console.warn(`[ShapefileService] WARNING: ${message}`);
    }
  }

  /**
   * Creates standardized error response
   *
   * @param message - Error message
   * @param code - HTTP status code
   * @returns Error response object
   */
  static createErrorResponse(message: string, code: number = 500): any {
    return {
      code,
      message,
    };
  }

  /**
   * Creates standardized success response
   *
   * @param message - Success message
   * @param data - Optional data payload
   * @returns Success response object
   */
  static createSuccessResponse(message: string, data?: any): any {
    const response: any = {
      code: 200,
      message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    return response;
  }
}
