import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { RedisStorage } from "@openauthjs/openauth/storage/redis";

const connectionUrl = process.env.REDIS_URL;

export const storage = !!connectionUrl ? RedisStorage({
  connectionUrl,
}) : MemoryStorage({})
