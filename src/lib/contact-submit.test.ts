import { describe, expect, it, vi } from "vitest";
import { MIN_FILL_MS, processContact, type ContactDeps } from "@/lib/contact-submit";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const good = { name: "Nimal Perera", email: "nimal@example.com", message: "Hello there" };

function deps(overrides: Partial<ContactDeps> = {}) {
  const send = vi.fn().mockResolvedValue(undefined);
  const value: ContactDeps = { now: () => 100_000, allow: () => true, send, ...overrides };
  return { deps: value, send: overrides.send ? (overrides.send as typeof send) : send };
}

describe("processContact", () => {
  it("sends a valid message and reports success", async () => {
    const { deps: d, send } = deps();
    const state = await processContact(form(good), d);
    expect(state).toEqual({ status: "sent", name: "Nimal Perera", email: "nimal@example.com" });
    expect(send).toHaveBeenCalledWith(good);
  });

  it("returns field errors and the entered values without sending", async () => {
    const { deps: d, send } = deps();
    const state = await processContact(form({ ...good, email: "nope" }), d);
    expect(state.status).toBe("error");
    if (state.status === "error") {
      expect(state.errors.email).toBeDefined();
      expect(state.values.name).toBe("Nimal Perera");
    }
    expect(send).not.toHaveBeenCalled();
  });

  it("pretends to succeed but sends nothing when the honeypot is filled", async () => {
    const { deps: d, send } = deps();
    const state = await processContact(form({ ...good, website: "http://spam.example" }), d);
    expect(state.status).toBe("sent");
    expect(send).not.toHaveBeenCalled();
  });

  it("pretends to succeed but sends nothing when submitted too fast", async () => {
    const { deps: d, send } = deps();
    const state = await processContact(
      form({ ...good, startedAt: String(100_000 - (MIN_FILL_MS - 1)) }),
      d,
    );
    expect(state.status).toBe("sent");
    expect(send).not.toHaveBeenCalled();
  });

  it("sends when the fill time is long enough", async () => {
    const { deps: d, send } = deps();
    await processContact(form({ ...good, startedAt: String(100_000 - MIN_FILL_MS) }), d);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("skips the timing check when startedAt is missing, invalid or in the future", async () => {
    for (const startedAt of ["", "abc", String(200_000)]) {
      const { deps: d, send } = deps();
      await processContact(form({ ...good, startedAt }), d);
      expect(send).toHaveBeenCalledTimes(1);
    }
  });

  it("returns a friendly error and sends nothing when rate limited", async () => {
    const { deps: d, send } = deps({ allow: () => false });
    const state = await processContact(form(good), d);
    expect(state.status).toBe("error");
    if (state.status === "error") expect(state.message).toMatch(/call or text/i);
    expect(send).not.toHaveBeenCalled();
  });

  it("hides SMTP details when sending fails and reports the error to the hook", async () => {
    const onSendError = vi.fn();
    const { deps: d } = deps({
      send: vi.fn().mockRejectedValue(new Error("535 auth failed for user secret-user")),
      onSendError,
    });
    const state = await processContact(form(good), d);
    expect(state.status).toBe("error");
    if (state.status === "error") {
      expect(state.message).toMatch(/call or text/i);
      expect(JSON.stringify(state)).not.toContain("secret-user");
      expect(state.values).toEqual(good);
    }
    expect(onSendError).toHaveBeenCalledTimes(1);
  });

  it("treats a File in a text field as missing", async () => {
    const data = form(good);
    data.set("name", new File(["x"], "x.txt"));
    const { deps: d, send } = deps();
    const state = await processContact(data, d);
    expect(state.status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });
});
