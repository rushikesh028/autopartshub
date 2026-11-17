# AutoPartsHub Frontend (React)

Modern React rewrite of the AutoPartsHub storefront. Same look, behaviour and API contract as the original single-file HTML version, now structured as a proper component-based React application.

## Stack

- **React 19** + Vite
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- Vanilla JS utilities for API calls and helpers
- localStorage for session persistence
- Proxy to Spring Boot backend on `/api`

## Project structure

```
autopartshub-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx                 # Root state + orchestration
│   ├── index.css               # Tailwind + design tokens
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Workflow.jsx
│   │   ├── Catalog.jsx
│   │   ├── CtaSection.jsx
│   │   ├── Footer.jsx
│   │   ├── PartModal.jsx
│   │   ├── CartDrawer.jsx
│   │   └── AuthModal.jsx
│   ├── data/
│   │   └── demoCatalog.js
│   └── utils/
│       ├── api.js
│       └── helpers.js
```

## Getting started

```bash
cd autopartshub-react
npm install
npm run dev
```

Open http://localhost:5173

The Vite dev server proxies `/api/*` to `http://localhost:8080` (configure in `vite.config.js` if your backend runs elsewhere).

## Features preserved

- Live catalog with search + brand filter
- Demo inventory fallback when backend is unavailable
- Part detail modal with quantity controls
- Cart drawer (add / remove / checkout)
- Auth modal (login / register) with localStorage session
- Responsive header + mobile menu
- Scroll reveal animations (respects `prefers-reduced-motion`)

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start Vite dev server    |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
