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

Content (station history, DJs, guidelines, links, the Forward post, contact
details, and the live stream URL) was sourced from the current wayhighradio.com
pages and is wired in. A few things are still worth confirming — search for
`CONFIRM`:

- **`station.frequencies`** — the source site was ambiguous about the current
  FM dial (it mentions moving to 90.5 FM with a 75-watt transmitter). Set the
  real over-the-air frequency/frequencies.
- **`station.donateUrl`** — point to the real donation / annual benefit page.
- **`public/icon-192.png` / `icon-512.png`** — solid-color placeholders; swap for the real logo.
- The **Schedule** page embeds the station's live Google Calendar, so it stays
  current automatically.

## ⚠️ Stream over HTTPS (important)

The live stream is `http://74.208.198.179:8000/stream` — **plain HTTP on port 8000**.
When the site is served over **HTTPS** (which any modern host does), browsers block
this stream as *mixed content* and playback silently fails. Fixes, easiest first:

1. **Front the stream with HTTPS.** If the Icecast/Shoutcast server has a domain +
   TLS cert, use `https://stream.wayhighradio.com/stream`. Many hosts (or a
   Cloudflare/Caddy/nginx reverse proxy) can add TLS in front of the `:8000` server.
2. **Reverse-proxy through your own site's domain**, e.g. serve
   `https://wayhighradio.com/stream` that proxies to `http://74.208.198.179:8000/stream`.
   Then set `station.streamUrl` to the HTTPS path.

Update `station.streamUrl` in `src/data/site.ts` once an HTTPS endpoint exists.
(If the whole site is served over plain HTTP, the current URL works as-is — but
HTTPS is strongly recommended.)

## Pages

Home · Listen · Schedule · DJs (+ detail) · Forward blog (+ post) · Guidelines ·
Links · Contact — mirroring the structure of the original site.

## Deploy

Static output in `dist/`. The included `public/_redirects` handles SPA fallback on
Netlify; for other hosts, route all paths to `index.html`.
