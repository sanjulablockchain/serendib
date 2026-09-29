@AGENTS.md

# Serendib Healthways website

Marketing site for Serendib Healthways (https://www.serendibhealthways.com), a pediatric HMO / IPA
serving Los Angeles County. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

The reference design lives in `design/`. It is the source of truth: the site must match it exactly
(layout, spacing, colors, typography, imagery, interactions).

## Commands

| Task             | Command                |
| ---------------- | ---------------------- |
| Dev server       | `npm run dev`          |
| Production build | `npm run build`        |
| Lint             | `npm run lint`         |
| Type check       | `npm run typecheck`    |
| Unit tests       | `npm test`             |
| Format           | `npm run format`       |
| Dash rule check  | `npm run check:dashes` |
| Image rule check | `npm run check:images` |
| Security audit   | `npm run check:audit`  |
| All checks       | `npm run check`        |

## Rules (non negotiable)

1. **Responsive.** Every page and component must work on mobile, tablet and desktop. Build mobile
   first, then add `sm:` / `md:` / `lg:` / `xl:` overrides. Check at 375px, 768px and 1280px.
   No horizontal scroll at any width. Tap targets at least 44px.
2. **No dash punctuation in visible text.** Never use em dashes, en dashes, or a hyphen as
   punctuation (" - ") in any copy, headings, labels, alt text, metadata or button text. Rewrite the
   sentence with a comma, colon, period or "and" instead. Hyphens are fine in code, class names,
   URLs and filenames. `npm run check:dashes` enforces this. Also avoid them in commit messages
   and docs we write.
3. **Always follow the theme.** Use only the tokens in `src/app/globals.css` (`@theme`):
   `bg-primary`, `text-ink`, `rounded-card`, `shadow-card`, `max-w-site`, etc. No raw hex values,
   no arbitrary color classes like `bg-[#123456]`, no inline styles for colors. Need a new value?
   Add a token to `@theme` first, then use it.
4. **Commit everything.** Small, focused commits using Conventional Commits
   (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`). Never leave work uncommitted at
   the end of a task. Working tree must be clean when done.
5. **New feature = new git worktree.** Never build features directly on `main`:
   ```bash
   git worktree add .worktrees/<feature> -b feat/<feature>
   cd .worktrees/<feature> && npm install
   # work, commit
   cd ../.. && git merge --no-ff feat/<feature>
   git worktree remove .worktrees/<feature> && git branch -d feat/<feature>
   ```
   `.worktrees/` is gitignored. Small chores (docs, config) may go straight to `main`.
6. **Follow the folder architecture below.** Put new files where they belong; do not invent new
   top level folders without updating this file.
7. **Tailwind CSS only.** No CSS modules, styled components or other CSS files. `globals.css`
   holds only the theme tokens and base layer. Merge classes with `cn()` from `@/lib/cn`.
8. **Light mode and dark mode.** Everything must look right in both. The site follows the OS
   setting by default and visitors can switch with the `ThemeToggle` in the header (next-themes,
   `data-theme` on `<html>`). Every color token has a dark value in `@theme` and a light value in
   `:root[data-theme="light"]` in `globals.css`, so use tokens and colors switch on their own. When adding
   a token, define both values. Use `dark:` classes only for things tokens cannot cover (for example
   swapping an image or logo). Text on gold fills uses `text-void` or `text-on-gold`. Check every change in both modes, with readable contrast (WCAG AA).
9. **Images optimized for fast loading.** Every image must be light and load fast on slow networks:
   - Always render with `next/image` (never a raw `<img>`). It serves AVIF / WebP at the right size.
   - Always set `sizes` for responsive images and `width` / `height` (or `fill` with a sized parent)
     so there is no layout shift.
   - Only the first visible (above the fold) image gets `priority`; everything else lazy loads.
   - Use `placeholder="blur"` for large photos (static imports get this for free).
   - Before committing, resize to at most 2x the largest display size and compress. Photos as
     `.webp` or `.jpg`, graphics and logos as optimized `.svg`. Limits: raster 300 KB, SVG 50 KB.
   - Files in `public/images` and `public/icons` are cached for a year, so when replacing an image
     give it a new filename.
   - `npm run check:images` enforces size limits.
10. **No external image links.** Every image (photos, logos, icons, backgrounds, Open Graph
    images) is downloaded into `public/images` or `public/icons` and served from our own domain.
    Never use a CDN, hotlink or third party URL for an image. `next.config.ts` has no
    `remotePatterns` and the CSP only allows `img-src 'self'`, so external images will break.
    `npm run check:images` enforces this.
11. **Tight security, always.** Think about security in every change:
    - Keep the security headers and CSP in `next.config.ts`. Never loosen them (new external
      domains, `unsafe-eval` in production, removing headers) without asking the user first.
    - No third party scripts, trackers, embeds or iframes without explicit user approval. Load
      fonts only through `next/font` (self hosted).
    - Never commit secrets. Keep them in `.env.local` (gitignored). Only `NEXT_PUBLIC_*` values
      reach the browser, so never put secrets in them.
    - Never use `dangerouslySetInnerHTML`, `eval` or unsanitized user input in the DOM.
    - Forms: validate and sanitize on the server (Server Actions or Route Handlers), limit input
      length, add spam protection, and never trust client side validation alone.
    - External links use `target="_blank" rel="noopener noreferrer"`.
    - Treat any patient or health information as sensitive: never log it, never put it in URLs.
    - Add dependencies only when needed, prefer well maintained packages, and keep
      `npm run check:audit` clean.

## Architecture

```
design/                    Reference HTML design (source of truth, do not edit)
public/
  images/                  Photos and illustrations (use next/image)
  icons/                   SVG icons and logos
scripts/                   Repo tooling (check-dashes.mjs, check-images.mjs)
src/
  app/                     Routes only: layout, pages, metadata files
    (site)/<page>/page.tsx Inner pages (route group, no URL segment)
    page.tsx               Home page
    globals.css            Tailwind import, @theme tokens, base layer
    sitemap.ts robots.ts not-found.tsx
  components/
    layout/                Header, MobileNav, Footer, ThemeProvider (site chrome)
    sections/              Page sections (Hero, Services, PageIntro...). One section per file.
    ui/                    Reusable primitives (Button, Container, SectionHeading, ThemeToggle...)
  content/                 All site copy and data as typed constants (site, services, plans, partners)
  lib/                     Helpers (cn, metadata, contact validation, mailer, rate limiter)
  types/                   Shared TypeScript types
```

Conventions:

- Pages compose sections; sections compose `ui` primitives. Pages hold no raw markup beyond composition.
- Copy lives in `src/content`, not hardcoded in JSX. Components receive data via props or imports.
- Server Components by default. Add `"use client"` only for interactivity (menus, sliders, forms)
  and keep those components small.
- Components: PascalCase filenames, named exports. Route folders: kebab case to keep current URLs.
- Use `next/image` for images and `next/link` for internal links. Every image needs meaningful alt text.
- Each page exports metadata via `pageMetadata()` from `@/lib/metadata`.
- Import with the `@/` alias.
- Read `node_modules/next/dist/docs/` before using Next.js APIs; this version differs from older ones
  (async `params`, `proxy.ts` instead of middleware, Turbopack by default).

## Theme tokens

Defined in `src/app/globals.css`, extracted from the reference design (dark values in `@theme`, light
values under `:root[data-theme="light"]`).

- Colors: surfaces (`page`, `canvas`, `bar`, `row-from`...), text (`fg`, `heading`, `soft`, `subtle`,
  `fine`), gold accents (`gold`, `gold-bright`, `gold-pale`), lines (`line-soft`, `line`, `line-mid`,
  `line-strong`), halos and shades for glows, plus static colors (`void`, `cream`, `on-gold`)
- Fonts: `font-sans` (Crimson Pro, body), `font-display` (Cinzel, headings), loaded with `next/font`
- Shadows: `shadow-ring`, `shadow-cta`, `shadow-medal`, `shadow-panel`... (multi ring frames and glows)
- Gradients: `bg-(image:--gradient-page)` style tokens for gradients with more than three stops
- Breakpoints: `xs` 520px, `nav` 820px (desktop nav), `wide` 1180px, plus Tailwind defaults
- Width: `max-w-site` (via `Container`)

## Contact form

The Contact page posts to a Server Action (`src/app/(site)/contact-us/actions.ts`) that validates,
throttles and emails through Nodemailer over SMTP. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `CONTACT_TO` and `CONTACT_FROM` in `.env.local` (see `.env.example`). The map uses
Leaflet with OpenStreetMap tiles, the only external host allowed in the CSP (`img-src`).

## Definition of done

- `npm run check` and `npm run build` pass (lint, types, dashes, images, audit)
- Visually matches `design/` at 375px, 768px and 1280px
- Looks right in both light and dark mode
- Only theme tokens used
- Images are local, optimized and rendered with `next/image`
- No new security risks; headers and CSP unchanged or approved by the user
- Everything committed; feature worktree merged and removed
