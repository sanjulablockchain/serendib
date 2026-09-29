import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit then blocks", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(limiter.hit("a", 0)).toBe(true);
    expect(limiter.hit("a", 1)).toBe(true);
    expect(limiter.hit("a", 2)).toBe(false);
  });

  it("allows again once the window has passed", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.hit("a", 0)).toBe(true);
    expect(limiter.hit("a", 999)).toBe(false);
    expect(limiter.hit("a", 1000)).toBe(true);
  });

  it("tracks keys independently", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.hit("a", 0)).toBe(true);
    expect(limiter.hit("b", 0)).toBe(true);
    expect(limiter.hit("a", 1)).toBe(false);
  });

  it("does not count blocked attempts against the window", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    limiter.hit("a", 0);
    limiter.hit("a", 500);
    expect(limiter.hit("a", 1000)).toBe(true);
  });

  it("keeps memory bounded when many keys arrive", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 10 });
    for (let i = 0; i < 100; i += 1) limiter.hit(`key-${i}`, i);
    expect(limiter.size()).toBeLessThanOrEqual(10);
  });

  it("supports a single key global cap", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, maxKeys: 1 });
    expect(limiter.hit("all", 0)).toBe(true);
    expect(limiter.hit("all", 1)).toBe(true);
    expect(limiter.hit("all", 2)).toBe(false);
  });
});
