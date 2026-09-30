# Contact Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Contact Us placeholder with the full page from the reference design: a message form that emails through SMTP, contact channels, and an OpenStreetMap and Leaflet location map.

**Architecture:** Server Components compose sections from typed content in `src/content/contact.ts`. Two small client components handle interactivity (`ContactForm` with `useActionState`, `LocationMap` with dynamically imported Leaflet). All form logic lives in small pure modules under `src/lib` (validation, rate limiter, mailer, orchestration) that are unit tested with Vitest. `actions.ts` is a thin Server Action that wires real dependencies into `processContact`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Nodemailer (latest, 10.x), Leaflet 1.9, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-29-contact-page-design.md`
**Reference design:** `C:\Users\User\Documents\Designs\Serendib\Serendib Healthways Contact Us.html` (bundled export, the unpacked template is not kept in the repo)

## Global Constraints

- Work in worktree `.worktrees/contact-page` on branch `feat/contact-page`. Never build on `main`.
- Conventional Commits, small and focused. End every commit message with the line `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Working tree clean at the end.
- No dash punctuation in visible text, comments, docs or commit messages: no em dash, no en dash, no " - " as punctuation. `npm run check:dashes` scans all of `src`.
- Theme tokens only: no raw hex, no `bg-[#...]`, no inline color styles. New tokens go in `@theme` with a light value under `:root[data-theme="light"]`. Text on gold uses `text-void` or `text-on-gold`.
- Tailwind only. No CSS modules or new CSS files. Merge classes with `cn()` from `@/lib/cn`. Importing `leaflet/dist/leaflet.css` from the package is the one allowed exception (third party stylesheet, not our CSS).
- Images through `next/image` only. Leaflet marker PNGs are copied to `public/icons/leaflet/` (under 300 KB each).
- No `dangerouslySetInnerHTML`, `eval`, third party scripts, iframes or CDNs.
- CSP change allowed: add `https://tile.openstreetmap.org` to `img-src` only. Nothing else in `next.config.ts` changes.
- Secrets only in `.env.local` (gitignored). No `NEXT_PUBLIC_` secrets. Never log message or visitor data.
- Server Action validates and sanitizes everything on the server. Limits: name 100, email 254, message 2000.
- Responsive, mobile first, checked at 375, 768 and 1280px. No horizontal scroll. Tap targets at least 44px. Light and dark mode both correct, WCAG AA.
- External links use `target="_blank" rel="noopener noreferrer"` (use `linkProps` from `@/lib/links`).
- Each page exports metadata through `pageMetadata()`. Import with the `@/` alias. Named exports. Server Components by default.
- Read `node_modules/next/dist/docs/` before using a Next.js API (already read: `01-app/02-guides/forms.md`).

## Review Focus

Failure modes the spec implies but no obvious task test covers, most likely first. Each has a test in the task that owns the code.

1. Header injection through the email field (`a@b.com\r\nBcc: x@y.com`, `a@b.com,c@d.com`, `Eve <a@b.com>`) must be rejected, never forwarded to Nodemailer. Test in Task 2.
2. CR and LF in the name field must not reach the subject or reply-to name. Tests in Tasks 2 and 4.
3. A non string form value (a `File`, missing field) must produce a field error, not a crash. Test in Task 2.
4. SMTP failure or missing SMTP configuration must return a generic message with no server detail, and must not throw to the client. Tests in Tasks 4 and 5.
5. Spoofed `x-forwarded-for` values must not bypass throttling entirely: a global cap applies on top of the per client cap. Test in Task 5.
6. Boundary lengths: exactly 2000 characters passes, 2001 fails, emoji count as one character each. Test in Task 2.
7. Form reset after submit must not lose the visitor's typed values when validation fails. Checked in Task 6 verification.

---

## File Structure

| File                                          | Responsibility                                                                               |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `vitest.config.ts`                            | Vitest config with the `@` alias                                                             |
| `src/types/index.ts` (modify)                 | `ContactChannel`, `OfficeLocation`, `ContactInput`, `ContactFieldErrors`, `ContactFormState` |
| `src/content/contact.ts`                      | All page copy, channels, locations                                                           |
| `src/lib/contact-validation.ts`               | `validateContact`, `CONTACT_LIMITS` (pure)                                                   |
| `src/lib/rate-limit.ts`                       | `createRateLimiter` (pure, in memory)                                                        |
| `src/lib/mailer.ts`                           | `readMailConfig`, `buildMessage`, `sendContactEmail`                                         |
| `src/lib/contact-submit.ts`                   | `processContact` orchestration with injected dependencies                                    |
| `src/app/(site)/contact-us/actions.ts`        | `submitContact` Server Action, real wiring                                                   |
| `src/components/ui/ChannelRow.tsx`            | Reusable channel row                                                                         |
| `src/components/ui/EmergencyCard.tsx`         | Emergency line card                                                                          |
| `src/components/ui/ContactForm.tsx`           | Client form, sent state, "send another"                                                      |
| `src/components/ui/LocationMap.tsx`           | Client Leaflet map                                                                           |
| `src/components/sections/ContactHero.tsx`     | Hero                                                                                         |
| `src/components/sections/ContactMessage.tsx`  | Form panel and channels column                                                               |
| `src/components/sections/ContactLocation.tsx` | Location panel                                                                               |
| `src/app/(site)/contact-us/page.tsx` (modify) | Composition and metadata                                                                     |
| `src/app/globals.css` (modify)                | New tokens                                                                                   |
| `next.config.ts` (modify)                     | `img-src` gains the OSM tile host                                                            |
| `scripts/check-images.mjs` (modify)           | Allow the OSM tile URL template                                                              |
| `public/icons/leaflet/*`                      | Marker images                                                                                |
| `.env.example`                                | Documented SMTP variables                                                                    |
| `CLAUDE.md` (modify)                          | `npm test` row, `contact` content note                                                       |

---

### Task 1: Worktree, dependencies and test runner

**Files:**

- Create: `vitest.config.ts`, `src/lib/smoke.test.ts` (deleted at the end of the task)
- Modify: `package.json`, `CLAUDE.md`

**Interfaces:**

- Produces: `npm test` runs Vitest once over `src/**/*.test.ts` with the `@/` alias. `nodemailer` and `leaflet` are installed.

- [ ] **Step 1: Create the worktree (the plan and spec are already committed on main)**

```bash
cd /c/dev/serendib
git worktree add .worktrees/contact-page -b feat/contact-page
cd .worktrees/contact-page && npm install
```

Expected: worktree created, `npm install` finishes without errors. All later commands run from `.worktrees/contact-page`.

- [ ] **Step 2: Install dependencies**

```bash
npm install nodemailer leaflet
npm install -D vitest @types/leaflet
npm view nodemailer@latest types
```

If the last command prints nothing (Nodemailer ships no bundled types), also run `npm install -D @types/nodemailer`.

- [ ] **Step 3: Add the Vitest config**

`vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Add the script and put tests in the check chain**

In `package.json` scripts, add `"test": "vitest run",` after `"typecheck"`, and change `check` to:

```json
"check": "npm run lint && npm run typecheck && npm test && npm run check:dashes && npm run check:images && npm run check:audit"
```

- [ ] **Step 5: Prove the runner and alias work**

`src/lib/smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("test runner", () => {
  it("resolves the @ alias", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
```

Run: `npm test`
Expected: 1 test passed. Then delete `src/lib/smoke.test.ts`.

- [ ] **Step 6: Document the command in CLAUDE.md**

In the Commands table of `CLAUDE.md`, add after the Type check row:

```
| Unit tests       | `npm test`             |
```

- [ ] **Step 7: Check the audit is clean and commit**

```bash
npm run check:audit
git add package.json package-lock.json vitest.config.ts CLAUDE.md
git commit -m "chore: add nodemailer, leaflet and vitest

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Expected: audit reports no vulnerabilities at moderate or above. If it does, stop and report which package.

---

### Task 2: Types and form validation

**Files:**

- Modify: `src/types/index.ts`
- Create: `src/lib/contact-validation.ts`, `src/lib/contact-validation.test.ts`

**Interfaces:**

- Produces (types, exported from `@/types`):

```ts
export type ContactInput = { name: string; email: string; message: string };
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: ContactFieldErrors; values: ContactInput }
  | { status: "sent"; name: string; email: string };
```

- Produces (`@/lib/contact-validation`):

```ts
export const CONTACT_LIMITS: { readonly name: 100; readonly email: 254; readonly message: 2000 };
export function validateContact(raw: {
  name: unknown;
  email: unknown;
  message: unknown;
}):
  | { ok: true; value: ContactInput }
  | { ok: false; errors: ContactFieldErrors; values: ContactInput };
```

`values` on failure are the sanitized strings, safe to echo back into the form.

- [ ] **Step 1: Add the shared types**

Append to `src/types/index.ts`:

```ts
export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  glyph: string;
  href?: string;
};

export type OfficeLocation = {
  id: string;
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  lat: number;
  lng: number;
  zoom: number;
  directionsHref: string;
};

export type ContactInput = { name: string; email: string; message: string };

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactFormState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: ContactFieldErrors; values: ContactInput }
  | { status: "sent"; name: string; email: string };
```

- [ ] **Step 2: Write the failing tests**

`src/lib/contact-validation.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test -- contact-validation`
Expected: FAIL, cannot find module `@/lib/contact-validation`.

- [ ] **Step 4: Implement**

`src/lib/contact-validation.ts`:

```ts
import type { ContactFieldErrors, ContactInput } from "@/types";

export const CONTACT_LIMITS = { name: 100, email: 254, message: 2000 } as const;

const CONTROL_AND_BREAKS = /[\u0000-\u001F\u007F-\u009F\u2028\u2029]+/g;
const MESSAGE_CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u2028\u2029]/g;
const EMAIL_SHAPE = /^[^\s@,;<>()"\\]+@[^\s@,;<>()"\\]+\.[^\s@,;<>()"\\]+$/;

const asText = (value: unknown) => (typeof value === "string" ? value : "");
const length = (value: string) => Array.from(value).length;

function cleanName(value: unknown) {
  return asText(value).replace(CONTROL_AND_BREAKS, " ").replace(/\s+/g, " ").trim();
}

function cleanEmail(value: unknown) {
  return asText(value).trim();
}

function cleanMessage(value: unknown) {
  return asText(value).replace(/\r\n?/g, "\n").replace(MESSAGE_CONTROL, "").trim();
}

export function validateContact(raw: {
  name: unknown;
  email: unknown;
  message: unknown;
}):
  | { ok: true; value: ContactInput }
  | { ok: false; errors: ContactFieldErrors; values: ContactInput } {
  const values: ContactInput = {
    name: cleanName(raw.name),
    email: cleanEmail(raw.email),
    message: cleanMessage(raw.message),
  };
  const errors: ContactFieldErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (length(values.name) > CONTACT_LIMITS.name)
    errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;

  if (!values.email) errors.email = "Please enter your email address.";
  else if (length(values.email) > CONTACT_LIMITS.email)
    errors.email = `Email must be ${CONTACT_LIMITS.email} characters or fewer.`;
  else if (!EMAIL_SHAPE.test(values.email)) errors.email = "Please enter a valid email address.";

  if (!values.message) errors.message = "Please tell us how we can help.";
  else if (length(values.message) > CONTACT_LIMITS.message)
    errors.message = `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;

  return Object.keys(errors).length ? { ok: false, errors, values } : { ok: true, value: values };
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- contact-validation`
Expected: all tests pass.

- [ ] **Step 6: Lint, types and commit**

```bash
npm run lint && npm run typecheck && npm run check:dashes
git add src/types/index.ts src/lib/contact-validation.ts src/lib/contact-validation.test.ts
git commit -m "feat: add contact form validation

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Rate limiter

**Files:**

- Create: `src/lib/rate-limit.ts`, `src/lib/rate-limit.test.ts`

**Interfaces:**

- Produces:

```ts
export type RateLimiter = {
  /** Records an attempt. Returns true when allowed, false when over the limit. */
  hit(key: string, now?: number): boolean;
  size(): number;
};
export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}): RateLimiter;
```

- [ ] **Step 1: Write the failing tests**

`src/lib/rate-limit.test.ts`:

```ts
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
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- rate-limit`
Expected: FAIL, cannot find module.

- [ ] **Step 3: Implement**

`src/lib/rate-limit.ts`:

```ts
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
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- rate-limit`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
npm run lint && npm run typecheck
git add src/lib/rate-limit.ts src/lib/rate-limit.test.ts
git commit -m "feat: add in memory rate limiter

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Mailer

**Files:**

- Create: `src/lib/mailer.ts`, `src/lib/mailer.test.ts`, `.env.example`
- Modify: `.gitignore` only if `.env.example` is ignored (check in Step 6)

**Interfaces:**

- Consumes: `ContactInput` from `@/types`.
- Produces:

```ts
export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user?: string;
  pass?: string;
  to: string;
  from: string;
};
export function readMailConfig(env: Record<string, string | undefined>): MailConfig | null;
export function buildMessage(
  input: ContactInput,
  config: Pick<MailConfig, "to" | "from">,
): SendMailOptions;
export async function sendContactEmail(
  input: ContactInput,
  env?: Record<string, string | undefined>,
): Promise<void>;
```

`sendContactEmail` throws `Error("Mail is not configured")` when `readMailConfig` returns `null`. `SendMailOptions` is imported from `nodemailer`.

- [ ] **Step 1: Write the failing tests**

`src/lib/mailer.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- mailer`
Expected: FAIL, cannot find module `@/lib/mailer`.

- [ ] **Step 3: Implement**

`src/lib/mailer.ts`:

```ts
import nodemailer, { type SendMailOptions } from "nodemailer";
import type { ContactInput } from "@/types";

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user?: string;
  pass?: string;
  to: string;
  from: string;
};

type Env = Record<string, string | undefined>;

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function readMailConfig(env: Env): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = env;
  if (!SMTP_HOST || !SMTP_PORT || !CONTACT_TO || !CONTACT_FROM) return null;

  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
  if (Boolean(SMTP_USER) !== Boolean(SMTP_PASS)) return null;

  const secure = port === 465;
  return {
    host: SMTP_HOST,
    port,
    secure,
    requireTLS: !secure && env.SMTP_REQUIRE_TLS !== "false",
    user: SMTP_USER || undefined,
    pass: SMTP_PASS || undefined,
    to: CONTACT_TO,
    from: CONTACT_FROM,
  };
}

export function buildMessage(
  input: ContactInput,
  config: Pick<MailConfig, "to" | "from">,
): SendMailOptions {
  const name = oneLine(input.name);
  return {
    from: { name: "Serendib Healthways website", address: config.from },
    to: config.to,
    replyTo: { name, address: input.email },
    subject: `Website contact: ${name}`,
    text: `Name: ${name}\nEmail: ${input.email}\n\n${input.message}`,
  };
}

export async function sendContactEmail(input: ContactInput, env: Env = process.env): Promise<void> {
  const config = readMailConfig(env);
  if (!config) throw new Error("Mail is not configured");

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transport.sendMail(buildMessage(input, config));
  } finally {
    transport.close();
  }
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- mailer`
Expected: all pass.

- [ ] **Step 5: Document the environment variables**

`.env.example`:

```
# Copy to .env.local and fill in. Never commit real values.
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
# Where contact messages are delivered, and the address they are sent from.
CONTACT_TO=serendib.healthways@ktdoctor.com
CONTACT_FROM=website@example.com
# Local testing against a plain SMTP catcher only. Leave unset in production.
# SMTP_REQUIRE_TLS=false
```

- [ ] **Step 6: Make sure `.env.example` is trackable, then commit**

```bash
git check-ignore -v .env.example || echo "not ignored"
```

If it prints an ignore rule, add `!.env.example` under the env rules in `.gitignore`.

```bash
npm run lint && npm run typecheck
git add src/lib/mailer.ts src/lib/mailer.test.ts .env.example .gitignore
git commit -m "feat: add SMTP mailer for contact messages

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Submit orchestration and Server Action

**Files:**

- Create: `src/lib/contact-submit.ts`, `src/lib/contact-submit.test.ts`, `src/app/(site)/contact-us/actions.ts`

**Interfaces:**

- Consumes: `validateContact` (Task 2), `createRateLimiter` (Task 3), `sendContactEmail` (Task 4), `ContactFormState` and `ContactInput` from `@/types`.
- Produces:

```ts
export const MIN_FILL_MS = 3000;
export type ContactDeps = {
  now: () => number;
  allow: () => boolean;
  send: (input: ContactInput) => Promise<void>;
  onSendError?: (error: unknown) => void;
};
export async function processContact(
  formData: FormData,
  deps: ContactDeps,
): Promise<ContactFormState>;
```

Form field names: `name`, `email`, `message`, honeypot `website`, timing `startedAt` (milliseconds since epoch as a string).

`actions.ts` exports only `submitContact(previous: ContactFormState, formData: FormData): Promise<ContactFormState>`.

- [ ] **Step 1: Write the failing tests**

`src/lib/contact-submit.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { MIN_FILL_MS, processContact, type ContactDeps } from "@/lib/contact-submit";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const good = { name: "Nimal Perera", email: "nimal@example.com", message: "Hello there" };

function deps(
  overrides: Partial<ContactDeps> = {},
): ContactDeps & { send: ReturnType<typeof vi.fn> } {
  return {
    now: () => 100_000,
    allow: () => true,
    send: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  } as ContactDeps & { send: ReturnType<typeof vi.fn> };
}

describe("processContact", () => {
  it("sends a valid message and reports success", async () => {
    const d = deps();
    const state = await processContact(form(good), d);
    expect(state).toEqual({ status: "sent", name: "Nimal Perera", email: "nimal@example.com" });
    expect(d.send).toHaveBeenCalledWith(good);
  });

  it("returns field errors and the entered values without sending", async () => {
    const d = deps();
    const state = await processContact(form({ ...good, email: "nope" }), d);
    expect(state.status).toBe("error");
    if (state.status === "error") {
      expect(state.errors.email).toBeDefined();
      expect(state.values.name).toBe("Nimal Perera");
    }
    expect(d.send).not.toHaveBeenCalled();
  });

  it("pretends to succeed but sends nothing when the honeypot is filled", async () => {
    const d = deps();
    const state = await processContact(form({ ...good, website: "http://spam.example" }), d);
    expect(state.status).toBe("sent");
    expect(d.send).not.toHaveBeenCalled();
  });

  it("pretends to succeed but sends nothing when submitted too fast", async () => {
    const d = deps();
    const state = await processContact(
      form({ ...good, startedAt: String(100_000 - (MIN_FILL_MS - 1)) }),
      d,
    );
    expect(state.status).toBe("sent");
    expect(d.send).not.toHaveBeenCalled();
  });

  it("sends when the fill time is long enough", async () => {
    const d = deps();
    await processContact(form({ ...good, startedAt: String(100_000 - MIN_FILL_MS) }), d);
    expect(d.send).toHaveBeenCalledTimes(1);
  });

  it("skips the timing check when startedAt is missing, invalid or in the future", async () => {
    for (const startedAt of ["", "abc", String(200_000)]) {
      const d = deps();
      await processContact(form({ ...good, startedAt }), d);
      expect(d.send).toHaveBeenCalledTimes(1);
    }
  });

  it("returns a friendly error and sends nothing when rate limited", async () => {
    const d = deps({ allow: () => false });
    const state = await processContact(form(good), d);
    expect(state.status).toBe("error");
    if (state.status === "error") expect(state.message).toMatch(/call or text/i);
    expect(d.send).not.toHaveBeenCalled();
  });

  it("hides SMTP details when sending fails and reports the error to the hook", async () => {
    const onSendError = vi.fn();
    const d = deps({
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
    const d = deps();
    const state = await processContact(data, d);
    expect(state.status).toBe("error");
    expect(d.send).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- contact-submit`
Expected: FAIL, cannot find module.

- [ ] **Step 3: Implement the orchestration**

`src/lib/contact-submit.ts`:

```ts
import { validateContact } from "@/lib/contact-validation";
import type { ContactFormState, ContactInput } from "@/types";

export const MIN_FILL_MS = 3000;

export type ContactDeps = {
  now: () => number;
  allow: () => boolean;
  send: (input: ContactInput) => Promise<void>;
  onSendError?: (error: unknown) => void;
};

const FAILED = "We could not send your message. Please call or text us instead.";
const THROTTLED = "Too many messages just now. Please wait a few minutes, or call or text us.";

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

function tooFast(startedAt: string, now: number) {
  const started = Number(startedAt);
  if (!startedAt || !Number.isFinite(started) || started > now) return false;
  return now - started < MIN_FILL_MS;
}

export async function processContact(
  formData: FormData,
  deps: ContactDeps,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };
  const fake = (): ContactFormState => ({
    status: "sent",
    name: text(formData, "name").slice(0, 100),
    email: text(formData, "email").slice(0, 254),
  });

  if (text(formData, "website")) return fake();

  const checked = validateContact(raw);

  if (!deps.allow()) {
    return {
      status: "error",
      message: THROTTLED,
      errors: {},
      values: checked.ok ? checked.value : checked.values,
    };
  }

  if (tooFast(text(formData, "startedAt"), deps.now())) return fake();

  if (!checked.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: checked.errors,
      values: checked.values,
    };
  }

  try {
    await deps.send(checked.value);
  } catch (error) {
    deps.onSendError?.(error);
    return { status: "error", message: FAILED, errors: {}, values: checked.value };
  }

  return { status: "sent", name: checked.value.name, email: checked.value.email };
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- contact-submit`
Expected: all pass.

- [ ] **Step 5: Write the Server Action**

`src/app/(site)/contact-us/actions.ts`:

```ts
"use server";

import { headers } from "next/headers";
import { processContact } from "@/lib/contact-submit";
import { sendContactEmail } from "@/lib/mailer";
import { createRateLimiter } from "@/lib/rate-limit";
import type { ContactFormState } from "@/types";

const TEN_MINUTES = 10 * 60 * 1000;
// Per visitor cap, plus a global cap so a spoofed x-forwarded-for cannot bypass throttling.
const perClient = createRateLimiter({ limit: 5, windowMs: TEN_MINUTES });
const overall = createRateLimiter({ limit: 30, windowMs: TEN_MINUTES, maxKeys: 1 });

function logSendFailure(error: unknown) {
  // Log only the error kind. Never the message, the visitor or SMTP credentials.
  const code =
    error instanceof Error && "code" in error
      ? String((error as { code: unknown }).code)
      : "unknown";
  console.error(`contact form: send failed (${code})`);
}

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwarded || requestHeaders.get("x-real-ip") || "unknown";

  return processContact(formData, {
    now: Date.now,
    allow: () => overall.hit("all") && perClient.hit(clientKey),
    send: (input) => sendContactEmail(input),
    onSendError: logSendFailure,
  });
}
```

- [ ] **Step 6: Add a test for the global cap and commit**

Add to `src/lib/rate-limit.test.ts` inside the describe block:

```ts
it("supports a single key global cap", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 1000, maxKeys: 1 });
  expect(limiter.hit("all", 0)).toBe(true);
  expect(limiter.hit("all", 1)).toBe(true);
  expect(limiter.hit("all", 2)).toBe(false);
});
```

```bash
npm test && npm run lint && npm run typecheck
git add src/lib src/app
git commit -m "feat: add contact form submit flow and server action

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Expected: every test passes.

---

### Task 6: Tokens, content and the form UI

**Files:**

- Modify: `src/app/globals.css`
- Create: `src/content/contact.ts`, `src/components/ui/ChannelRow.tsx`, `src/components/ui/EmergencyCard.tsx`, `src/components/ui/ContactForm.tsx`, `src/components/sections/ContactHero.tsx`, `src/components/sections/ContactMessage.tsx`
- Modify: `src/app/(site)/contact-us/page.tsx`

**Interfaces:**

- Consumes: `ContactChannel`, `ContactFormState` from `@/types`; `submitContact` from `./actions`; `Container`, `CornerFrame`, `linkProps`, `hitArea`, `cn`, `site.contact`.
- Produces (`@/content/contact`): `contactHero`, `contactForm`, `contactChannels: ContactChannel[]`, `emergencyLine`, `contactLocation`, `locations: OfficeLocation[]` (locations added in Task 7).

- [ ] **Step 1: Add the new theme tokens**

In `src/app/globals.css`, inside `@theme`, after `--color-switch-gap: #07181e;` add:

```css
--color-amber-ring: rgba(232, 182, 74, 0.5);
--color-amber-glow: rgba(232, 182, 74, 0.18);
--color-amber-wash-from: rgba(120, 60, 10, 0.28);
--color-amber-wash-to: rgba(40, 20, 6, 0.2);
```

After `--color-scrim: rgba(2, 8, 10, 0.72);` (static colors) add:

```css
--color-amber-disc-from: #f7c96a;
--color-amber-disc-to: #c7811d;
--color-amber-disc-edge: #f7d58a;
```

After `--shadow-aqua-soft: ...;` add:

```css
--shadow-field-focus:
  inset 0 0 0 1px var(--color-inset-shade), 0 0 0 1px var(--color-halo-mid),
  0 0 18px var(--color-halo-soft);
--shadow-emergency:
  0 0 0 3px var(--color-page), 0 0 0 4px var(--color-amber-ring), 0 0 30px var(--color-amber-glow);
--shadow-emergency-hover:
  0 0 0 3px var(--color-page), 0 0 0 4px var(--color-amber), 0 0 40px var(--color-amber-ring);
--shadow-check:
  0 0 0 4px var(--color-page), 0 0 0 5px var(--color-halo), 0 0 30px var(--color-halo-half);
```

Also add the map filter token (after the shadows, before gradients):

```css
--map-filter: invert(0.92) hue-rotate(180deg) saturate(0.55) brightness(0.9) contrast(0.95);
```

In `:root[data-theme="light"]`, after `--color-switch-gap: #f6eedb;` add:

```css
--color-amber-ring: rgba(154, 90, 8, 0.5);
--color-amber-glow: rgba(154, 90, 8, 0.16);
--color-amber-wash-from: rgba(232, 182, 74, 0.28);
--color-amber-wash-to: rgba(240, 214, 160, 0.3);
--map-filter: none;
```

Run `npm run build` at the end of Task 7 to confirm `--map-filter` is emitted. Tailwind v4 only outputs theme variables that generated CSS references, and Task 7 references it.

- [ ] **Step 2: Add the content file (channels, hero, form copy)**

`src/content/contact.ts`:

```ts
import { site } from "@/content/site";
import type { ContactChannel, OfficeLocation } from "@/types";

export const contactHero = {
  breadcrumb: { home: "HOME", current: "CONTACT US" },
  eyebrow: "CONTACT US",
  titleStart: "Drop us a message for ",
  titleHighlight: "any query.",
  description:
    "Thank you for contacting us. We are here to help, whether you're already a member or just want to know more about our plans.",
};

export const contactForm = {
  title: "Send a message",
  note: "ALL FIELDS REQUIRED",
  fields: {
    name: { label: "NAME", placeholder: "Parent or guardian name" },
    email: { label: "EMAIL", placeholder: "you@example.com" },
    message: { label: "MESSAGE", placeholder: "How can we help?" },
  },
  submit: "SEND ▸",
  sending: "SENDING",
  sent: {
    eyebrow: "MESSAGE RECEIVED",
    thanks: "Thank you, ",
    replyBefore: "Our team will reply to ",
    replyAfter: ". For anything urgent, call or text us directly.",
    another: "SEND ANOTHER",
  },
};

export const emergencyLine = {
  label: "EMERGENCY LINE",
  value: "1 818 361 5437",
  href: "tel:+18183615437",
  action: "CALL ▸",
};

export const channelsTitle = "REACH OUR TEAM";

export const contactChannels: ContactChannel[] = [
  {
    id: "call",
    label: "CALL US",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    glyph: "☏",
  },
  {
    id: "text",
    label: "TEXT US, ENGLISH AND SPANISH",
    value: site.contact.text,
    href: site.contact.textHref,
    glyph: "✉",
  },
  {
    id: "messenger",
    label: "MESSENGER, ENGLISH AND SPANISH",
    value: "Chat with our team",
    href: site.contact.messengerHref,
    glyph: "✦",
  },
  {
    id: "email",
    label: "EMAIL US",
    value: "serendib.healthways@ktdoctor.com",
    href: "mailto:serendib.healthways@ktdoctor.com",
    glyph: "@",
  },
  { id: "fax", label: "FAX", value: "1 626 655 4042", glyph: "⎙" },
];

export const contactLocation = {
  eyebrow: "OUR LOCATION",
  title: "Serendib Healthways, Pasadena.",
  directions: "GET DIRECTIONS ▸",
  mapLabel: "Map showing the Serendib Healthways office in Pasadena",
};

// Coordinates are filled in Task 7 from a one time OpenStreetMap lookup.
export const locations: OfficeLocation[] = [];
```

- [ ] **Step 3: Build `ChannelRow`**

`src/components/ui/ChannelRow.tsx`:

```tsx
import { linkProps } from "@/lib/links";
import type { ContactChannel } from "@/types";

const row =
  "relative flex min-h-[72px] items-center gap-4 border border-line-mid bg-linear-to-r from-row-from to-row-to px-[18px] py-3.5 transition-all duration-200";
const linkRow =
  "hover:border-gold-bright hover:shadow-row-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright";

/** A framed contact channel. Renders a link when the channel has an href, otherwise static text. */
export function ChannelRow({ channel }: { channel: ContactChannel }) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="flex size-11 flex-none items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-moon to-disc-to text-[18px] text-gold-bright shadow-moon"
      >
        {channel.glyph}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <span className="font-display text-[11px] tracking-[0.18em] text-subtle">
          {channel.label}
        </span>
        <span className="font-display text-[16px] tracking-[0.03em] [overflow-wrap:anywhere] text-heading">
          {channel.value}
        </span>
      </span>
      {channel.href && (
        <span aria-hidden="true" className="font-display text-[14px] text-gold-bright">
          ▸
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute right-[3px] bottom-[3px] h-1.5 w-2.5 border-r border-b border-halo-strong"
      />
    </>
  );

  return channel.href ? (
    <a href={channel.href} className={`${row} ${linkRow}`} {...linkProps(channel.href)}>
      {content}
    </a>
  ) : (
    <div className={row}>{content}</div>
  );
}
```

- [ ] **Step 4: Build `EmergencyCard`**

`src/components/ui/EmergencyCard.tsx`:

```tsx
import { emergencyLine } from "@/content/contact";

export function EmergencyCard() {
  return (
    <a
      href={emergencyLine.href}
      className="relative flex min-h-[44px] items-center gap-[18px] border border-amber bg-linear-to-r from-amber-wash-from to-amber-wash-to px-[22px] py-5 shadow-emergency transition-shadow duration-200 hover:shadow-emergency-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
    >
      <span
        aria-hidden="true"
        className="flex size-[52px] flex-none items-center justify-center rounded-full border-2 border-amber-disc-edge bg-radial-[circle_at_40%_35%] from-amber-disc-from to-amber-disc-to text-[22px] font-bold text-on-gold motion-safe:animate-pulse-soft"
      >
        !
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-display text-[12px] tracking-[0.2em] text-amber">
          {emergencyLine.label}
        </span>
        <span className="font-display text-[clamp(20px,5vw,24px)] tracking-[0.04em] text-heading">
          {emergencyLine.value}
        </span>
      </span>
      <span className="font-display text-[12px] tracking-[0.16em] text-amber">
        {emergencyLine.action}
      </span>
    </a>
  );
}
```

- [ ] **Step 5: Build the client form**

`src/components/ui/ContactForm.tsx`:

```tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { submitContact } from "@/app/(site)/contact-us/actions";
import { contactForm } from "@/content/contact";
import { CONTACT_LIMITS } from "@/lib/contact-validation";
import { cn } from "@/lib/cn";
import type { ContactFormState } from "@/types";

const initial: ContactFormState = { status: "idle" };

const label = "font-display text-[12px] tracking-[0.18em] text-gold-bright";
const field =
  "w-full border border-edge bg-pill px-4 py-3.5 font-sans text-[19px] text-heading shadow-pill placeholder:text-fine focus:border-gold-bright focus:shadow-field-focus focus:outline-2 focus:outline-offset-2 focus:outline-gold-bright";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span id={id} role="alert" className="text-[17px] text-amber">
      {message}
    </span>
  ) : null;
}

function Round({ onAnother }: { onAnother: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);

  if (state.status === "sent") {
    return (
      <div className="flex flex-col items-center gap-[18px] py-10 text-center" aria-live="polite">
        <span
          aria-hidden="true"
          className="flex size-[72px] items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid text-[30px] text-on-gold shadow-check"
        >
          ✓
        </span>
        <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
          {contactForm.sent.eyebrow}
        </span>
        <span className="font-display text-[26px] leading-[1.2] text-heading">
          {contactForm.sent.thanks}
          {state.name}.
        </span>
        <p className="m-0 max-w-[420px] text-[19px] leading-[1.55] text-pretty text-soft">
          {contactForm.sent.replyBefore}
          {state.email}
          {contactForm.sent.replyAfter}
        </p>
        <button
          type="button"
          onClick={onAnother}
          className="min-h-11 cursor-pointer border border-edge px-[22px] py-3 font-display text-[12px] tracking-[0.16em] text-gold-bright hover:border-gold-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
        >
          {contactForm.sent.another}
        </button>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : { name: "", email: "", message: "" };
  const invalid = (key: keyof typeof errors) => (errors[key] ? true : undefined);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-[22px] text-heading">{contactForm.title}</span>
        <span className="text-right font-display text-[11px] tracking-[0.18em] text-subtle">
          {contactForm.note}
        </span>
      </div>
      <span aria-hidden="true" className="h-px bg-linear-to-r from-gold to-gold-clear" />

      <label className="flex flex-col gap-2">
        <span className={label}>{contactForm.fields.name.label}</span>
        <input
          name="name"
          required
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          defaultValue={values.name}
          placeholder={contactForm.fields.name.placeholder}
          aria-invalid={invalid("name")}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
        />
        <FieldError id="name-error" message={errors.name} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={label}>{contactForm.fields.email.label}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
          defaultValue={values.email}
          placeholder={contactForm.fields.email.placeholder}
          aria-invalid={invalid("email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={field}
        />
        <FieldError id="email-error" message={errors.email} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={label}>{contactForm.fields.message.label}</span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message}
          defaultValue={values.message}
          placeholder={contactForm.fields.message.placeholder}
          aria-invalid={invalid("message")}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(field, "min-h-[150px] resize-y leading-normal")}
        />
        <FieldError id="message-error" message={errors.message} />
      </label>

      {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      {state.status === "error" && (
        <p role="alert" className="m-0 text-[17px] text-amber">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-11 cursor-pointer self-start border border-gold-pale bg-linear-to-b from-gold-soft to-gold px-11 py-4 font-display text-[14px] tracking-[0.2em] text-void shadow-cta transition-shadow hover:shadow-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? contactForm.sending : contactForm.submit}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [round, setRound] = useState(0);
  return <Round key={round} onAnother={() => setRound((current) => current + 1)} />;
}
```

- [ ] **Step 6: Build the hero and message sections**

`src/components/sections/ContactHero.tsx`:

```tsx
import Link from "next/link";
import { contactHero } from "@/content/contact";
import { hitArea } from "@/lib/styles";

export function ContactHero() {
  return (
    <section
      data-hero
      className="mx-auto flex max-w-site flex-col gap-6 px-5 pt-12 pb-10 nav:px-7 nav:pt-16"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2.5 font-display text-[12px] tracking-[0.18em] text-subtle"
      >
        <Link href="/" className={`${hitArea} hover:text-gold-bright`}>
          {contactHero.breadcrumb.home}
        </Link>
        <span aria-hidden="true" className="text-gold">
          ✦
        </span>
        <span aria-current="page" className="text-gold-pale">
          {contactHero.breadcrumb.current}
        </span>
      </nav>
      <div className="flex items-center gap-3.5">
        <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
        <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
          {contactHero.eyebrow}
        </span>
      </div>
      <h1
        data-parallax="0.07"
        className="m-0 max-w-[900px] text-[clamp(34px,4.6vw,60px)] leading-[1.08] font-medium text-balance text-shadow-heading"
      >
        {contactHero.titleStart}
        <span className="text-highlight">{contactHero.titleHighlight}</span>
      </h1>
      <p className="m-0 max-w-[640px] text-[clamp(18px,2.2vw,21px)] leading-[1.55] text-pretty text-soft">
        {contactHero.description}
      </p>
    </section>
  );
}
```

`src/components/sections/ContactMessage.tsx`:

```tsx
import { ChannelRow } from "@/components/ui/ChannelRow";
import { ContactForm } from "@/components/ui/ContactForm";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { EmergencyCard } from "@/components/ui/EmergencyCard";
import { channelsTitle, contactChannels } from "@/content/contact";

export function ContactMessage() {
  return (
    <section
      id="message"
      className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-10 px-5 pt-6 pb-16 nav:px-7 nav:pb-24"
    >
      <CornerFrame className="bg-linear-to-b from-card-from to-card-to p-[clamp(24px,4vw,44px)] shadow-hero-frame">
        <ContactForm />
      </CornerFrame>

      <div className="flex flex-col gap-[22px]">
        <EmergencyCard />
        <div className="flex flex-col gap-3">
          <span className="font-display text-[13px] tracking-[0.2em] text-subtle">
            {channelsTitle}
          </span>
          <div className="flex flex-col gap-2.5">
            {contactChannels.map((channel) => (
              <ChannelRow key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Compose the page (location section comes in Task 7)**

`src/app/(site)/contact-us/page.tsx`:

```tsx
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactMessage } from "@/components/sections/ContactMessage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Send Serendib Healthways a message, call, text or email our team, or find our Pasadena office.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  return (
    <>
      <ContactHero />
      <ContactMessage />
    </>
  );
}
```

- [ ] **Step 8: Run the automated checks**

```bash
npm run lint && npm run typecheck && npm test && npm run check:dashes && npm run check:images
```

Expected: all pass. Fix any lint errors (for example the `useEffect` set state lint rule: if `react-hooks/set-state-in-effect` fails, replace the effect with a `useRef` set in `useEffect` and read it in an `onSubmit` handler that writes it into a hidden input via `event.currentTarget.elements`).

- [ ] **Step 9: Exercise the form against a local SMTP catcher**

Create a throwaway catcher in the scratchpad (not the repo):

```bash
SP="C:/Users/User/AppData/Local/Temp/claude/c--dev-serendib/5e7c2478-04e7-4872-9af5-5bad524d0b02/scratchpad/smtp"
mkdir -p "$SP" && cd "$SP" && npm init -y >/dev/null && npm install smtp-server mailparser
cat > catcher.mjs <<'EOF'
import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
const server = new SMTPServer({
  authOptional: true,
  disabledCommands: ["STARTTLS"],
  onData(stream, session, done) {
    simpleParser(stream).then((mail) => {
      console.log("MAIL", JSON.stringify({ subject: mail.subject, to: mail.to?.text, replyTo: mail.replyTo?.text, text: mail.text }));
      done();
    });
  },
});
server.listen(2525, "127.0.0.1", () => console.log("catcher on 2525"));
EOF
node catcher.mjs
```

Run the catcher in the background. In the worktree create `.env.local`:

```
SMTP_HOST=127.0.0.1
SMTP_PORT=2525
CONTACT_TO=team@example.com
CONTACT_FROM=website@example.com
SMTP_REQUIRE_TLS=false
```

Start `npm run dev`, open `http://localhost:3000/contact-us`, wait 4 seconds, then submit a valid message. Expected: the sent state appears and the catcher prints a `MAIL` line with the reply to set to the visitor and the message text intact. Then submit with an invalid email: expected field error, typed name and message still present (Review Focus 7). Stop `.env.local` SMTP host (change the port) and submit again: expected the generic "call or text us" message and no SMTP detail in the page or the browser network response.

- [ ] **Step 10: Commit**

```bash
git add src/app src/content/contact.ts src/components
git commit -m "feat: build the Contact Us hero, form and channels

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

`.env.local` is gitignored and must not be staged.

---

### Task 7: Location map

**Files:**

- Create: `src/components/ui/LocationMap.tsx`, `src/components/sections/ContactLocation.tsx`, `public/icons/leaflet/marker-icon.png`, `marker-icon-2x.png`, `marker-shadow.png`
- Modify: `src/content/contact.ts`, `src/app/(site)/contact-us/page.tsx`, `next.config.ts`, `scripts/check-images.mjs`

**Interfaces:**

- Consumes: `OfficeLocation`, `locations`, `contactLocation` from Task 6, `Button`.
- Produces: `LocationMap({ location, label }: { location: OfficeLocation; label: string })`, `ContactLocation()`.

- [ ] **Step 1: Look up the office coordinates once**

```bash
curl -s -A "serendib-website-build (Sanjula.Rajapaksha@ktdoctor.com)" \
  "https://nominatim.openstreetmap.org/search?q=504+S+Sierra+Madre+Blvd,+Pasadena,+CA+91107&format=json&limit=1"
```

Record `lat` and `lon`. If the result is empty or not in Pasadena, stop and ask the user for the coordinates rather than guessing.

- [ ] **Step 2: Fill the location in the content file**

Replace the empty `locations` export in `src/content/contact.ts` (use the real looked up numbers for `LAT` and `LNG`):

```ts
export const locations: OfficeLocation[] = [
  {
    id: "pasadena",
    name: "Serendib Healthways, Pasadena.",
    street: site.contact.address.street,
    city: site.contact.address.city,
    region: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    lat: LAT,
    lng: LNG,
    zoom: 16,
    directionsHref: "https://www.openstreetmap.org/directions?route=%3BLAT%2CLNG",
  },
];
```

Replace `LAT` and `LNG` inside `directionsHref` with the same values too (the format is `route=<from>;<to>`, from left empty so the visitor's own start point is used).

- [ ] **Step 3: Copy the Leaflet marker images locally**

```bash
mkdir -p public/icons/leaflet
cp node_modules/leaflet/dist/images/marker-icon.png node_modules/leaflet/dist/images/marker-icon-2x.png node_modules/leaflet/dist/images/marker-shadow.png public/icons/leaflet/
npm run check:images
```

Expected: passes (each file is a few KB).

- [ ] **Step 4: Allow the OSM tile template in the image checker**

In `scripts/check-images.mjs`, inside the `.forEach((line, i) => {` callback, add as the first statement after `const where = ...;`:

```js
// Map tiles from tile.openstreetmap.org are loaded at runtime by Leaflet and approved in the CSP.
if (line.includes("tile.openstreetmap.org")) return;
```

- [ ] **Step 5: Add the CSP entry**

In `next.config.ts`, change the `img-src` line to:

```ts
  "img-src 'self' blob: data: https://tile.openstreetmap.org",
```

Also update the comment above the array: replace "Everything is served from our own origin: no external scripts, images, fonts or frames." with "Everything is served from our own origin, except OpenStreetMap map tiles (img-src only, approved for the Contact page map). No external scripts, fonts or frames."

- [ ] **Step 6: Build the map component**

`src/components/ui/LocationMap.tsx`:

```tsx
"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { OfficeLocation } from "@/types";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

const chrome = [
  "[&_.leaflet-tile-pane]:[filter:var(--map-filter)]",
  "[&_.leaflet-container]:bg-pill [&_.leaflet-container]:font-sans",
  "[&_.leaflet-bar]:border-0 [&_.leaflet-bar]:shadow-ring",
  "[&_.leaflet-bar_a]:border-edge [&_.leaflet-bar_a]:bg-btn-from [&_.leaflet-bar_a]:text-label",
  "[&_.leaflet-bar_a:hover]:bg-btn-to [&_.leaflet-bar_a:hover]:text-gold-bright",
  "[&_.leaflet-control-attribution]:bg-rail-bg [&_.leaflet-control-attribution]:text-subtle",
  "[&_.leaflet-control-attribution_a]:text-gold-bright",
].join(" ");

export function LocationMap({ location, label }: { location: OfficeLocation; label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !container.current) return;

      const center: [number, number] = [location.lat, location.lng];
      map = L.map(container.current, { scrollWheelZoom: false }).setView(center, location.zoom);
      L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map);
      L.marker(center, {
        title: location.name,
        alt: location.name,
        icon: L.icon({
          iconUrl: "/icons/leaflet/marker-icon.png",
          iconRetinaUrl: "/icons/leaflet/marker-icon-2x.png",
          shadowUrl: "/icons/leaflet/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);

      // Keep page scrolling smooth on touch and wheel until the map is focused.
      map.on("focus", () => map?.scrollWheelZoom.enable());
      map.on("blur", () => map?.scrollWheelZoom.disable());
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [location]);

  return (
    <div
      ref={container}
      role="region"
      aria-label={label}
      className={`relative h-full min-h-[352px] w-full overflow-hidden border border-line-strong bg-pill ${chrome}`}
    />
  );
}
```

- [ ] **Step 7: Build the location section and add it to the page**

`src/components/sections/ContactLocation.tsx`:

```tsx
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/ui/LocationMap";
import { contactLocation, locations } from "@/content/contact";

export function ContactLocation() {
  const [location] = locations;

  return (
    <section id="directions" className="mx-auto max-w-site px-5 pb-20 nav:px-7 nav:pb-28">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border border-line-bold bg-linear-120 from-panel-from to-panel-to shadow-panel">
        <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,52px)]">
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="h-px w-12 bg-linear-to-r from-gold-clear to-gold" />
            <span className="font-display text-[13px] tracking-[0.22em] text-gold-bright">
              {contactLocation.eyebrow}
            </span>
          </div>
          <h2 className="m-0 text-[clamp(26px,3vw,38px)] leading-[1.18] font-medium text-balance">
            {contactLocation.title}
          </h2>
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex size-12 flex-none items-center justify-center rounded-full border-2 border-gold bg-radial-[circle_at_40%_35%] from-moon to-disc-to text-[19px] text-gold-bright shadow-moon"
            >
              ⌖
            </span>
            <address className="m-0 text-[clamp(18px,2.2vw,21px)] leading-[1.5] text-soft not-italic">
              {location.street}
              <br />
              {location.city}, {location.region} {location.postalCode}
            </address>
          </div>
          <Button href={location.directionsHref} variant="dark" size="md" className="self-start">
            {contactLocation.directions}
          </Button>
        </div>
        <div className="border-t border-line-soft p-3.5 nav:border-t-0 nav:border-l">
          <LocationMap location={location} label={contactLocation.mapLabel} />
        </div>
      </div>
    </section>
  );
}
```

In `src/app/(site)/contact-us/page.tsx`, import `ContactLocation` from `@/components/sections/ContactLocation` and render `<ContactLocation />` after `<ContactMessage />`.

- [ ] **Step 8: Run all checks and the production build**

```bash
npm run check && npm run build
```

Expected: everything passes. Then confirm the map token is emitted:

```bash
grep -rl "map-filter" .next/static | head -1
```

Expected: at least one CSS file is listed. If none, move `--map-filter` into a `@theme static { }` block in `globals.css` and rebuild.

- [ ] **Step 9: Verify the CSP does not block tiles**

Run `npm run build && npm start`, open `http://localhost:3000/contact-us`, check the browser console for CSP violations and confirm tiles and the marker appear. Expected: no violations. Confirm the response `Content-Security-Policy` header changed only in `img-src`:

```bash
curl -sI http://localhost:3000/contact-us | grep -i content-security-policy
```

- [ ] **Step 10: Commit**

```bash
git add src public next.config.ts scripts
git commit -m "feat: add the Contact Us location map with OpenStreetMap and Leaflet

Allows tile.openstreetmap.org in the CSP img-src only, approved by the user.

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Visual verification, docs and merge

**Files:**

- Modify: `CLAUDE.md`, and any component that fails visual checks.

**Interfaces:** none new.

- [ ] **Step 1: Capture screenshots in every size and theme**

With `npm run dev` running in the worktree:

```bash
SP="C:/Users/User/AppData/Local/Temp/claude/c--dev-serendib/5e7c2478-04e7-4872-9af5-5bad524d0b02/scratchpad/shots"
mkdir -p "$SP" && cd "$SP" && npm init -y >/dev/null && npm install playwright && npx playwright install chromium
cat > shots.mjs <<'EOF'
import { chromium } from "playwright";
const sizes = [[375, 800], [768, 1000], [1280, 900]];
const browser = await chromium.launch();
for (const scheme of ["dark", "light"]) {
  for (const [width, height] of sizes) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: scheme });
    await page.goto("http://localhost:3000/contact-us", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(scheme, width, "horizontal overflow:", overflow);
    await page.screenshot({ path: `contact-${scheme}-${width}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();
EOF
node shots.mjs
```

Expected: `horizontal overflow: false` for all six. Also open the reference design file in a browser at the same widths for comparison.

- [ ] **Step 2: Compare against the reference design and fix differences**

Read each screenshot and compare with the reference at the same width: hero spacing, panel corners, channel rows, emergency card, location panel, map height. Check contrast of every text and control in light mode (amber text on the light page, placeholder text, map controls). Fix any visible difference with token classes, commit each fix as `style:` or `fix:`.

- [ ] **Step 3: Check keyboard and tap targets**

Tab through the page: every control shows a visible focus ring in both themes, the map can be focused and zoomed with the keyboard, links and buttons are at least 44px tall at 375px. Fix and commit any failures.

- [ ] **Step 4: Update the project docs**

In `CLAUDE.md`, in the Architecture section under `src/lib/`, change the line to `lib/                     Helpers (cn, metadata, contact validation, mailer, rate limiter)`. Add a short section after "Theme tokens":

```
## Contact form

The Contact page posts to a Server Action (`src/app/(site)/contact-us/actions.ts`) that validates,
throttles and emails through Nodemailer over SMTP. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `CONTACT_TO` and `CONTACT_FROM` in `.env.local` (see `.env.example`). The map uses
Leaflet with OpenStreetMap tiles, the only external host allowed in the CSP (`img-src`).
```

```bash
npm run check:dashes
git add CLAUDE.md
git commit -m "docs: document the contact form and map setup

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Final gate**

```bash
npm run check && npm run build
git status --short
```

Expected: every check passes, and `git status` prints nothing.

- [ ] **Step 6: Merge and clean up**

```bash
cd /c/dev/serendib
git merge --no-ff feat/contact-page -m "feat: merge Contact Us page

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git worktree remove .worktrees/contact-page
git branch -d feat/contact-page
git status --short
```

Expected: merge succeeds, the worktree and branch are gone, `git status` is clean.

- [ ] **Step 7: Report**

Tell the user: the page is merged, which checks passed, that SMTP was tested against a local catcher only, and that real delivery needs the six SMTP variables in the deployment environment. Mention the header CONTACT link still points to `/#switch` and the sitemap already lists `/contact-us`.
