# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lavash Lebanese Cuisine is a React food ordering web app for a Lebanese restaurant. It features menu browsing, item customization (heat level, extras), and a shopping cart. Built with Google AI Studio, it uses the Gemini API.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build to dist/
npm run preview   # Serve production build locally
npm run clean     # Remove dist/ artifacts
npm run lint      # TypeScript type checking (tsc --noEmit)
```

## Tech Stack

- **React 19** + **TypeScript 5.8** (strict mode)
- **Vite 6** for bundling and dev server
- **Tailwind CSS 4** for styling
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **@google/genai** for Gemini API integration

## Architecture

**Routing**: Client-side view switching via state in `App.tsx` (no React Router). Two views: home and menu.

**State management**: Local `useState` with prop drilling from `App.tsx`, which owns global state (current view, cart visibility, selected item).

**Component hierarchy**:
- `App.tsx` — root layout, state orchestration, renders Navbar + view + overlays
- `Home.tsx` — landing page with hero, featured items, trending sidebar
- `Menu.tsx` — categorized menu with sidebar navigation and filterable grid
- `ItemModal.tsx` — item customization modal (heat, extras, quantity, special instructions) with dynamic price calculation
- `CartSidebar.tsx` — slide-out cart with item list, upsell section, and checkout totals
- `Navbar.tsx` — responsive nav with animated logo, context-aware layout (home vs menu)

**Data**: Menu items are hardcoded in components (no API/database integration despite Express and better-sqlite3 being in dependencies).

## Design System

Three fonts loaded from Google Fonts: **Anton** (display/headlines), **Oswald** (subtitles), **Space Grotesk** (body).

Key colors defined as CSS custom properties in `index.css`:
- Red `#D92525`, Green `#008C44`, Yellow `#EAB308`
- Dark background `#121214`, surface `#1E1E24`

Visual effects include noise texture overlay, backdrop blur on modals, grayscale hover effects, and marquee animation.

## Environment

Requires `GEMINI_API_KEY` in `.env.local`. Vite exposes it to the frontend via `vite.config.ts` (`envPrefix` and `define`).

## Path Aliases

`@/*` maps to the project root (configured in both `tsconfig.json` and `vite.config.ts`).
