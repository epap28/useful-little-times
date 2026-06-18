# Useful Little Times

Useful Little Times is a small open-source web app for micro-learning during idle moments. It is made for the tiny pauses while AI tools, coding agents, builds, exports, or automated work finish.

The app keeps the interaction intentionally light: one button, one sourced learning card or movement card, gentle feedback, and a recap after ten uses.

## Core Features

- Account-based preferences and history
- One-click launch: “I have several minutes”
- Sourced learning cards across several categories
- Varied card types: quick facts, explanations, analogies, active recall, mini quizzes, mnemonics, misconceptions, and examples
- Recommendation logic that respects preferred and avoided categories
- Simple spaced repetition using interesting and missed items
- Random movement cards every 5-10 uses on average
- Batch recap after 10 uses or when ending a work session
- Content validation so learning items cannot ship without sources
- Unit tests, Playwright smoke test, and GitHub Actions CI

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Prisma
- PostgreSQL
- Zod
- Vitest
- Playwright
- ESLint and Prettier

The app uses a small credentials-based auth flow with signed HTTP-only cookies so local development stays simple and contributor-friendly.

## Quick Start

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

Then open `http://localhost:3000`.

## Environment Variables

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/useful_little_times?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret-for-cookie-signing"
```

Use a long random `AUTH_SECRET` outside local development.

## Database

Generate Prisma Client:

```bash
npm run db:generate
```

Create a local migration and apply it:

```bash
npm run db:migrate
```

Seed categories, learning items, sources, and physical activity cards:

```bash
npm run db:seed
```

## Tests And Validation

```bash
npm run content:validate
npm run lint
npm run typecheck
npm run test
npm run build
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
- deprioritize items marked “I knew this” or “Not relevant”
- bring back interesting or missed items after they leave the recent window
- insert a movement card after 5-10 learning uses with increasing probability

This keeps V1 understandable and testable without pretending to be ML-based.

## Learning Science

The app uses lightweight versions of:

- active recall
- spaced repetition
- mini quizzes
- reformulation
- analogies
- testing effect
- interleaving
- mnemonics

The product goal is not to cram. It is to make one small useful idea easier to retrieve later.

## Adding Content

Learning cards live in `data/learning-items.ts`. Activity cards live in `data/activity-items.ts`.

Every learning card must include at least one real source URL. Run this before opening a pull request:

```bash
npm run content:validate
```

See `docs/content.md` for content guidelines.

## Deployment

The project can be deployed anywhere that supports Next.js and PostgreSQL, including Vercel, Render, Railway, Fly.io, or Docker-based hosts.

Minimum deployment steps:

1. Provision PostgreSQL.
2. Set `DATABASE_URL` and `AUTH_SECRET`.
3. Run Prisma migrations.
4. Run the seed script or import curated content.
5. Build with `npm run build`.
6. Start with `npm run start`.

## Roadmap

- Grow the verified learning item set from 20 to 60+
- Add optional OAuth through Auth.js
- Add account deletion and export
- Add richer contributor tooling for content review
- Add per-user recap scheduling controls
- Add screenshots once the first hosted demo is available

## License

MIT
