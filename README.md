# Mobile Store

A single-page application for browsing and purchasing mobile devices.
Built with Vue 3 and TypeScript, consuming the ITX frontend test API.

**Live demo:** [itx-frontend-vue.vercel.app](https://itx-frontend-vue.vercel.app)

## Tech Stack

| Concern    | Choice                          | Reason                                                         |
| ---------- | ------------------------------- | -------------------------------------------------------------- |
| Build tool | Vite                            | Fastest DX, modern default for Vue 3                           |
| Framework  | Vue 3 + `<script setup>`        | Author's strongest stack; better TS inference than Options API |
| Language   | TypeScript (strict)             | Catches bugs early; defensible at every line                   |
| Routing    | Vue Router 4                    | Official; HTML5 history mode for clean SPA URLs                |
| State      | Pinia                           | Official Vue store; TS-first, simpler than Vuex                |
| Styling    | Tailwind CSS v4                 | Utility-first; consistent spacing without CSS file sprawl      |
| HTTP       | Native fetch (typed wrapper)    | Zero dependency cost; sufficient for this scope                |
| Testing    | Vitest + @vue/test-utils        | Native Vite integration; fast feedback loop                    |
| Lint       | ESLint (flat config) + Prettier | Modern config; no lint/format conflicts                        |
| Container  | Docker (multi-stage)            | nginx serves the built SPA                                     |
| CI         | GitHub Actions                  | Lint + test + build on every push and PR                       |

## Getting Started

### Prerequisites

- Node.js >= 22
- npm >= 10

### Install

```bash
npm install
```

### Run

```bash
npm start          # development server
npm run build      # production build
npm run test       # run tests once
npm run test:watch # run tests in watch mode
npm run lint       # lint and format check
```

### Makefile shortcuts

```bash
make install       # npm install
make dev           # development server
make build         # production build
make test          # run tests
make lint          # lint and format check
make format        # auto-format all files with Prettier
make docker-build  # build Docker image
make docker-run    # run container on port 8080
```

### Docker

```bash
docker build -t mobile-store .
docker run -p 8080:80 mobile-store
# open http://localhost:8080
```

## Architecture

### Folder Structure

```text
src/
  app/
    router.ts             # Vue Router — two routes: PLP and PDP
  shared/
    api/
      httpClient.ts       # Typed fetch wrapper; cache-first for GET requests
      cache.ts            # TTL cache (1h, sessionStorage)
    composables/
      useDebounce.ts      # Generic debounce composable
    types/
      ApiError.ts         # Typed error class with HTTP status
    ui/
      AppHeader.vue       # Sticky header; breadcrumb slot; cart counter
      AppLayout.vue       # Page shell — header + main + footer
      AppFooter.vue       # Minimal footer
  features/
    products/
      api/
        productsApi.ts    # fetchProducts, fetchProductById (normalizes API inconsistencies)
      composables/
        useProductList.ts   # Loading / error / data state for the product list
        useProductDetail.ts # Loading / error / data state for a single product
        useProductSearch.ts # Debounced client-side filter (brand + model)
      components/
        ProductCard.vue             # Presentational card — emits click, never navigates
        ProductGrid.vue             # Responsive grid (1 → 2 → 3 → 4 cols)
        ProductSearchBar.vue        # Controlled input with clear button
        ProductDetailImage.vue      # Sticky image column
        ProductDetailDescription.vue # Spec table in two columns
        ProductDetailActions.vue    # Color swatches, storage selector, add-to-cart
      utils/
        colorUtils.ts               # colorHex() — maps API color names to hex values
      pages/
        ProductListPage.vue   # PLP — orchestrates list + search
        ProductDetailPage.vue # PDP — orchestrates detail + actions
      types/
        Product.ts            # ProductSummary, ProductDetail, ColorOption, StorageOption
    cart/
      api/
        cartApi.ts        # POST /api/cart
      store/
        cartStore.ts      # Pinia setup store; count persisted in localStorage
```

### Layering Rules

- **Pages** orchestrate composables and lay out components. No fetches, no business logic.
- **Composables** coordinate API + cache + reactive state. They are the application layer.
- **Components** are presentational: props in, events out. No fetches, no router awareness.
- **`httpClient.ts`** is the only place that calls `fetch`. Everything else uses it.
- **Pinia stores** are for state that lives across routes (cart count). Local state stays in composables.

## API

Base URL: `https://itx-frontend-test.onrender.com`

| Method | Path               | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/product`     | List all products   |
| GET    | `/api/product/:id` | Get product detail  |
| POST   | `/api/cart`        | Add product to cart |

All GET responses are cached client-side for 1 hour via `sessionStorage`.
The cart count returned by `POST /api/cart` is persisted in `localStorage`.

**Known API quirk:** several array fields (`primaryCamera`, `secondaryCmera`, `internalMemory`, etc.) are returned as plain strings for some products instead of arrays. These are normalized to `string[]` in `productsApi.ts` at the API boundary so the rest of the app can rely on consistent types.

**Known mock API limitation:** `POST /api/cart` always returns `{ count: 1 }` regardless of session state — the server is stateless. The cart count is incremented locally on every successful add, which reflects the correct UX behavior while still calling the required endpoint.

## Testing

Tests describe observable behavior, not implementation. Mocks are placed at architectural boundaries — the API layer — not at `fetch` level, so a composable test verifies the composable's contract without coupling to HTTP internals.

```bash
npm test
```

| File                       | What is tested                                             |
| -------------------------- | ---------------------------------------------------------- |
| `cache.test.ts`            | TTL expiry, cache hit/miss, key isolation                  |
| `useProductList.test.ts`   | Loading state, success, error, empty list                  |
| `useProductSearch.test.ts` | `filterProducts` — case, accents, brand+model, empty query |

## CI

GitHub Actions runs on every push and pull request to `master`:

1. Install dependencies (`npm ci`)
2. Lint + format check (`npm run lint`)
3. Tests (`npm test`)
4. Production build (`npm run build`)

## Decisions / Trade-offs

- **Vue 3 over React**: the recruiter explicitly allowed any framework. Vue is the author's strongest stack — senior-level depth here beats mid-level React. React analogues (hooks ↔ composables, Context ↔ provide/inject, Zustand ↔ Pinia) are known and discussable.
- **Tailwind v4**: no `tailwind.config.js` needed — configuration lives in CSS via `@theme`. Fewer moving parts; design tokens are co-located with styles.
- **sessionStorage for API cache**: 1h TTL fits per-session intent; degrades gracefully to a fresh fetch on quota errors.
- **localStorage for cart count**: the exercise requires the count to persist across views and reloads — `localStorage` survives tab closes, `sessionStorage` does not.
- **Native fetch over axios**: zero runtime cost, no extra dependency, sufficient for this scope. Wrapped in a typed client for error mapping and cache integration.
- **`AppLayout` with named slot for breadcrumb**: the header does not know about page domain or route structure. Each page injects its own breadcrumb via a slot, keeping the header reusable and decoupled from the router.
- **`filterProducts` extracted as a pure function**: the debounced composable is hard to test synchronously. Extracting the filter logic as a pure function allows direct unit testing without async overhead.
- **API response normalization at the boundary**: several fields (`secondaryCmera`, `primaryCamera`, etc.) arrive as `string` instead of `string[]` for some products. Normalizing in `productsApi.ts` keeps the inconsistency confined to one place and lets the rest of the app trust the declared types.
