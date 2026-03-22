# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal portfolio website built with Angular 18 (standalone components), Tailwind CSS, and SCSS. Deployed on Vercel. Uses `typed.js` for typing animations in the hero section.

## Commands

- **Dev server**: `ng serve` → http://localhost:4200/
- **Build (production)**: `ng build`
- **Build (watch/dev)**: `ng build --watch --configuration development`
- **Run all tests**: `ng test` (Karma + Jasmine)
- **Run a single test file**: `ng test --include=src/app/components/hero/hero.component.spec.ts`
- **Generate component**: `ng generate component components/<name>` (generates with SCSS per `angular.json` schematics)

## Architecture

### Routing

Two routes defined in `src/app/app.routes.ts`:
- `/` → `HomeComponent` (single-page layout composing all section components)
- `/contact` → `ContactComponent` (standalone page with Formspree form submission)
- `**` → redirects to `/`

The home page sections are navigated via anchor scroll (`#skills`, `#projects`, etc.), driven by `HeaderComponent` which tracks the active section via `IntersectionObserver`-style scroll detection.

### Data Layer: Stores + Models

Content is **not** fetched from an API. All portfolio data lives in static TypeScript files:

- **Models** (`src/app/models/`): TypeScript interfaces (`IProject`, IBlog`, `ISkill`, `ICertificate`, `IExperience`, `IEducation`)
- **Stores** (`src/app/stores/`): Exported `const` arrays of model instances (e.g., `projects_store.ts` exports `projects: IProject[]`)

Components import directly from stores using path aliases. To add/edit portfolio content, modify the relevant store file.

### Path Aliases

Defined in `tsconfig.json`:
- `@stores/*` → `src/app/stores/*`
- `@models/*` → `src/app/models/*`

### Styling

- Tailwind CSS 3 with custom theme colors (`primary: #FF7955`, `primary-light`, `primary-dark`)
- Dark mode via Tailwind's `class` strategy — toggled in `HeaderComponent`, persisted to `localStorage`
- Global CSS variables for primary colors in `src/styles.scss`
- Component styles use SCSS
- Custom scroll-triggered animations replace AOS library: elements use `data-aos` attributes and `IntersectionObserver` in `HomeComponent.initializeAnimations()` adds `.animate-fade-in`

### Component Patterns

All components are **standalone** (no NgModules). The shell is `AppComponent` which renders `<app-header>`, `<router-outlet>`, and `<app-footer>`.

### Static Assets

Static files (images, favicons, project screenshots) go in `public/` and are served at the root path (e.g., `/project-images/foo.png`). The `src/sitemap.xml` is also included as a build asset.

## Code Style

- 2-space indent, single quotes for TypeScript, UTF-8 (see `.editorconfig`)
- Strict TypeScript (`strict: true`, `noImplicitReturns`, `noFallthroughCasesInSwitch`)
- Strict Angular compiler (`strictTemplates`, `strictInjectionParameters`)
