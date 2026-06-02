# The Curated Archive

A modular digital museum engineered with Neo-Brutalist Intent & Tonal Layering.

## Architecture

This homepage is organized as a modular digital museum.

- `src/pages/HomePage.tsx` controls the main route.
- `src/data/museumSections.ts` defines hall metadata.
- `src/components/common` contains reusable UI primitives.
- `src/components/` (and its subdirectories) contain individual exhibit modules.
- `src/data` contains project, skill, timeline, and archive content.
- `src/types` contains shared TypeScript interfaces (if defined).

The site separates museum structure, module UI, and content data so that new halls can be added without rewriting the homepage.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

Required:

* `VITE_SITE_URL`
* `VITE_GITHUB_USERNAME`

Optional:

* `VITE_GEMINI_API_KEY`
* `VITE_ENABLE_AI_PLAYGROUND`
* `VITE_ENABLE_TELEMETRY`

## Deployment

The site is deployed with Vercel.

* Framework: Vite
* Build command: `npm run build`
* Output directory: `dist`
