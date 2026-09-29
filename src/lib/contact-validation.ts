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
