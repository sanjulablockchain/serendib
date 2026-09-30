# Blog design

## Goal
Replace the placeholder Blog page with a real index at `/blog` and give each of the three home page
articles its own page on our site at `/blog/<slug>`, instead of linking out to the old WordPress site.
Matches the News section card style in the reference design.

## Routes
- `/blog`: header (eyebrow "NEWS & ARTICLES", title "From Serendib Healthways") and a card grid.
- `/blog/[slug]`: statically generated via `generateStaticParams`, async `params`, `notFound()` for unknown slugs.
  Each page uses `pageMetadata()`.
- Slugs: `autism-awareness-month`, `monkeypox-alert`, `commercial-group-20-off`.
- Sitemap includes `/blog` and every article.

## Content
`src/content/blog.ts` exports `articles: BlogArticle[]` with slug, title, excerpt, tag, image, alt and a
body of typed blocks (heading, paragraph, list, contact callout). `newsPosts` in `home.ts` is derived
from `articles`, so the home cards link to `/blog/<slug>`. Copy is sourced from the three current pages
with dash punctuation rewritten. Shared contact details come from `site.contact`.

## Components
- `ui/ArticleCard.tsx`: card extracted from `News.tsx`, shared by home and `/blog`.
- `sections/BlogHero.tsx`, `sections/BlogGrid.tsx`: index page.
- `sections/ArticleHero.tsx` (tag, H1, rule, priority blur image), `sections/ArticleBody.tsx`
  (820px reading column, block renderer), `sections/ArticleFooter.tsx` (back link and Make the switch CTA).

## Constraints
Theme tokens only, light and dark mode, `next/image` with `sizes`, mobile first (375, 768, 1280),
44px tap targets, no dash punctuation, Server Components only, no new dependencies or external hosts.

## Testing and delivery
Unit test: unique slugs, every article has body and image alt, no dash punctuation in copy.
`npm run check` and `npm run build` pass. Built in a `feat/blog` worktree, small conventional commits,
merged `--no-ff`, worktree removed.
