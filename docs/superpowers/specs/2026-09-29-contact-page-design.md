# Contact Us page design

Date: 2026-09-29
Reference design: `Serendib Healthways Contact Us.html` (source of truth for layout, spacing, colors, type)

## Intent

Replace the placeholder at `src/app/(site)/contact-us/page.tsx` with the full Contact Us page. Visitors
(parents, guardians, prospective members) can send a message, reach the team through several
channels, and find the office on an interactive map. Success means the page matches the reference
design at 375, 768 and 1280px in light and dark mode, the form delivers email over SMTP, and no
project rule is broken.

## Decisions from the user

- Map: OpenStreetMap tiles with Leaflet.
- Form: Nodemailer over SMTP, sent from a Server Action.
- CSP: `https://tile.openstreetmap.org` is added to `img-src` only. Nothing else in the CSP or
  headers changes. Approved explicitly, so the CLAUDE.md rule 11 requirement to ask is satisfied.
- Nodemailer version: npm latest is 10.x (there is no 9.x latest tag). Use `nodemailer@latest`
  unless the user asks for 9.
- Defaults accepted: in memory rate limiting, no CAPTCHA (a CAPTCHA would need a third party script).

## Page structure (from the design)

1. Hero: breadcrumb (Home, Contact Us), eyebrow, h1 "Drop us a message for any query.", intro text.
2. Message and channels, two columns that collapse to one below 880px:
   - Left: form panel with corner frames (name, email, message, send). After a successful send the
     panel shows the "Message received" state with the visitor's name and email.
   - Right: emergency line card, then "Reach our team" rows for call, text (EN and ES),
     Messenger (EN and ES), email and fax. Fax is not a link.
3. Location panel: eyebrow, h2 "Serendib Healthways, Pasadena.", address, Get Directions button,
   and the map beside it (stacked under 380px columns).

## Files

| File                                             | Purpose                                                                 |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `src/content/contact.ts`                         | All copy, channel list, typed `locations` array                         |
| `src/types/index.ts`                             | `ContactChannel`, `OfficeLocation` types                                |
| `src/components/sections/ContactHero.tsx`        | Hero section                                                            |
| `src/components/sections/ContactMessage.tsx`     | Form panel plus channels column                                         |
| `src/components/sections/ContactLocation.tsx`    | Location panel                                                          |
| `src/components/ui/ChannelRow.tsx`               | Reusable channel row (link or static)                                   |
| `src/components/ui/ContactForm.tsx`              | Client component, `useActionState`, sent state                          |
| `src/components/ui/LocationMap.tsx`              | Client component, Leaflet loaded dynamically inside an effect           |
| `src/app/(site)/contact-us/actions.ts`           | Server Action: validate, rate limit, send                               |
| `src/lib/mailer.ts`                              | Nodemailer SMTP transport and message builder                           |
| `public/icons/`                                  | Leaflet marker images copied locally (no CDN)                           |
| `.env.example`                                   | Documents `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `CONTACT_FROM` |

The page composes sections only. Reuse `Container`, `CornerFrame`, `Button`, `SectionHeading`,
`PageIntro` patterns where they fit.

## Form and server behavior

- Fields: name (max 100), email (max 254, format checked), message (max 2000). All required.
- The Server Action trims and validates every field on the server. Client validation is only a hint.
- Spam protection: hidden honeypot field, minimum time to submit, and a per IP in memory rate limit.
  Silent success for honeypot hits so bots learn nothing.
- Mail: `from` is a fixed address owned by us, `replyTo` is the visitor. Header values have CR and LF
  stripped. Body is plain text. Subject is a fixed prefix plus the sanitized name.
- Secrets live in `.env.local`. None use the `NEXT_PUBLIC_` prefix. Nothing about the message or
  visitor is logged.
- Failures return a generic message asking the visitor to call or text. SMTP errors are never
  sent to the client.
- The rate limiter is per process memory, so it resets on deploy and is per instance. Accepted.

## Map

- `LocationMap` is a client component. Leaflet and its CSS come from npm, imported dynamically in an
  effect so nothing runs on the server. The container has a fixed minimum height (352px) to avoid
  layout shift, with a token colored placeholder while loading.
- Marker images are local files in `public/icons`. Tiles come from `tile.openstreetmap.org` with the
  required attribution shown.
- Dark mode darkens tiles with a token driven class (replaces the design's `mapFilter`).
- The map is keyboard usable, has an accessible label, and does not trap scroll on mobile
  (scroll wheel zoom is off until the map is focused).
- Get Directions links to OpenStreetMap directions with `target="_blank" rel="noopener noreferrer"`.

## Theme

- Map the design's `--t*` colors onto existing tokens. Add only what is missing, each with dark and
  light values: an amber emergency token set and a map dim token.
- No raw hex, no arbitrary color classes, no inline color styles. Text on gold uses `text-void` or
  `text-on-gold`.
- Copy has no dash punctuation. The design's dot separators in labels ("TEXT US · EN / ES") are
  rewritten with "and" or a comma. Check with `npm run check:dashes`.

## Responsive

Mobile first. Two column blocks stack below 880px, tap targets are at least 44px, no horizontal
scroll from 375px up. Verified at 375, 768 and 1280px.

## Security

- Only CSP change: `img-src 'self' blob: data: https://tile.openstreetmap.org`.
- No third party scripts, iframes or trackers. The Google Maps iframe from the design is dropped.
- `nodemailer` and `leaflet` are the only new dependencies. `npm run check:audit` must stay clean.

## Testing and verification

- Unit level: validation and sanitization helpers, plus the honeypot and rate limit paths.
- Integration: submit the form against a local SMTP catcher (a throwaway `smtp-server` script in the
  scratchpad) and confirm the message, reply to and header sanitizing. No real mail is sent.
- Visual: both themes at 375, 768 and 1280px against the reference design.
- Gates: `npm run check` and `npm run build` pass.

## Delivery

Build in a worktree `.worktrees/contact-page` on `feat/contact-page`, small Conventional Commits,
merge with `--no-ff`, remove the worktree and branch, leave the tree clean.

## Out of scope

More than one office (the `locations` array supports it, the UI ships with Pasadena), CAPTCHA,
persistent rate limiting, storing submissions, analytics.
