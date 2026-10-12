import { redis } from "./redis";

const TTL = parseInt(process.env.REDIS_TTL_TILES || "86400"); // 24h default
const SCHEMA = process.env.DB_SCHEMA || "default";

const CACHE_META_KEY = `cache_meta:${SCHEMA}:last_invalidated`;

export function tileCacheKey(layer: string, z: number, x: number, y: number): string {
  return `tile:${SCHEMA}:${layer}:${z}:${x}:${y}`;
}

export async function getCachedTile(key: string): Promise<Buffer | null> {
  try {
    const buf = await redis.getBuffer(key);
    return buf;
  } catch {
    return null;
  }
}

export async function setCachedTile(key: string, buffer: Buffer): Promise<void> {
  try {
    await redis.setex(key, TTL, buffer);
  } catch (err) {
    console.warn("[Redis] Failed to cache tile:", (err as Error).message);
  }
}

export async function invalidateTileCache(): Promise<number> {
  const pattern = `tile:${SCHEMA}:*`;
  let cursor = "0";
  let deleted = 0;
  try {
    do {
      const [nextCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = nextCursor;
      if (keys.length > 0) {
        await redis.del(...keys);
        deleted += keys.length;
      }
    } while (cursor !== "0");

    const now = new Date().toISOString();
    await redis.set(CACHE_META_KEY, now);
    return deleted;
  } catch (err) {
    console.error("[Redis] Invalidate error:", (err as Error).message);
    throw err;
  }
}

export async function getLastInvalidated(): Promise<string | null> {
  try {
    return await redis.get(CACHE_META_KEY);
  } catch {
    return null;
  }
}
