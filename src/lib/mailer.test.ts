import { describe, expect, it } from "vitest";
import { buildMessage, readMailConfig, sendContactEmail } from "@/lib/mailer";

const env = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_USER: "user",
  SMTP_PASS: "pass",
  CONTACT_TO: "team@example.com",
  CONTACT_FROM: "website@example.com",
};

describe("readMailConfig", () => {
  it("reads a full configuration", () => {
    expect(readMailConfig(env)).toEqual({
      host: "smtp.example.com",
      port: 587,
      secure: false,
      requireTLS: true,
      user: "user",
      pass: "pass",
      to: "team@example.com",
      from: "website@example.com",
    });
  });

  it("uses implicit TLS on port 465", () => {
    const config = readMailConfig({ ...env, SMTP_PORT: "465" });
    expect(config?.secure).toBe(true);
    expect(config?.requireTLS).toBe(false);
  });

  it("allows TLS to be relaxed for local testing only", () => {
    expect(readMailConfig({ ...env, SMTP_REQUIRE_TLS: "false" })?.requireTLS).toBe(false);
  });

  it("allows no credentials for a local catcher", () => {
    const config = readMailConfig({ ...env, SMTP_USER: undefined, SMTP_PASS: undefined });
    expect(config?.user).toBeUndefined();
    expect(config?.pass).toBeUndefined();
  });

  it.each(["SMTP_HOST", "SMTP_PORT", "CONTACT_TO", "CONTACT_FROM"])(
    "returns null without %s",
    (key) => {
      expect(readMailConfig({ ...env, [key]: undefined })).toBeNull();
    },
  );

  it("returns null for a bad port", () => {
    expect(readMailConfig({ ...env, SMTP_PORT: "abc" })).toBeNull();
    expect(readMailConfig({ ...env, SMTP_PORT: "70000" })).toBeNull();
  });

  it("returns null when only one of user and pass is set", () => {
    expect(readMailConfig({ ...env, SMTP_PASS: undefined })).toBeNull();
  });
});

describe("buildMessage", () => {
  const input = { name: "Nimal Perera", email: "nimal@example.com", message: "Line one\nLine two" };

  it("sets a fixed sender, the team recipient and the visitor as reply to", () => {
    const message = buildMessage(input, { to: "team@example.com", from: "website@example.com" });
    expect(message.to).toBe("team@example.com");
    expect(message.from).toEqual({
      name: "Serendib Healthways website",
      address: "website@example.com",
    });
    expect(message.replyTo).toEqual({ name: "Nimal Perera", address: "nimal@example.com" });
    expect(message.subject).toBe("Website contact: Nimal Perera");
    expect(message.text).toBe("Name: Nimal Perera\nEmail: nimal@example.com\n\nLine one\nLine two");
  });

  it("never lets line breaks reach the subject or reply to name", () => {
    const message = buildMessage(
      { ...input, name: "Eve\r\nBcc: x@y.com" },
      { to: "team@example.com", from: "website@example.com" },
    );
    expect(message.subject).not.toMatch(/[\r\n]/);
    const replyTo = message.replyTo as { name: string };
    expect(replyTo.name).not.toMatch(/[\r\n]/);
  });
});

describe("sendContactEmail", () => {
  it("fails with a plain error when mail is not configured", async () => {
    await expect(
      sendContactEmail({ name: "A", email: "a@b.co", message: "hi" }, {}),
    ).rejects.toThrow("Mail is not configured");
  });
});
