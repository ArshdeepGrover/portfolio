# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development servers
npm run start:portfolio   # http://localhost:4200
npm run start:studio      # http://localhost:4300
npm run start:links       # http://localhost:4400

# Production builds
npm run build:portfolio
npm run build:studio
npm run build:links
npm run build:all         # builds portfolio, studio, links and blogs

# Tests
npm run test:portfolio
npm run test:studio
npm run test:links

# Interactive dev menu
bash dev.sh
```

## Architecture

This is an **Angular 18 monorepo** with five projects under `projects/`:

- **portfolio** — arshdeepgrover.dev (port 4200). A "dev-os" style single page; see below.
- **studio** — studio.arshdeepgrover.dev (port 4300). Case studies, services, testimonials.
- **links** — links.arshdeepgrover.dev (port 4400). Linktree-style links hub.
- **blogs** — blogs.arshdeepgrover.dev (port 4500). Reads posts from Sanity.
- **blogs-studio** — the Sanity Studio that edits the blog content (`npm run start:sanity`).

All Angular apps share code from `shared/` (`@shared/*` alias): `models/`, `stores/projects.store.ts` (projects, filtered per site with `showInPortfolio` / `showInStudio`), `services/` (`SeoService`, `ThemeService`) and `styles/` (used by studio/links, not by portfolio).

### Portfolio (`projects/portfolio/src/app`)

- `os/` — everything the page renders:
  - `os.service.ts` — section list (`OS_SECTIONS`, ids are the URL fragments), `PROFILE` (email, resume path, links), `CAT_NAME`, and shared UI state signals.
  - `theme.service.ts` — dark-first theme (`html.dark` / `html.light`, `localStorage.theme`).
  - `shell/` — menu bar, dock, ⌘K command palette, terminal (backtick), boot screen.
  - `cat/` — "Null", the pixel cat: sits on the menu bar, chases the cursor, sits where you click. Sprites are 20×16 grids in `cat-sprites.ts`.
  - `sections/` — hero desktop (draggable windows), about.md, experience (git log), projects (Finder + Quick Look), skills (package.json), community (calendar), writing (feed), certificates (Keychain Access), footer.
  - `ui/` — `WindowComponent` (window chrome) and `RevealDirective` (scroll reveal).
- `stores/` + `models/` — static content. **To change content, edit the store**, not the components: `experience_store`, `skills_store`, `community_store` (optional `day` places an event on a date), `certificate_store`, `blogs_store`.
- Styling: design tokens are CSS variables in `src/styles.scss` (fonts: Bricolage Grotesque, Geist, Geist Mono). Components use those variables, not raw colours, so both themes work.

### Key patterns

**Standalone components** — No NgModules anywhere. All components use `standalone: true`.

**Data layer** — All content is static TypeScript data in `*.store.ts` files. No backend.

**Résumé** — `public/resume/Arshdeep_Singh_Resume.pdf` is the current file; `/resume` redirects to it (`projects/portfolio/vercel.json`). The old `Arshdeep_Singh_SoftwareDeveloper_Resume.pdf` is kept so existing links keep working.

**Contact form** — the portfolio no longer has one; Web3Forms is only used by studio.

**Chat API** — `api/chat.js` (Gemini, env var `GEMNI_KEY_CHAT`) is no longer used by the portfolio.

## Deployment

Deployed on Vercel. `vercel.json` is minimal — Vercel infers the Angular build. The `api/` directory contains serverless functions deployed automatically. Production bundle budget: 1 MB initial (error), 500 kB (warning).
