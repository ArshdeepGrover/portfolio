# Arshdeep's Portfolio — Angular Workspace

An Angular 18 monorepo containing two projects: **portfolio** (personal portfolio website) and **studio**. Built with standalone components, Tailwind CSS 3, SCSS, and `typed.js`. Deployed on [Vercel](https://vercel.com).

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Angular CLI](https://angular.dev/tools/cli) v18: `npm install -g @angular/cli`

## Installation

```bash
npm install
```

## Development Server

Serve a project locally with live reload:

```bash
# Portfolio → http://localhost:4200/
npm run start:portfolio

# Studio → http://localhost:4200/
npm run start:studio
```

## Build

### Production build

```bash
# Build portfolio
npm run build:portfolio

# Build studio
npm run build:studio

# Build both
npm run build:all
```

Artifacts are output to the `dist/` directory.

### Development / watch build

```bash
npm run watch:portfolio
npm run watch:studio
```

## Running Tests

Unit tests run via [Karma](https://karma-runner.github.io) + Jasmine:

```bash
# Portfolio
npm run test:portfolio

# Studio
npm run test:studio
```

## Code Scaffolding

```bash
ng generate component components/<name> --project=portfolio
```

## Deployment

Both projects are deployed on **Vercel**.

### Deploy via Vercel CLI

1. Install the Vercel CLI: `npm install -g vercel`
2. Authenticate: `vercel login`
3. From the project root, run:

```bash
vercel
```

For a production deployment:

```bash
vercel --prod
```

### Deploy via Vercel Dashboard (Git Integration)

Pushing to the configured branch (e.g. `vecel-production-v2`) automatically triggers a Vercel deployment. No manual steps are needed — Vercel builds the project using the configured build command (`npm run build:portfolio` or `npm run build:studio`) and serves the `dist/` output.

## Further Help

- [Angular CLI docs](https://angular.dev/tools/cli)
- [Vercel docs](https://vercel.com/docs)
