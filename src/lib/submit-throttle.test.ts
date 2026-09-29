import { describe, expect, it } from "vitest";
import { createSubmitThrottle } from "@/lib/submit-throttle";

describe("createSubmitThrottle", () => {
  it("blocks a client that is over its own limit", () => {
    const throttle = createSubmitThrottle({ perClient: 2, overall: 100, windowMs: 1000 });
    expect(throttle.allow("a", 0)).toBe(true);
    expect(throttle.allow("a", 1)).toBe(true);
    expect(throttle.allow("a", 2)).toBe(false);
  });

  it("does not let one blocked client use up the overall cap for everyone else", () => {
    const throttle = createSubmitThrottle({ perClient: 1, overall: 3, windowMs: 1000 });
    expect(throttle.allow("a", 0)).toBe(true);
    for (let i = 0; i < 20; i += 1) throttle.allow("a", 1 + i);
    expect(throttle.allow("b", 30)).toBe(true);
    expect(throttle.allow("c", 31)).toBe(true);
  });

  it("still enforces the overall cap across many different clients", () => {
    const throttle = createSubmitThrottle({ perClient: 5, overall: 3, windowMs: 1000 });
    expect(throttle.allow("a", 0)).toBe(true);
    expect(throttle.allow("b", 1)).toBe(true);
    expect(throttle.allow("c", 2)).toBe(true);
    expect(throttle.allow("d", 3)).toBe(false);
  });
});
