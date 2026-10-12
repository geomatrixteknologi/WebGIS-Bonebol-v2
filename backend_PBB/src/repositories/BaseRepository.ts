import { Repository, FindManyOptions, FindOneOptions, DeepPartial, FindOptionsWhere, ObjectLiteral } from "typeorm";

/**
 * BaseRepository
 *
 * Abstract base repository providing common CRUD operations for all entities.
 *
 * Implements Repository Pattern to:
 * - Abstract database access layer
 * - Centralize common database operations
 * - Provide consistent query interface
 * - Enable easier testing through dependency injection
 * - Follow Single Responsibility Principle
 *
 * Benefits:
 * - Controllers don't directly depend on TypeORM
 * - Easy to swap database implementation
 * - Reusable query logic
 * - Type-safe database operations
 *
 * @template T - The entity type this repository manages
 *
 *   Refactoring
 * @version 1.0.0
 */

//============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * Pagination options for queries
 */
export interface PaginationOptions {
  page: number;
  limit: number;
}

/**
 * Pagination result with metadata
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Sorting options
 */
export interface SortOptions {
  field: string;
  direction: "ASC" | "DESC";
}

// ============================================================================
// BASE REPOSITORY
// ============================================================================

export abstract class BaseRepository<T extends ObjectLiteral> {
  /**
   * Constructs a new BaseRepository
   *
   * @param repository - TypeORM repository instance
   */
  constructor(protected repository: Repository<T>) { }

  // ============================================================================
  // BASIC CRUD OPERATIONS
  // ============================================================================

  /**
   * Finds an entity by its ID
   *
   * @param id - Entity ID
   * @param options - Additional find options
   * @returns Entity or null if not found
   *
   * @example
   * const sppt = await spptRepo.findById(123);
   */
  async findById(
    id: number | string,
    options?: Omit<FindOneOptions<T>, "where">
  ): Promise<T | null> {
    return this.repository.findOne({
      ...options,
      where: { id } as any,
    });
  }

  /**
   * Finds one entity matching the given conditions
   *
   * @param options - Find options including where clause
   * @returns Entity or null if not found
   *
   * @example
   * const sppt = await spptRepo.findOne({ where: { nop: "123" } });
   */
  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  /**
   * Finds all entities matching the given conditions
   *
   * @param options - Find options
   * @returns Array of entities
   *
   * @example
   * const sppts = await spptRepo.findAll({ where: { spptTahunPajak: 2024 } });
   */
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  /**
   * Finds entities with pagination
   *
   * @param options - Find options
   * @param pagination - Pagination settings
   * @returns Paginated result with metadata
   *
   * @example
   * const result = await spptRepo.findPaginated(
   *   { where: { paymentFlag: 0 } },
   *   { page: 1, limit: 20 }
   * );
   */
  async findPaginated(
    options: FindManyOptions<T>,
    pagination: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Counts entities matching the given conditions
   *
   * @param options - Find options (where clause)
   * @returns Count of matching entities
   *
   * @example
   * const unpaidCount = await spptRepo.count({ where: { paymentFlag: 0 } });
   */
  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  /**
   * Checks if any entity matches the given conditions
   *
   * @param where - Where conditions
   * @returns True if at least one entity exists
   *
   * @example
   * const exists = await spptRepo.exists({ nop: "123" });
   */
  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where });
    return count > 0;
  }

  /**
   * Creates a new entity
   *
   * @param data - Partial entity data
   * @returns Created entity
   *
   * @example
   * const newSppt = await spptRepo.create({ nop: "123", spptTahunPajak: 2024 });
   */
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   * Creates multiple entities in bulk
   *
   * @param dataArray - Array of partial entity data
   * @returns Array of created entities
   *
   * @example
   * const sppts = await spptRepo.createMany([
   *   { nop: "001", spptTahunPajak: 2024 },
   *   { nop: "002", spptTahunPajak: 2024 }
   * ]);
   */
  async createMany(dataArray: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(dataArray);
    return this.repository.save(entities);
  }

  /**
   * Updates an entity
   *
   * @param id - Entity ID
   * @param data - Partial entity data to update
   * @returns Updated entity or null if not found
   *
   * @example
   * const updated = await spptRepo.update(123, { paymentFlag: 1 });
   */
  async update(id: number | string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id as any, data as any);
    return this.findById(id);
  }

  /**
   * Updates entities matching conditions
   *
   * @param where - Conditions to match
   * @param data - Data to update
   * @returns Number of affected rows
   *
   * @example
   * const affected = await spptRepo.updateWhere(
   *   { spptTahunPajak: 2023 },
   *   { paymentFlag: 0 }
   * );
   */
  async updateWhere(
    where: FindOptionsWhere<T>,
    data: DeepPartial<T>
  ): Promise<number> {
    const result = await this.repository.update(where, data as any);
    return result.affected || 0;
  }

  /**
   * Deletes an entity by ID
   *
   * @param id - Entity ID
   * @returns True if deleted, false if not found
   *
   * @example
   * const deleted = await spptRepo.delete(123);
   */
  async delete(id: number | string): Promise<boolean> {
    const result = await this.repository.delete(id as any);
    return (result.affected || 0) > 0;
  }

  /**
   * Deletes entities matching conditions
   *
   * @param where - Conditions to match
   * @returns Number of deleted entities
   *
   * @example
   * const count = await spptRepo.deleteWhere({ spptTahunPajak: 2020 });
   */
  async deleteWhere(where: FindOptionsWhere<T>): Promise<number> {
    const result = await this.repository.delete(where);
    return result.affected || 0;
  }

  /**
   * Saves an entity (insert or update)
   *
   * @param entity - Entity to save
   * @returns Saved entity
   */
  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * Saves multiple entities (insert or update)
   *
   * @param entities - Entities to save
   * @returns Saved entities
   */
  async saveMany(entities: T[]): Promise<T[]> {
    return this.repository.save(entities);
  }

  // ============================================================================
  // QUERY BUILDER ACCESS
  // ============================================================================

  /**
   * Creates a query builder for complex queries
   *
   * @param alias - Table alias
   * @returns Query builder instance
   *
   * @example
   * const qb = spptRepo.createQueryBuilder('sppt')
   *   .where('sppt.nop = :nop', { nop: '123' })
   *   .andWhere('sppt.spptTahunPajak = :year', { year: 2024 });
   */
  createQueryBuilder(alias?: string) {
    return this.repository.createQueryBuilder(alias);
  }

  /**
   * Gets the underlying TypeORM repository
   * Use this only when you need direct access to TypeORM methods
   *
   * @returns TypeORM repository
   */
  getRepository(): Repository<T> {
    return this.repository;
  }

  query(query: string, params?: any[]): Promise<any[]> {
    return this.repository.query(query, params);
  }

  // ============================================================================
  // TRANSACTION SUPPORT
  // ============================================================================

  /**
   * Executes a function within a transaction
   *
   * @param fn - Function to execute in transaction
   * @returns Result of the function
   *
   * @example
   * const result = await spptRepo.transaction(async (manager) => {
   *   const sppt = await manager.save(newSppt);
   *   const payment = await manager.save(newPayment);
   *   return { sppt, payment };
   * });
   */
  async transaction<R>(
    fn: (entityManager: Repository<T>["manager"]) => Promise<R>
  ): Promise<R> {
    return this.repository.manager.transaction(fn);
  }
}
