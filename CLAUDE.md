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
npm run build:all         # builds all three sequentially

# Tests
npm run test:portfolio
npm run test:studio
npm run test:links

# Interactive dev menu
bash dev.sh
```

## Architecture

This is an **Angular 18 monorepo** with three independent projects under `projects/`:

- **portfolio** — Main personal portfolio site (port 4200). Sections: hero, projects, skills, blogs, certificates, about, contact. Routes: `/` (home), `/contact`, `**` → home.
- **studio** — Case studies and services showcase (port 4300). More detailed project writeups, testimonials, process visualization.
- **links** — Linktree-style social links hub (port 4400).

All three share code from `shared/`:
- `shared/models/` — TypeScript interfaces
- `shared/stores/` — Static data (no backend required; data lives in `.store.ts` files)
- `shared/services/` — `ThemeService` (dark mode via localStorage), `SEOService` (dynamic meta tags + JSON-LD)
- `shared/styles/` — SCSS animations and base styles

### Key patterns

**Standalone components** — No NgModules anywhere. All components use `standalone: true`.

**Data layer** — All content (projects, skills, blogs, certificates, links) is static TypeScript data in `*.store.ts` files. To add or change content, edit the relevant store.

**Path alias** — `@shared/*` resolves to `shared/*` (configured in `tsconfig.json`).

**Tailwind + SCSS** — `tailwind.config.base.js` is shared across all three projects. Custom design tokens: primary color `#FF7955` (orange), dark `#0A0A0A`. Dark mode uses the `class` strategy.

**Scroll animations** — `IntersectionObserver` in `home.component.ts` drives scroll-triggered reveal animations (not AOS).

**Chat widget** — `projects/portfolio/src/app/components/chat-widget/` uses `@google/genai` via the `api/chat.js` serverless function. Requires `GEMINI_API_KEY` env var on Vercel.

**Camera drawing** — `projects/portfolio/src/app/components/camera-drawing/` uses `@mediapipe/tasks-vision`.

## Deployment

Deployed on Vercel. `vercel.json` is minimal — Vercel infers the Angular build. The `api/` directory contains serverless functions deployed automatically. Production bundle budget: 1 MB initial (error), 500 kB (warning).
