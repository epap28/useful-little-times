# Contributing

Thanks for helping make tiny waiting moments more useful.

## Local Setup

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

## Before A Pull Request

Run:

```bash
npm run content:validate
npm run lint
npm run typecheck
npm run test
npm run build
```

## Content Contributions

- Use real, stable source URLs.
- Prefer official docs, universities, museums, public institutions, and reputable references.
- Keep cards short enough for a waiting moment.
- Do not add unsourced generated facts.
- Add activity cards only when they are safe, low intensity, and include office-friendly alternatives.
