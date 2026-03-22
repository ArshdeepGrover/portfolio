# Arshdeep's Portfolio — Angular Workspace

An Angular 18 monorepo containing two projects:
- **portfolio** — Personal portfolio website (hero, projects, skills, blogs, certificates, contact)
- **studio** — Project showcase with detailed case studies

Built with Angular 18 standalone components, Tailwind CSS 3, SCSS, and `typed.js`. Deployed on [Vercel](https://vercel.com).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 18 (standalone components) |
| Language | TypeScript 5.5 (strict mode) |
| Styling | Tailwind CSS 3 + SCSS |
| Animation | typed.js, custom `IntersectionObserver` scroll animations |
| Testing | Karma + Jasmine |
| Deployment | Vercel |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Angular CLI](https://angular.dev/tools/cli) v18

```bash
npm install -g @angular/cli
```

## Installation

```bash
npm install
```

For a clean reinstall (wipes `node_modules` and `package-lock.json`):

```bash
rm -rf node_modules package-lock.json && npm install
```

## Interactive Dev Script

The workspace ships with `dev.sh`, an interactive terminal menu for all common tasks:

```bash
bash dev.sh
```

Options available:
- Serve a project (portfolio on `:4200`, studio on `:4300`)
- Build a project (production or development)
- Build all projects
- Serve both projects simultaneously
- Install / clean-reinstall dependencies
- Run tests
- Clean build output

## Development Server

Serve a project locally with live reload:

```bash
# Portfolio → http://localhost:4200
npm run start:portfolio

# Studio → http://localhost:4300
npm run start:studio
```

Or serve both projects simultaneously (each in their own port):

```bash
npx ng serve portfolio --port 4200 &
npx ng serve studio --port 4300
```

## Build

### Production

```bash
npm run build:portfolio   # → dist/portfolio/
npm run build:studio      # → dist/studio/
npm run build:all         # builds both sequentially
```

### Development (watch mode)

```bash
npm run watch:portfolio
npm run watch:studio
```

Build artifacts are output to `dist/<project>/`.

## Running Tests

Unit tests via [Karma](https://karma-runner.github.io) + Jasmine:

```bash
npm run test:portfolio
npm run test:studio
```

To run a single spec file:

```bash
npx ng test portfolio --include=projects/portfolio/src/app/components/hero/hero.component.spec.ts
```

## Code Scaffolding

```bash
# Generate a component in portfolio
ng generate component components/<name> --project=portfolio

# Generate a component in studio
ng generate component components/<name> --project=studio
```

All generated components use SCSS by default (configured in `angular.json` schematics).

## Project Structure

```
.
├── projects/
│   ├── portfolio/           # Personal portfolio app
│   │   ├── public/          # Static assets (images, favicons, resume PDF, sitemap)
│   │   │   ├── images/
│   │   │   ├── project-images/
│   │   │   ├── certificates/
│   │   │   └── resume/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── app.routes.ts
│   │       │   └── components/
│   │       ├── styles.scss
│   │       └── index.html
│   └── studio/              # Studio / case-studies app
│       └── src/
├── shared/                  # Shared code across both apps
│   ├── models/              # TypeScript interfaces (IProject, etc.)
│   ├── services/            # Shared services (ThemeService)
│   ├── stores/              # Static data stores (projects.store.ts)
│   └── styles/              # Shared SCSS (animations, base)
├── tailwind.config.base.js  # Shared Tailwind config
├── tsconfig.json            # Root TypeScript config
├── angular.json             # Angular workspace config
├── package.json
└── dev.sh                   # Interactive dev menu script
```

## Routing (Portfolio)

| Path | Component | Description |
|---|---|---|
| `/` | `HomeComponent` | Single-page layout with all sections |
| `/contact` | `ContactComponent` | Standalone contact form (Formspree) |
| `**` | — | Redirects to `/` |

Sections on the home page are navigated via anchor scroll (`#skills`, `#projects`, etc.).

## Styling

- **Tailwind CSS 3** with a shared base config (`tailwind.config.base.js`)
- Custom brand colors:
  - `primary` / `primary-light` / `primary-dark` → `#FF7955` orange palette
  - `dark` → `#0A0A0A`, `dark-secondary` → `#111111`
- **Dark mode** via Tailwind's `class` strategy — toggled in `HeaderComponent`, persisted in `localStorage`
- Global CSS variables for primary colors in `projects/portfolio/src/styles.scss`
- Scroll-triggered fade-in animations via `IntersectionObserver` (elements use `data-aos` attributes)

## Shared Data Layer

Content is not fetched from an API. All data lives in static TypeScript files:

- **Models** (`shared/models/`) — interfaces like `IProject`
- **Stores** (`shared/stores/`) — exported `const` arrays (e.g. `projects: IProject[]`)
- **Services** (`shared/services/`) — e.g. `ThemeService` for dark/light mode

To add or edit content, modify the relevant store file directly.

## Path Aliases

Defined in `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@shared/*` | `shared/*` |

## Static Assets

Static files go in `projects/<app>/public/` and are served at the root path.
Example: `public/project-images/foo.png` → `/project-images/foo.png`

## Deployment

Both projects are deployed on **Vercel**.

### Option 1 — Git Integration (recommended)

Pushing to the production branch automatically triggers a Vercel deployment. Vercel runs the configured build command and serves the `dist/` output. No manual steps required.

### Option 2 — Vercel CLI

1. Install the CLI: `npm install -g vercel`
2. Authenticate: `vercel login`
3. Preview deployment:

```bash
vercel
```

4. Production deployment:

```bash
vercel --prod
```

## Useful Links

- [Angular CLI docs](https://angular.dev/tools/cli)
- [Angular standalone components](https://angular.dev/guide/components)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Vercel docs](https://vercel.com/docs)
- [typed.js](https://mattboldt.com/demos/typed-js/)
