# WrestleMeter

WrestleMeter is a fan scorecard for professional wrestling. Visitors can browse WWE, AEW,
and AAA talent, inspect recent match context, and see annual fan ratings expressed as one to
five luchador masks. Browsing is public; production voting will require an account.

Live site: https://reyesrico.github.io/wrestling-meter/

The current application is a frontend prototype. It uses typed mock records, remote official
profile images, local demo authentication, and session-only voting so the complete product flow
can be evaluated before database work begins.

## Run locally

```bash
npm install
npm run dev
```

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

Authentication and vote enforcement are not production-ready yet.

## Stack

- React 19 and TypeScript 6
- Vite 8
- React Router 7
- Lucide icons
- Supabase planned for Postgres, Auth, Row Level Security, and scheduled season rollover
