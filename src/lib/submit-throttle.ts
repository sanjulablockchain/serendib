import { createRateLimiter } from "@/lib/rate-limit";

type Options = { perClient: number; overall: number; windowMs: number };

/**
 * Per visitor cap plus an overall cap, so a spoofed x-forwarded-for cannot bypass throttling.
 * The per visitor check runs first: a visitor who is already blocked never uses up the overall cap.
 */
export function createSubmitThrottle({ perClient, overall, windowMs }: Options) {
  const clients = createRateLimiter({ limit: perClient, windowMs });
  const all = createRateLimiter({ limit: overall, windowMs, maxKeys: 1 });

  return {
    allow: (clientKey: string, now?: number) => clients.hit(clientKey, now) && all.hit("all", now),
  };
}
