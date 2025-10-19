# InspectionMetrics

Full‑stack app for inspection indicators.

## Setup

- Node.js 20+
- PostgreSQL URL

1. Copy `.env.example` to `.env` and set variables:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `ADMIN_PASSWORD`
   - `DEFAULT_ADMIN_USER`
   - `DEFAULT_ADMIN_PASS`
2. Install deps: `npm install`
3. Push schema: `npm run db:push`
4. Dev: `npm run dev` (serves API+SPA on port `5000`)
5. Prod: `npm run build && npm run start`

## Security Changes

- Session‑based auth (HttpOnly cookie) instead of bearer base64.
- Passwords stored as PBKDF2 hashes.
- Admin password read from `ADMIN_PASSWORD`.
- Logging no longer prints response payloads.
- Example env file added.

