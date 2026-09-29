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
| Format           | `npm run format`       |
| Dash rule check  | `npm run check:dashes` |

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
   `data-theme` on `<html>`). Every color token has a light value in `:root` and a dark value in
   `[data-theme="dark"]` in `globals.css`, so use tokens and colors switch on their own. When adding
   a token, define both values. Use `dark:` classes only for things tokens cannot cover (for example
   swapping an image or logo). Text on brand fills uses `text-on-primary` / `text-on-secondary`,
   never `text-surface`. Check every change in both modes, with readable contrast (WCAG AA).

## Architecture

```
design/                    Reference HTML design (source of truth, do not edit)
public/
  images/                  Photos and illustrations (use next/image)
  icons/                   SVG icons and logos
scripts/                   Repo tooling (check-dashes.mjs)
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
  lib/                     Helpers (cn, metadata)
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

Defined in `src/app/globals.css`, each color with a light and a dark value. Current values are
provisional until extracted from `design/`.

- Colors: `primary`, `primary-dark`, `primary-light`, `on-primary`, `secondary`, `secondary-dark`,
  `on-secondary`, `accent`, `ink` (headings), `body` (text), `muted`, `line` (borders), `surface`,
  `surface-alt`, `footer`, `footer-heading`, `footer-text`, `footer-line`, `success`, `danger`
- Fonts: `font-sans` (body), `font-display` (headings), loaded with `next/font` in `layout.tsx`
- Radius: `rounded-card`, `rounded-pill`
- Shadow: `shadow-card`, `shadow-nav`
- Width: `max-w-site` (via `Container`)

## Definition of done

- `npm run lint`, `npm run typecheck`, `npm run check:dashes` and `npm run build` all pass
- Visually matches `design/` at 375px, 768px and 1280px
- Looks right in both light and dark mode
- Only theme tokens used
- Everything committed; feature worktree merged and removed
