# Way High Radio — KWHR

A modern single-page web app for **Way High Radio (KWHR)**, the volunteer-powered,
commercial-free community station broadcasting on **90.5 FM (Ward, CO)** and
**102.9 FM (Nederland, CO)**.

Built with **Vue 3**, **Vuetify 3**, **Vite**, **TypeScript**, **Pinia**, and
**Vue Router**, with a PWA service worker for installability and offline shell.

## The persistent player

The whole point of the rebuild: a **site-wide stream player** that keeps playing
while you browse. The `<audio>` element lives in the Pinia store
(`src/stores/player.ts`) and the player bar (`src/components/ThePlayerBar.vue`) is
mounted once in `src/App.vue` **outside** `<router-view>`. Because it never
unmounts on navigation, the stream continues across every page — no second tab,
no interruption.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Where the content lives

All copy, DJs, schedule, blog posts, links, and station details are centralized in
**`src/data/site.ts`** so non-developers can update the site by editing one file.

### ⚠️ Placeholders to replace

The live site at `wayhighradio.com` could **not** be scraped from the build
environment (blocked by network egress policy), so some values are placeholders.
Search the repo for `PLACEHOLDER` and replace:

- **`station.streamUrl`** — the real live audio stream URL (required for playback).
- **`station.email`, `mailingAddress`, `donateUrl`, `social.instagram`** — real contact/support links.
- **`djs`** — bios and show names for each DJ (names were confirmed publicly; bios are placeholders).
- **`schedule`** — the real weekly show lineup and times.
- **`posts`** — the real "Forward" blog entries and bodies.
- **`links`** — the real community links.
- **Guidelines** page — the station's official guidelines (`src/pages/GuidelinesView.vue`).
- **`public/icon-192.png` / `icon-512.png`** — solid-color placeholders; swap for the real logo.

## Pages

Home · Listen · Schedule · DJs (+ detail) · Forward blog (+ post) · Guidelines ·
Links · Contact — mirroring the structure of the original site.

## Deploy

Static output in `dist/`. The included `public/_redirects` handles SPA fallback on
Netlify; for other hosts, route all paths to `index.html`.
