import { site } from "@/content/site";
import type { ContactInput } from "@/types";

/**
 * Email clients ignore CSS variables and web fonts, so these literals mirror the dark theme
 * tokens in globals.css (page, card, gold, heading, soft, subtle). Keep them in sync.
 */
const color = {
  page: "#07181e",
  card: "#0c222a",
  well: "#081a20",
  line: "#6f5f3d",
  gold: "#c9a45c",
  goldBright: "#e8c877",
  heading: "#f3ecd9",
  soft: "#c3cfcd",
  subtle: "#9fb3b5",
  onGold: "#040d11",
} as const;

const serif = "Georgia, 'Times New Roman', serif";

export const LOGO_CID = "serendib-logo";

const LOGO_WIDTH = 132;
const LOGO_HEIGHT = 94;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function buildContactHtml(input: ContactInput, options: { logo: boolean }): string {
  const name = escapeHtml(oneLine(input.name));
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replace(/\r?\n/g, "<br />");
  const replyHref = escapeHtml(
    `mailto:${input.email}?subject=${encodeURIComponent("Re: your message to Serendib Healthways")}`,
  );
  const { street, city, region, postalCode } = site.contact.address;

  const logo = options.logo
    ? `<img src="cid:${LOGO_CID}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="${escapeHtml(site.name)}" style="display:block;margin:0 auto;border:0;height:auto;" />`
    : `<div style="font-family:${serif};font-size:22px;letter-spacing:4px;color:${color.goldBright};text-transform:uppercase;">${escapeHtml(site.name)}</div>`;

  const label = (text: string) =>
    `<div style="font-family:${serif};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${color.gold};padding-bottom:6px;">${text}</div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>New website message</title>
</head>
<body style="margin:0;padding:0;background-color:${color.page};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${color.page};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${color.card};border:1px solid ${color.line};border-radius:8px;">
    <tr><td align="center" style="padding:32px 24px 8px 24px;">${logo}</td></tr>
    <tr><td align="center" style="padding:16px 24px 0 24px;">
      <div style="font-family:${serif};font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${color.gold};">New website message</div>
      <div style="width:64px;height:1px;background-color:${color.gold};margin:14px auto 0 auto;line-height:1px;font-size:1px;">&nbsp;</div>
    </td></tr>
    <tr><td style="padding:28px 32px 0 32px;">
      ${label("From")}
      <div style="font-family:${serif};font-size:24px;line-height:30px;color:${color.heading};">${name}</div>
    </td></tr>
    <tr><td style="padding:20px 32px 0 32px;">
      ${label("Reply to")}
      <a href="${replyHref}" style="font-family:${serif};font-size:17px;color:${color.goldBright};text-decoration:none;">${email}</a>
    </td></tr>
    <tr><td style="padding:24px 32px 0 32px;">
      ${label("Message")}
      <div style="background-color:${color.well};border:1px solid ${color.line};border-left:3px solid ${color.gold};border-radius:4px;padding:18px 20px;font-family:${serif};font-size:17px;line-height:27px;color:${color.soft};">${message}</div>
    </td></tr>
    <tr><td align="center" style="padding:32px 32px 8px 32px;">
      <a href="${replyHref}" style="display:inline-block;background-color:${color.gold};color:${color.onGold};font-family:${serif};font-size:13px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:4px;">Reply to ${name}</a>
    </td></tr>
    <tr><td align="center" style="padding:28px 32px 32px 32px;">
      <div style="height:1px;background-color:${color.line};line-height:1px;font-size:1px;margin-bottom:20px;">&nbsp;</div>
      <div style="font-family:${serif};font-size:13px;line-height:21px;color:${color.subtle};">Sent from the contact form at <a href="${site.url}" style="color:${color.gold};text-decoration:none;">${escapeHtml(site.url.replace("https://", ""))}</a><br />${escapeHtml(street)}, ${escapeHtml(city)}, ${escapeHtml(region)} ${escapeHtml(postalCode)}</div>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
