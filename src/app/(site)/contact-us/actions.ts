"use server";

import { headers } from "next/headers";
import { clientIp } from "@/lib/client-ip";
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
  const clientKey = clientIp(await headers());

  return processContact(formData, {
    now: Date.now,
    allow: () => throttle.allow(clientKey),
    send: (input) => sendContactEmail(input),
    onSendError: logSendFailure,
  });
}
