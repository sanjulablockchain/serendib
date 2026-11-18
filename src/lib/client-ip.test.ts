import { describe, expect, it } from "vitest";
import { clientIp } from "./client-ip";

describe("clientIp", () => {
  it("reads the address nginx sets in X-Real-IP", () => {
    expect(clientIp(new Headers({ "x-real-ip": "203.0.113.5" }))).toBe("203.0.113.5");
  });

  it("trims whitespace around the address", () => {
    expect(clientIp(new Headers({ "x-real-ip": "  203.0.113.5 " }))).toBe("203.0.113.5");
  });

  it("ignores X-Forwarded-For, which the visitor controls", () => {
    const spoofed = new Headers({ "x-real-ip": "203.0.113.5", "x-forwarded-for": "1.2.3.4" });
    expect(clientIp(spoofed)).toBe("203.0.113.5");
    expect(clientIp(new Headers({ "x-forwarded-for": "1.2.3.4" }))).toBe("unknown");
  });

  it("falls back to a shared bucket when no proxy set the header", () => {
    expect(clientIp(new Headers())).toBe("unknown");
    expect(clientIp(new Headers({ "x-real-ip": "   " }))).toBe("unknown");
  });
});
