# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # WrestleMeter

  WrestleMeter is a fan scorecard for professional wrestling. Visitors can browse WWE, AEW, and AAA talent, inspect recent match context, and see annual fan ratings expressed as one to five luchador masks. Browsing is public; voting will require an account.

  Live site: https://reyesrico.github.io/wrestling-meter/

  The current application is a frontend prototype. It uses typed mock records, remote official profile images, local demo authentication, and session-only voting so the complete product flow can be evaluated before database work begins.

  ## Run locally

  ```bash
  npm install
  npm run dev
````

Production checks:

```bash
npm run build
npm run lint
```

## Current experience

- Responsive home, roster, and wrestler profile routes
- WWE, AEW, and AAA filters
- Global wrestler and promotion search
- English, Spanish, and French UI with browser-locale detection and a persistent language selector
- Current score, vote threshold, recent result, and annual history
- Ratings hidden until three votes exist
- Demo sign-in and one local vote per mounted profile
- Typed source URLs and explicit labels for illustrative prototype data

Authentication and vote enforcement are not production-ready yet. The planned architecture and phased work are documented in [private implementation plan](private implementation plan).

## Stack

- React 19 and TypeScript 6
- Vite 8
- React Router 7
- Lucide icons
- Supabase planned for Postgres, Auth, Row Level Security, and scheduled season rollover
  // Other configs...
