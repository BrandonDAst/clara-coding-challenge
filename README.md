# Clara Market Dashboard

A responsive cryptocurrency market dashboard built with Next.js, TypeScript, and TanStack Query. Displays real-time data for the top 20 cryptocurrencies and allows deep exploration of individual assets.

---

## Getting Started

### Prerequisites

- Node.js 20 LTS or higher
- npm 10+

### Installation

```bash
git clone https://github.com/brandondast/clara-coding-challenge.git
cd clara-coding-challenge
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Technical Decisions

**Framework and deployment.** Next.js 14 with the App Router was chosen over a plain Vite + React setup for two reasons: the App Router's file-based routing scales cleanly as the app grows, and Next.js is the natural fit for Vercel. Vercel was the deployment target from the start.

**Data fetching and caching strategy.** TanStack Query was chosen over SWR for its finer control over retry logic — specifically, the ability to discriminate between error types and skip retries entirely on `429` responses from CoinGecko's free tier.

**TypeScript.** Types are derived directly from the CoinGecko API response shapes so they match the actual structure the API returns.

**Rendering performance — SVG sparklines over Recharts.** The market table renders 20 rows simultaneously, each with a 7-day sparkline. Mounting 20 full `Recharts` instances would create significant overhead. Instead, the sparkline is a pure SVG component that takes a `number[]` array and computes a polyline and gradient fill directly, with no library overhead. Recharts is reserved for the detail modal's full price history chart, where its interactivity is actually needed.

**Modal accessibility.** The detail modal is built without a UI library dependency. Focus management, scroll lock, ESC dismissal, and all ARIA attributes are handled explicitly. This was a deliberate choice to keep the dependency footprint small and to make the accessibility intent transparent to code reviewers.

---

## How I Used AI Tools

I used **Claude** (Anthropic) as a collaborative tool throughout this challenge, treating it as a pair-programmer rather than a code generator. The workflow was iterative: I directed the overall architecture — folder structure, hook boundaries, stale time strategy, accessibility requirements — and used Claude to implement the initial versions of each layer. The types file was a key example: Claude generated the base interfaces from the CoinGecko API shape, and I reviewed and corrected the `ath_date` / `atl_date` typing (which the API returns as `Record<string, ISODateString>`, not a plain string) and added the `isCoinGeckoError` type guard which was missing from the first pass. The `useSort` and `useSearch` hooks were generated correctly on the first pass and needed no corrections. In general, AI was most valuable for reducing boilerplate on well-understood patterns (formatters, query keys, Recharts setup) and most in need of review on accessibility semantics and nuanced TypeScript typing.

---

## Live Demo

[https://clara-coding-challenge.vercel.app/p](https://clara-coding-challenge.vercel.app/)
