export type RateLimiter = {
  hit(key: string, now?: number): boolean;
  size(): number;
};

type Options = { limit: number; windowMs: number; maxKeys?: number };

/** In memory sliding window limiter. Per process, so it resets on deploy. */
export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: Options): RateLimiter {
  const hits = new Map<string, number[]>();

  function prune(now: number) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(key);
    }
    while (hits.size > maxKeys) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }

  return {
    hit(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);
      if (hits.size > maxKeys) prune(now);
      return true;
    },
    size: () => hits.size,
  };
}
