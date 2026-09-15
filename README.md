# ThornView AI — Landing Page

The ThornView AI marketing site (thornviewai.com), built with React + Vite.

## Local development

```bash
npm install
npm run dev
```

Opens a local dev server (usually http://localhost:5173) with hot reload.

## Build

```bash
npm run build
```

Compiles the site into static files in `dist/` — plain HTML/CSS/JS, no build tools or React needed to serve it.

```bash
npm run preview
```

Serves the production build locally so you can sanity-check it before deploying.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub (see below).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**, and select this repo.
3. Use these build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare will build and deploy automatically on every push to `main` from then on, and give you preview URLs for other branches/PRs.
5. Point your `thornviewai.com` domain at the Pages project under **Custom domains** (same as before).

## Project structure

```
index.html        entry HTML (Vite injects the built JS/CSS here)
src/main.jsx       mounts the React app
src/App.jsx         the entire site — all sections and components
src/index.css       all styles (design tokens, layout, components)
```

The whole site currently lives in one `App.jsx` file to mirror the structure it was migrated from. It can be split into per-section component files later if it gets unwieldy to work in — ask Claude to do that refactor any time, since the file itself is just a JS module now (no changes needed to the build).
