# Mobile Store

A single-page application for browsing and purchasing mobile devices.
Built with Vue 3 and TypeScript, consuming the ITX frontend test API.

## Tech Stack

| Concern | Choice | Reason |
| --- | --- | --- |
| Build tool | Vite | Fastest DX, modern default for Vue 3 |
| Framework | Vue 3 + `<script setup>` | Author's strongest stack; better TS inference than Options API |
| Language | TypeScript (strict) | Catches bugs early; defensible at every line |
| Routing | Vue Router 4 | Official; HTML5 history mode for clean SPA URLs |
| State | Pinia | Official Vue store; TS-first, simpler than Vuex |
| Styling | Tailwind CSS v4 | Utility-first; consistent spacing without CSS file sprawl |
| HTTP | Native fetch (typed wrapper) | Zero dependency cost; sufficient for this scope |
| Testing | Vitest + @vue/test-utils | Native Vite integration; fast feedback loop |
| Lint | ESLint (flat config) + Prettier | Modern config; no lint/format conflicts |
| Container | Docker (multi-stage) | nginx serves the built SPA |
| CI | GitHub Actions | Lint + test + build on every push and PR |

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Install

```bash
npm install
```

### Run

```bash
npm start        # development server
npm run build    # production build
npm run test     # run tests
npm run lint     # lint and format check
```

## API

Base URL: `https://itx-frontend-test.onrender.com`

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/product` | List all products |
| GET | `/api/product/:id` | Get product detail |
| POST | `/api/cart` | Add product to cart |

All GET responses are cached client-side for 1 hour via `sessionStorage`.
The cart count returned by `POST /api/cart` is persisted in `localStorage`.

## Decisions / Trade-offs

- **Vue 3 over React**: the recruiter explicitly allowed any framework. Vue is the author's strongest stack — senior-level depth here beats mid-level React. React analogues (hooks ↔ composables, Context ↔ provide/inject, Zustand ↔ Pinia) are known and discussable.
- **Tailwind v4**: no `tailwind.config.js` needed — configuration lives in CSS via `@theme`. Fewer moving parts.
- **sessionStorage for API cache**: 1h TTL fits per-session intent; degrades gracefully to a fresh fetch on quota errors.
- **localStorage for cart count**: the exercise requires the count to persist across views and reloads — `localStorage` survives tab closes, `sessionStorage` does not.
- **Native fetch over axios**: zero runtime cost, no extra dependency, sufficient for this scope. Wrapped in a typed client for error mapping and cache integration.
