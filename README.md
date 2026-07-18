# Gym Tracker — Push Pull Legs

A premium, mobile-first fitness web app for tracking a **Push / Pull / Legs** training split. Built with a dark-only, design-forward aesthetic and a clean, reusable architecture.

> This repository currently contains the **project structure and base layout only**. The workout, progress, and history screens are intentionally not built yet.

## Tech stack

| Concern         | Choice                              |
| --------------- | ----------------------------------- |
| Framework       | Next.js 15 (App Router)             |
| Language        | TypeScript (strict)                 |
| Styling         | Tailwind CSS 3.4 + CSS variables    |
| UI primitives   | shadcn/ui (new-york) + Radix Slot   |
| Animation       | Framer Motion                       |
| Icons           | Lucide React                        |

## Prerequisites

You need **Node.js 18.18+ (LTS recommended)** and npm. This machine doesn't have Node installed yet — install it, then reopen a terminal:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Getting started

```powershell
cd gym-tracker
npm install
npm run dev
```

Then open http://localhost:3000.

### Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |
| `npm run typecheck` | Type-check without emitting      |

## Project structure

```
gym-tracker/
├─ app/                     # App Router: layout, pages, loading & 404
│  ├─ layout.tsx            # Root layout (fonts, metadata, providers, shell)
│  ├─ page.tsx              # Home dashboard (base scaffold)
│  ├─ loading.tsx           # Route-level skeleton
│  └─ not-found.tsx         # Branded 404
├─ components/
│  ├─ ui/                   # shadcn primitives (button, card, badge, skeleton)
│  ├─ layout/               # App shell, header, sidebar, bottom nav, container
│  ├─ common/               # Logo, providers, motion, section heading, empty state
│  ├─ workout/              # (reserved) workout-tracking components
│  └─ charts/               # (reserved) data-visualization components
├─ data/                    # Typed static data (navigation, splits)
├─ hooks/                   # Reusable client hooks (media query, scroll, mounted)
├─ lib/                     # Utilities, fonts, constants
├─ types/                   # Shared domain & UI types
├─ public/                  # Static assets (icon, logo, manifest)
├─ styles/                  # globals.css — the single theme source of truth
├─ tailwind.config.ts       # Design tokens mapped to CSS variables
└─ components.json          # shadcn/ui configuration
```

## Theming

The app is **dark-theme only**. Every color is a CSS custom property (HSL channels) declared in [`styles/globals.css`](styles/globals.css) and mapped to Tailwind in [`tailwind.config.ts`](tailwind.config.ts). To re-skin the app, edit the variables — nothing else needs to change.

Highlights:

- **Brand accent:** energetic emerald (`--primary`).
- **Category accents:** `--push` (red), `--pull` (blue), `--legs` (amber).
- **Chart palette:** `--chart-1..5`, ready for the charts module.
- **Motion:** shared timings in `lib/constants.ts`; reusable `FadeIn`, `FadeInUp`, `Stagger` wrappers in `components/common/motion.tsx`; page transitions via `PageTransition`. Respects `prefers-reduced-motion`.

## Adding shadcn/ui components

`components.json` is preconfigured, so you can drop in additional primitives:

```powershell
npx shadcn@latest add dialog input tabs
```

## Responsive layout

- **Mobile-first:** a fixed bottom tab bar (`components/layout/bottom-nav.tsx`) with safe-area insets.
- **Desktop (`lg+`):** a fixed sidebar (`components/layout/sidebar.tsx`); the bottom bar is hidden.
- Both share the same `NAV_ITEMS` data and animated active indicators.
