"use server";

import { headers } from "next/headers";
import { processContact } from "@/lib/contact-submit";
import { sendContactEmail } from "@/lib/mailer";
import { createSubmitThrottle } from "@/lib/submit-throttle";
import type { ContactFormState } from "@/types";

const throttle = createSubmitThrottle({ perClient: 5, overall: 30, windowMs: 10 * 60 * 1000 });

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
    allow: () => throttle.allow(clientKey),
    send: (input) => sendContactEmail(input),
    onSendError: logSendFailure,
  });
}
