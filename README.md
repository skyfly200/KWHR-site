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

## Stream over HTTPS

The live stream is served over HTTPS at **`https://stream.wayhighradio.com/stream`**
— a Caddy reverse proxy (with an automatic Let's Encrypt certificate) sits in front
of the Icecast server at `74.208.198.179:8000`. This avoids the mixed-content block
browsers apply to a plain-HTTP stream on an HTTPS page. The URL lives in
`station.streamUrl` (`src/data/site.ts`).

## Pages

Home · Listen · Schedule · DJs (+ detail) · Forward blog (+ post) · Guidelines ·
Links · Contact — mirroring the structure of the original site.

## Deploy

Static output in `dist/`. The included `public/_redirects` handles SPA fallback on
Netlify; for other hosts, route all paths to `index.html`.
