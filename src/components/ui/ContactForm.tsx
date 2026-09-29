"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/(site)/contact-us/actions";
import { contactForm } from "@/content/contact";
import { HONEYPOT_FIELD } from "@/lib/contact-submit";
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
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Stamp when the visitor started filling in the form, so the server can spot instant bot posts.
  const submit = (formData: FormData) => {
    if (pending) return;
    formData.set("startedAt", String(mountedAt.current));
    formAction(formData);
  };

  // Move focus to the confirmation so keyboard and screen reader users land on the result.
  const confirmation = useRef<HTMLSpanElement>(null);
  const sent = state.status === "sent";
  useEffect(() => {
    if (sent) confirmation.current?.focus();
  }, [sent]);

  if (state.status === "sent") {
    return (
      <div className="flex flex-col items-center gap-[18px] py-10 text-center" role="status">
        <span
          aria-hidden="true"
          className="flex size-[72px] items-center justify-center rounded-full border-2 border-gold-pale bg-radial-[circle_at_40%_35%] from-gold-hi to-gold-mid text-[30px] text-on-gold shadow-check"
        >
          ✓
        </span>
        <span
          ref={confirmation}
          tabIndex={-1}
          className="font-display text-[13px] tracking-[0.22em] text-gold-bright outline-none"
        >
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
    <form action={submit} noValidate className="flex flex-col gap-5">
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
          <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="one-time-code" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="m-0 text-[17px] text-amber">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        aria-disabled={pending}
        className="min-h-11 cursor-pointer self-start border border-gold-pale bg-linear-to-b from-gold-soft to-gold px-11 py-4 font-display text-[14px] tracking-[0.2em] text-void shadow-cta transition-shadow hover:shadow-cta-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright aria-disabled:cursor-wait aria-disabled:opacity-70"
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
