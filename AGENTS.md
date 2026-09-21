# AGENTS.md

Personal site for Santiago Morera (`mulberry-dev.com`). Next.js 14 App Router, React 18, TypeScript (strict), Sass. Node `24.x`. Path alias: `@/*` → `src/*`.

## Commands

```bash
npm run dev     # local server
npm run build   # production build
npm run lint    # next lint (core-web-vitals)
```

## Architecture (do not fight this)

Section routes (`/`, `/skills`, `/portfolio`, `/process`, `/about`, `/certifications`, `/contact`) are **URL + metadata only**. Their `page.tsx` files return `null`. The real UI is a single-page experience:

- `SiteShell` hides `children` on section routes and mounts `SiteExperience`.
- `SiteExperience` renders `HomeSection` plus lazy sections and scrolls to the active one via `src/lib/sectionNav.ts`.
- Project detail (`/portfolio/[id]`) is a real page that renders `ProjectDetails`.

English is the default locale (no prefix). Spanish lives under `/es` (see `src/lib/locale.ts`). Every section and project page exists twice: `src/app/...` and `src/app/es/...`. Middleware only sets `x-locale`. The selected locale is stored in `localStorage` (`mulberry-locale`) and restored on every visit by `LOCALE_BOOTSTRAP_SCRIPT` in `src/app/layout.tsx`. `LanguageSwitch` writes the preference when the user toggles language.

When adding a section or route, update **both** locale trees, `src/data/navegation.ts` (`sections` for scroll/SEO, `links` for primary nav), `src/i18n/types.ts`, `src/i18n/en.ts`, `src/i18n/es.ts`, `src/lib/sectionNav.ts`, `SiteExperience`, and `src/app/sitemap.ts`. `/certifications` stays a section URL but is not in primary nav.

When asked to correct, change, or fix copy, labels, or UI text, apply the same change in **both** locales (`src/i18n/en.ts` and `src/i18n/es.ts`). Never leave one language stale.

## Where content lives

| Kind | Put it here |
| --- | --- |
| User-facing copy (both locales) | `src/i18n/en.ts` and `src/i18n/es.ts` — keep `Messages` in `src/i18n/types.ts` in sync |
| Site constants, URLs, SEO identity | `src/data/site.ts` |
| Nav links | `src/data/navegation.ts` (paths only; labels come from i18n) |
| Projects, skills, certs, about facts | `src/data/*.ts` |
| Project body copy (teaser/description/highlights) | `messages.projects[id]` in both dictionaries |

Do not hardcode UI strings in components. Use `useI18n()` (`t`, `href`, `locale`) on the client, or `getMessages(locale)` on the server. Build links with `href("/path")` / `localizePath`, never `/es/...` by hand. Copy/UI fixes must land in both dictionaries in the same change.

Metadata: `sectionPageMetadata(path, locale)` and `projectPageMetadata(id, locale)` in `src/lib/sectionMeta.ts`.

## UI and styles

- Functional client components. Reuse `src/components/ui/*` and terminal/build chrome before inventing new primitives.
- Styling is Sass only (no Tailwind, no CSS-in-JS). Tokens live in `src/styles/scss/tokens/`.
- `styles.scss` is first-paint chrome only. Section CSS goes in `src/styles/scss/sections/` or `components/_*.scss` and is imported from the section that needs it.
- Prefer existing class names and tokens (`_colors`, `_spacing`, `_breakpoints`, `_typography`).
- Images: WebP/AVIF under `public/images/`. Next `Image` + the remote hosts already allowlisted in `next.config.js`.

## SEO and i18n checklist

- `dynamic = "force-static"` on section pages.
- Canonical + `alternates.languages` (`en`, `es`, `x-default`) via the metadata helpers.
- New public URLs must appear in `sitemap.ts` for **both** locales.
- JSON-LD helpers are in `src/lib/jsonLd.ts`.

## Guardrails

- Do not turn section `page.tsx` files into full page layouts. That breaks the shared `SiteExperience` and scroll/focus behavior.
- Do not add a locale except by extending `LOCALES` and duplicating the `/es` route pattern.
- Do not commit secrets or change `GOOGLE_SITE_VERIFICATION` / analytics IDs unless asked.
- After UI, layout, routing, or copy changes, verify in the browser: both locales, the section you touched, and at least one neighboring section plus a project detail page.
