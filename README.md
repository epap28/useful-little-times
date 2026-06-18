# Useful Little Times

Useful Little Times is a small open-source web app for micro-learning during idle moments. It is made for the tiny pauses while AI tools, coding agents, builds, exports, or automated work finish.

The frontend is a static Next.js export for GitHub Pages. The backend is a Cloudflare Worker using D1 for SQL storage.

## Core Features

- Static frontend deployable to GitHub Pages
- Cloudflare Worker API with D1 persistence
- Account-based preferences and history
- One-click launch: "I have several minutes"
- Sourced learning cards across several categories
- Varied card types: quick facts, explanations, analogies, active recall, mini quizzes, mnemonics, misconceptions, and examples
- Recommendation logic that respects preferred and avoided categories
- Simple spaced repetition using interesting and missed items
- Random movement cards every 5-10 uses on average
- Batch recap after 10 uses or when ending a work session
- Content validation so learning items cannot ship without sources

## Tech Stack

- Next.js static export
- TypeScript
- React
- Cloudflare Workers
- Cloudflare D1
- Wrangler
- Zod
- Vitest
- Playwright smoke test

## Quick Start

Install dependencies:

```bash
npm install
copy .env.example .env
```

Run the frontend:

```bash
npm run dev
```

Run the Worker API locally:

```bash
npm run d1:migrate:local
npm run d1:seed:local
npm run worker:dev
```

Then open `http://localhost:3000`.

## Environment Variables

Frontend:

```env
NEXT_PUBLIC_API_BASE_URL="https://useful-little-times-api.jeanhamel2832.workers.dev"
```

For GitHub Pages, set a repository variable named `NEXT_PUBLIC_API_BASE_URL` to your deployed Worker URL.

## Cloudflare Setup

Create the D1 database:

```bash
npx wrangler d1 create useful-little-times
```

Copy the returned `database_id` into `worker/wrangler.jsonc`.

Apply migrations and seed remote D1:

```bash
npm run d1:migrate:remote
npm run d1:seed:remote
```

Deploy the Worker:

```bash
npm run worker:deploy
```

The Worker deployment can also run from `.github/workflows/worker.yml` if you configure these GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## GitHub Pages

Build the static site for the repository path `/useful-little-times`:

```bash
npm run pages:build
```

The Pages workflow deploys the `out/` directory on pushes to `main`.

## Tests And Validation

```bash
npm run content:validate
npm run lint
npm run typecheck
npm run test
npm run worker:test
npm run build
npm run pages:build
```

The Playwright smoke test is available with:

```bash
npx playwright install chromium
npm run test:e2e
```

## Recommendation Logic

The recommendation engine is deliberately simple:

- filter avoided categories
- favor preferred categories
- avoid recently shown learning items
- avoid long streaks from the same category
- deprioritize items marked "I knew this" or "Not relevant"
- bring back interesting or missed items after they leave the recent window
- insert a movement card after 5-10 learning uses with increasing probability

This keeps V1 understandable and testable without pretending to be ML-based.

## Adding Content

Learning cards live in `data/learning-items.ts`. Activity cards live in `data/activity-items.ts`.

Every learning card must include at least one real source URL. Run this before opening a pull request:

```bash
npm run content:validate
```

See `docs/content.md` for content guidelines.

## Roadmap

- Grow the verified learning item set from 20 to 60+
- Add account deletion and export
- Add richer contributor tooling for content review
- Add optional custom-domain cookies for stronger session handling
- Add screenshots once the first hosted demo is available

## License

MIT
