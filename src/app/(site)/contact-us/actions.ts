"use server";

import { headers } from "next/headers";
import { processContact } from "@/lib/contact-submit";
import { sendContactEmail } from "@/lib/mailer";
import { createRateLimiter } from "@/lib/rate-limit";
import type { ContactFormState } from "@/types";

const TEN_MINUTES = 10 * 60 * 1000;
// Per visitor cap, plus an overall cap so a spoofed x-forwarded-for cannot bypass throttling.
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
