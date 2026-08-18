# DISTRO AVENUE — The Digital Avenue

**Codename PROJECT-AVENUE · v1.0.0 · BUILD-READY**

An **unofficial portfolio concept** that reimagines **Distro Avenue Store** (Jl. Pakuan,
Baranangsiang, Bogor) as a premium digital streetwear destination. Built from the
master PRD (`PRD.md`). Not affiliated with, approved by, or endorsed by Distro Avenue
Store.

> **PORTFOLIO DEMO** — all products, prices, orders, customers, analytics and journal
> content are synthetic demo data, clearly labeled throughout the UI.

---

## Tech Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **Framer Motion** · **Lucide React** · **Zustand**
- Mock JSON data behind a backend-ready abstraction
- Unit tests with **Vitest**

## Getting Started

```bash
npm install
npm run dev        # development server
```

> Note: the build scripts force `NODE_ENV` via `cross-env` so they work regardless of
> your shell environment.

## Scripts

| Script              | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Development server                   |
| `npm run build`     | Production build (all routes static) |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript check                     |
| `npm test`          | Vitest unit tests                    |

## Routes

| Route              | Page                                   |
| ------------------ | -------------------------------------- |
| `/`                | Homepage (hero, avenue, city, drops)   |
| `/shop`            | Catalog with filters & sort            |
| `/product/[slug]`  | Product detail                         |
| `/collections`     | Collection directory                   |
| `/lookbook`        | Editorial looks + Shop the Look        |
| `/journal`         | Editorial articles                     |
| `/journal/[slug]`  | Article detail                         |
| `/store`           | Store info, hours, dynamic status, map |
| `/about`           | Concept story                          |
| `/case-study`      | Portfolio case study                   |
| `/bag`             | Shopping bag                           |
| `/checkout`        | 3-step demo checkout                   |
| `/account`         | Profile, orders, wishlist, addresses   |
| `/admin`           | Portfolio demo CMS (10 modules)        |

## Demo Mode

`NEXT_PUBLIC_DEMO_MODE=true` in `.env.local`. When active, demo products, orders,
customers, analytics and content are shown with `DEMO DATA` indicators. The admin
dashboard always shows: *"All analytics shown are simulated portfolio data."*

## Business Information

Only **verified public information** is used for the store (address `9RX7+2C7, Jl.
Pakuan, Baranangsiang, Bogor Timur` and operating hours). No phone numbers, emails,
social accounts, prices or testimonials are fabricated.

## Verification

- ✅ Lint (0 errors) · ✅ Typecheck · ✅ 29/29 unit tests · ✅ Production build (44 routes)
- ✅ All routes return 200 · ✅ 404 page · ✅ No console errors in browser QA
