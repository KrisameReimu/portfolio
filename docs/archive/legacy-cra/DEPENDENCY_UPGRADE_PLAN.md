# Dependency Upgrade Plan

## Goal
Reduce long-term maintenance risk while keeping the site stable during ongoing content migration.

## Current Baseline
- React 16 (`react@16.10.2`)
- CRA 5 (`react-scripts@5.0.1`)
- `react-router-dom@6` mixed with legacy ecosystem libraries

## Upgrade Window Strategy

### Window 1 (Low Risk, 1-2 days)
- Remove unused legacy packages (if not referenced):
  - `enzyme`
  - `enzyme-adapter-react-16`
  - `react-easy-emoji`
  - `react-twitter-embed` (if no longer used)
- Keep runtime behavior unchanged.
- Deliverable: smaller dependency tree and fewer security warnings.

### Window 2 (Core Modernization, 2-4 days)
- Upgrade to React 18:
  - `react` + `react-dom` to latest stable 18.x
  - update `src/index.js` to `createRoot`
- Replace `react-reveal` with CSS/Framer Motion transitions.
- Validate all routes and language toggle behavior.

### Window 3 (Build Tooling, 2-5 days)
- Choose one path:
  1. Stay on CRA and harden scripts.
  2. Migrate to Vite for faster build/dev and simpler maintenance.
- If choosing Vite:
  - migrate env variable names
  - move static asset references to Vite-compatible paths
  - verify Vercel build settings

## Safety Checklist
- Before each window:
  - `npm run build`
  - smoke test `/`, `/writing`, `/articles/:slug`, `/photos`, `/videos`, `/about`, `/contact`
- After each window:
  - confirm `public/content` still loads correctly
  - confirm metadata/favicons still render
  - verify no regressions in dark mode and language toggle

## Recommended Order
1. Finish content pipeline unification.
2. Run Window 1.
3. Schedule Window 2 when no major content migration is in progress.
4. Decide on Window 3 after React 18 is stable in production.
