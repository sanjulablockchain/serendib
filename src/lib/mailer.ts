import { existsSync } from "node:fs";
import { join } from "node:path";
import nodemailer, { type SendMailOptions } from "nodemailer";
import { buildContactHtml, LOGO_CID } from "@/lib/email-template";
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

const LOGO_PATH = join(process.cwd(), "public", "images", "logo.png");

export function buildMessage(
  input: ContactInput,
  config: Pick<MailConfig, "to" | "from">,
  logoPath: string = LOGO_PATH,
): SendMailOptions {
  const name = oneLine(input.name);
  const hasLogo = existsSync(logoPath);
  return {
    from: { name: "Serendib Healthways website", address: config.from },
    to: config.to,
    replyTo: { name, address: input.email },
    subject: `Website contact: ${name}`,
    text: `Name: ${name}\nEmail: ${input.email}\n\n${input.message}`,
    html: buildContactHtml(input, { logo: hasLogo }),
    attachments: hasLogo
      ? [{ filename: "serendib-healthways.png", path: logoPath, cid: LOGO_CID }]
      : [],
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
