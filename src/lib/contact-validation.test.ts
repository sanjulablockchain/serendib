import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContact } from "@/lib/contact-validation";

const valid = { name: "Nimal Perera", email: "nimal@example.com", message: "Hello there" };

function fail(raw: Parameters<typeof validateContact>[0]) {
  const result = validateContact(raw);
  if (result.ok) throw new Error("expected validation to fail");
  return result;
}

describe("validateContact", () => {
  it("accepts and trims a valid submission", () => {
    const result = validateContact({
      name: "  Nimal Perera  ",
      email: "  nimal@example.com ",
      message: "  Hello there  ",
    });
    expect(result).toEqual({ ok: true, value: valid });
  });

  it("accepts non ASCII names", () => {
    expect(validateContact({ ...valid, name: "José Álvarez" }).ok).toBe(true);
    expect(validateContact({ ...valid, name: "සඳුනි පෙරේරා" }).ok).toBe(true);
  });

  it("removes line breaks and control characters from the name", () => {
    const result = validateContact({ ...valid, name: "Eve\r\nBcc: x@y.com\u0000" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.name).toBe("Eve Bcc: x@y.com");
  });

  it.each([
    "a@b.com\r\nBcc: x@y.com",
    "a@b.com,c@d.com",
    "a@b.com;c@d.com",
    "Eve <a@b.com>",
    "a b@c.com",
    "a@b",
    "@b.com",
    "plainaddress",
  ])("rejects the email %j", (email) => {
    expect(fail({ ...valid, email }).errors.email).toBeDefined();
  });

  it("treats non string values as missing instead of crashing", () => {
    const result = fail({ name: new File(["x"], "x.txt"), email: null, message: undefined });
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it("rejects a whitespace only message", () => {
    expect(fail({ ...valid, message: " \n\t " }).errors.message).toBeDefined();
  });

  it("enforces the message limit exactly, counting emoji as one character", () => {
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.message) }).ok).toBe(
      true,
    );
    expect(validateContact({ ...valid, message: "😀".repeat(CONTACT_LIMITS.message) }).ok).toBe(
      true,
    );
    expect(
      fail({ ...valid, message: "a".repeat(CONTACT_LIMITS.message + 1) }).errors.message,
    ).toBeDefined();
  });

  it("enforces name and email limits", () => {
    expect(validateContact({ ...valid, name: "n".repeat(CONTACT_LIMITS.name) }).ok).toBe(true);
    expect(fail({ ...valid, name: "n".repeat(CONTACT_LIMITS.name + 1) }).errors.name).toBeDefined();
    expect(validateContact({ ...valid, email: `${"a".repeat(245)}@b.co` }).ok).toBe(true);
    expect(fail({ ...valid, email: `${"a".repeat(250)}@b.co` }).errors.email).toBeDefined();
  });

  it("keeps newlines and tabs in the message, normalizes CRLF and strips other control characters", () => {
    const result = validateContact({ ...valid, message: "one\r\ntwo\tthree\u0000\u0007\rfour" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.message).toBe("one\ntwo\tthree\nfour");
  });

  it("reports every invalid field at once and returns sanitized values", () => {
    const result = fail({ name: "", email: "nope", message: "  hi  " });
    expect(Object.keys(result.errors).sort()).toEqual(["email", "name"]);
    expect(result.values).toEqual({ name: "", email: "nope", message: "hi" });
  });
});
