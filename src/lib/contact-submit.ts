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
  const checked = validateContact({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  const fake = (): ContactFormState => ({
    status: "sent",
    name: text(formData, "name").slice(0, 100),
    email: text(formData, "email").slice(0, 254),
  });

  if (text(formData, "website")) return fake();

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
