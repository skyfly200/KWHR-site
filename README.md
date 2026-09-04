# Way High Radio — KWHR

A modern, statically-generated site for **Way High Radio (KWHR)**, the
volunteer-powered, commercial-free community station broadcasting on
**90.5 FM (Ward, CO)** and streaming online.

Built with **Nuxt 3**, **Vuetify 3** (via `vuetify-nuxt-module`),
**@nuxt/content** (markdown blog), and **Pinia**. `nuxt generate` prerenders
every page to static HTML for fast loads and good SEO.

## The persistent player

The whole point of the rebuild: a **site-wide stream player** that keeps playing
while you browse. The `<audio>` element lives in a Pinia store
(`stores/player.ts`) and the player bar (`components/ThePlayerBar.vue`) is
mounted once in the layout (`layouts/default.vue`), **outside** `<NuxtPage>`.
Because it never unmounts on navigation, the stream continues across every page.

The stream is served over HTTPS at `https://stream.wayhighradio.com/stream`
(a Caddy reverse proxy + Let's Encrypt in front of the Icecast server).

## Develop

```bash
npm install       # uses legacy-peer-deps (see .npmrc)
npm run dev       # dev server at http://localhost:3000
npm run generate  # static build -> .output/public (symlinked as dist/)
npm run preview   # preview the generated build
```

## Writing blog posts (the "Forward" blog)

Posts are **markdown files** in `content/forward/`. Add a file like
`content/forward/my-post.md`:

```md
---
title: My Post Title
date: 2026-09-04
author: Way High Radio
excerpt: A one-line summary shown on the blog list and home page.
---

Your post body in **markdown**. Headings, lists, links, images — all supported.
```

It automatically appears (newest first) on `/forward`, on the home page's
"From the blog" section, and at `/forward/my-post`. No code changes needed.

## Where the rest of the content lives

Station details, DJs, schedule calendar, links, guidelines, and image URLs are
in **`data/site.ts`**. The schedule page embeds the station's live Google
Calendar, so it stays current automatically.

### Still to confirm (search for `CONFIRM`)

- **`station.frequencies`** — set the real over-the-air FM dial if it differs.
- **`station.donateUrl`** — point to the real donation / benefit page.
- **Logo / icons** — the header logo currently uses the sticker JPEG
  (`media.sticker`). Swap in a transparent tower-only logo when available, and
  replace `public/icon-192.png` / `icon-512.png` for the PWA.

## Pages

Home · Listen · Schedule · About · DJs (+ detail) · Forward blog (+ posts) ·
Guidelines · Links · Contact.

## Deploy (Netlify)

`netlify.toml` sets the build command (`npm run generate`), publish dir
(`dist`, a symlink to `.output/public`), and a `/* -> /200.html` SPA fallback.
`.npmrc` pins `legacy-peer-deps=true` so Netlify's `npm install` resolves the
dependency tree the same way local does.
