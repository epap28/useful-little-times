# Architecture Notes

Useful Little Times is split into a static frontend and a serverless backend.

## Frontend

The frontend is a Next.js static export deployed to GitHub Pages. It stores the API token in browser storage and calls the Worker API through `NEXT_PUBLIC_API_BASE_URL`.

## Backend

The backend is a Cloudflare Worker with a D1 binding named `DB`.

Core endpoints:

- `POST /auth/signup`
- `POST /auth/signin`
- `GET /me`
- `PUT /preferences`
- `POST /moments/launch`
- `POST /interactions/:id/feedback`
- `POST /recaps`
- `GET /history`
- `GET /recaps/:id`

## Data Model

D1 tables:

- `users`
- `sessions`
- `categories`
- `user_preferences`
- `sources`
- `learning_items`
- `learning_item_sources`
- `activity_items`
- `user_item_interactions`
- `recaps`

## Auth

V1 uses local credentials handled by the Worker. Passwords are hashed with PBKDF2 via Web Crypto. Sessions use opaque random tokens; only token hashes are stored in D1.

## Recommendation

The recommendation algorithm is shared pure TypeScript. It avoids blocked categories, favors preferred categories, interleaves topics, schedules lightweight review, and inserts activity cards after several uses.
