# spec.md

Product spec for **mulberry-dev** — personal site of Santiago Morera, Senior Full Stack Engineer in Mexico City.

This file is the source of truth for *what the product is*. Implementation rules live in `AGENTS.md`.

## Purpose

A bilingual portfolio that sells Santiago as a hire: design-to-code background, full-stack delivery (React / TypeScript / Next.js / Node.js), and modernization of existing systems. Visitors should leave knowing who he is, how he works, what he has shipped, and how to reach him.

Primary actions: explore work, then contact (email first).

## Audience

- Hiring managers and founders looking for a senior full-stack engineer
- Teams that need product UI, APIs, integrations, or legacy modernization
- Bilingual (EN / ES) stakeholders in Mexico and abroad

Tone: confident, concrete, terminal/workspace flavored — not a generic agency template and not a résumé dump.

## Brand

| Token | Value |
| --- | --- |
| Site name | mulberry-dev |
| Person | Santiago Morera |
| Role | Senior Full Stack Engineer |
| Location | Mexico City, MX |
| Domain | https://mulberry-dev.com |
| Theme | Dark first (`#0f172a` canvas). Light tokens exist; the live site ships dark. |
| Accents | Cyan `#20e0d2`, blue `#3d7bff`, purple `#ab55f7`, orange `#ff9900` |
| Type | Sora (display), Space Grotesk (body), JetBrains Mono (terminal/chrome) |
| Visual language | Glass surfaces, nebula atmosphere, particles, workspace prompts (`santiago@dev`), command-line chrome |

Do not flatten this into a generic light SaaS landing page.

## Information architecture

English has no prefix. Spanish is under `/es`. Same section set in both locales.

| Path | Nav label | Workspace | Job |
| --- | --- | --- | --- |
| `/` | Home | `~` | First impression: name, role, one-line value, CTA into the site |
| `/about` | About | `~/about-me` | Origin (design → code), whoami, passions, path |
| `/skills` | What I Do | `~/what-i-do` | How he ships: frontend, backend, data/integrations, modernization, STAR, stack |
| `/portfolio` | Work | `~/work` | Featured cases + archive, filterable |
| `/certifications` | Certifications | `~/certifications` | Proof of training, filterable, lightbox |
| `/contact` | Contact | `~/contact` | Availability + channels |
| `/portfolio/[id]` | — | — | Case study: about, highlights, stack, live/GitHub/private, prev/next |

Section URLs feel like pages but behave as one scrolling experience. Project detail is a real standalone page.

## Section contracts

### Home

- Greeting, full name, “Senior Full Stack Engineer”
- Value line: digital solutions that deliver value
- CTA into About (`> ./start-exploring`)
- First-visit chrome reveal is allowed; returning visits should not replay a long intro
- Particles / atmosphere stay secondary to the name and CTA

### About

- Terminal framing (`cat about-me.txt`, `whoami`, `git log --oneline`)
- Headline idea: I build what you see and what makes it work
- Identity: name, role, Mexico City, bilingual
- Passions: solving problems, intentional interfaces
- Path: how products feel, work that lasts
- Footer points to What I Do

### What I Do

Ordered narrative, not a logo wall:

1. Intro — “How I ship products.”
2. Frontend — UI, interaction, UX/a11y, performance
3. Backend — APIs, services, databases, architecture, business logic
4. Data & integrations — identity, payments, data, APIs
5. Modernization — evolve legacy (PHP / old UI / monolith) into React/TS + Node/GraphQL without throwing the business away
6. STAR — Situation, Task, Action, Result
7. Stack groups — frontend, backend, data, DevOps, tools, AI

### Work

- Featured IDs are explicit (`FuenteDeVidaResidencial`, `MulberryMarketing`, `SalonTarget`)
- Archive is everything else
- Filters: all, web, landing, api, ecommerce
- Card shows name, year, type, stack, status (live / ongoing / private)
- Projects started in 2023 or earlier may show a “built without AI” flag
- Case study: localized teaser/description/highlights, visit site, GitHub or private notice, prev/next in the list

### Certifications

- Categories in the UI: all, security, english, development (plus any extra data categories such as mobile)
- View certificate in a lightbox; images live under `public/images/Certificates/`

### Contact

- Status: available for new opportunities; typically replies within 24 hours
- Channels: email (primary), LinkedIn, GitHub
- Call / Calendly only if `CALENDLY_URL` is set
- No inbound contact form unless the product spec changes

## Locales

- `en` (default, `en_US` OG) and `es` (`es_MX` OG)
- Language switch keeps the current section / project
- Every user-visible string has both locales
- `html lang` follows the URL (`/es` → `es`)

## SEO and social

- Title pattern: home is an absolute title; other sections are `{Section} | mulberry-dev`
- Canonical + hreflang (`en`, `es`, `x-default`) on every public URL
- Open Graph / Twitter share `public/images/og.png` (1200×630) unless a project has its own image
- `robots.txt` allows all; sitemap lists every section and project in both locales
- JSON-LD: person, website, project, breadcrumbs where relevant
- PWA manifest is standalone, dark theme, English start URL

## Accessibility and motion

- Skip link to `#site-main`
- Section changes update document title and move focus
- `prefers-reduced-motion` must tame particles and long intros
- Keyboard: nav, language switch, filters, lightbox, project prev/next
- Do not ship a layout that traps scroll or focus on section routes

## Non-goals

- Blog, CMS, auth, or a dashboard
- Contact form / backend mailer
- Extra locales beyond EN/ES
- Replacing the shared section experience with independent full-page layouts
- Turning the site into a generic component library demo

## Quality bar

A change is done when a visitor can complete the loop in **both** locales: land on home → understand the offer → open a featured project → reach email — without broken titles, missing copy, or a dead nav state.
