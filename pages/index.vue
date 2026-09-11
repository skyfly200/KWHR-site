<script setup lang="ts">
import { station, djs, media, partners } from '~/data/site'
import { avatarColor, initials } from '~/utils/avatar'
import NowPlayingBars from '~/components/NowPlayingBars.vue'

useHead({ title: 'Way High Radio — KWHR 90.5 FM' })

// Latest blog posts from markdown content.
const { data: latest } = await useAsyncData('home-latest-posts', () =>
  queryContent('/transmissions').sort({ date: -1 }).limit(2).find(),
)

const featuredDjs = djs.filter((d) => !d.alumni).slice(0, 6)

const features = [
  { icon: 'mdi-account-group', title: 'Volunteer-powered', text: 'Programmed and run by neighbors, not algorithms.', color: 'primary' },
  { icon: 'mdi-cancel', title: 'Commercial-free', text: 'No ads, ever. Listener-supported radio.', color: 'secondary' },
  { icon: 'mdi-tune-vertical', title: 'Free-form', text: 'Shows you will not hear anywhere else on the dial.', color: 'accent' },
]

</script>

<template>
  <!-- Hero: fully vector mountain scene — crisp at any size, no photo.
       Layers stack back→front: sun/moon, back ranges, tower, front range. -->
  <section class="hero">
    <!-- Celestial bodies (behind the mountains) -->
    <div class="hero__sun" aria-hidden="true" />
    <div class="hero__moon" aria-hidden="true" />

    <!-- Back ranges (far + mid) with snow caps -->
    <svg class="hero__mtn hero__mtn--back" viewBox="0 0 1440 340" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 340 L0 176 L250 92 L470 188 L690 74 L930 196 L1160 104 L1440 168 L1440 340 Z" fill="#16362a" opacity="0.75" />
      <path d="M0 340 L0 220 L220 150 L440 244 L660 150 L900 250 L1160 172 L1440 232 L1440 340 Z" fill="#0e2a20" />
      <!-- snow caps on the mid ridge -->
      <g fill="#eaf2ff" opacity="0.92">
        <path d="M198 166 L220 150 L242 166 Z" />
        <path d="M638 166 L660 150 L682 166 Z" />
        <path d="M1138 188 L1160 172 L1182 188 Z" />
      </g>
    </svg>

    <!-- Broadcast tower — centered, standing on the second (mid) ridge. Waves
         radiate in all directions from the antenna tip. -->
    <div class="hero__tower" aria-hidden="true">
      <span class="rings">
        <span class="ring" /><span class="ring" /><span class="ring" /><span class="ring" />
      </span>
      <svg class="tower" viewBox="0 0 80 170" fill="none">
        <path d="M40 8 L14 162 M40 8 L66 162" stroke="#41cd91" stroke-width="2.5" stroke-linecap="round" />
        <path
          d="M22 150 H58 M25 130 H55 M28 108 H52 M30 86 H50 M32 64 H48 M34 44 H46 M22 150 L55 130 M58 150 L25 130 M25 130 L52 108 M55 130 L28 108 M28 108 L50 86 M52 108 L30 86 M30 86 L48 64 M50 86 L32 64"
          stroke="#2f8f66" stroke-width="1.4" />
        <path d="M40 8 V0" stroke="#41cd91" stroke-width="2.5" stroke-linecap="round" />
        <circle class="beacon" cx="40" cy="2" r="4" fill="#ff8c42" />
      </svg>
    </div>

    <!-- Front range (occludes the tower base so it sits on the mid ridge) -->
    <svg class="hero__mtn hero__mtn--front" viewBox="0 0 1440 340" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 340 L0 280 L280 214 L540 300 L780 208 L1040 300 L1300 236 L1440 288 L1440 340 Z" fill="#08160f" />
      <g fill="#eaf2ff" opacity="0.85">
        <path d="M258 230 L280 214 L302 230 Z" />
        <path d="M758 224 L780 208 L802 224 Z" />
        <path d="M1278 252 L1300 236 L1322 252 Z" />
      </g>
    </svg>

    <v-container style="max-width: 1200px; position: relative; z-index: 5" class="hero__content py-16">
      <v-row align="center">
        <v-col cols="12" md="7">
          <v-chip color="error" variant="flat" size="small" class="mb-4 font-weight-bold px-3">
            <NowPlayingBars :active="true" />
            <span class="ml-2">ON AIR · {{ station.callsign }}</span>
          </v-chip>
          <h1 class="hero__title mb-4">
            We’re taking radio <span class="grad-text">higher</span><span class="hero__dot" aria-hidden="true" />
          </h1>
          <p class="text-h6 font-weight-medium mb-2" style="color: #f1f5f9">
            {{ station.name }} — {{ station.tagline }}
            <span class="text-medium-emphasis">{{ station.subtagline }}</span>
          </p>
          <p class="text-body-1 mb-6" style="max-width: 52ch; color: #cbd5e1">
            Volunteer-powered, commercial-free community radio from the mountains of
            Colorado. Press play and keep browsing — the stream follows you everywhere.
          </p>

          <div class="d-flex flex-wrap ga-3">
            <v-btn size="x-large" color="primary" variant="flat" to="/schedule" prepend-icon="mdi-calendar-clock">
              See the schedule
            </v-btn>
            <v-btn size="x-large" variant="outlined" color="white" to="/donate" prepend-icon="mdi-heart">
              Donate
            </v-btn>
          </div>

          <div class="d-flex flex-wrap ga-6 mt-8">
            <div v-for="f in station.frequencies" :key="f.freq" class="d-flex align-center">
              <v-icon icon="mdi-antenna" color="accent" class="mr-2" />
              <div>
                <div class="text-body-1 font-weight-bold" style="color: #fff">{{ f.freq }}</div>
                <div class="text-caption" style="color: #cbd5e1">{{ f.city }}</div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Sticker centerpiece -->
        <v-col cols="12" md="5" class="text-center">
          <img :src="media.sticker" alt="Way High Radio sticker" class="hero__sticker" />
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Features -->
  <v-container style="max-width: 1200px" class="py-12">
    <v-row>
      <v-col v-for="f in features" :key="f.title" cols="12" md="4">
        <v-card variant="tonal" class="pa-6 h-100 lift" :color="f.color" rounded="xl">
          <v-avatar :color="f.color" size="52" class="mb-3">
            <v-icon :icon="f.icon" size="26" color="white" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-1">{{ f.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ f.text }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Featured DJs -->
  <v-container style="max-width: 1200px" class="py-6">
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h4 font-weight-bold section-title">Meet the DJs</h2>
      <v-btn variant="text" color="primary" to="/djs" append-icon="mdi-arrow-right">All DJs</v-btn>
    </div>
    <v-row>
      <v-col v-for="dj in featuredDjs" :key="dj.slug" cols="6" sm="4" md="2">
        <v-card :to="`/djs/${dj.slug}`" class="pa-4 h-100 text-center lift" rounded="xl">
          <v-avatar :color="avatarColor(dj.name)" size="64" class="mb-2">
            <span class="text-h6 font-weight-bold" style="color: #fff">{{ initials(dj.name) }}</span>
          </v-avatar>
          <div class="text-body-2 font-weight-bold" style="line-height: 1.2">{{ dj.name }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Photo gallery -->
  <v-container style="max-width: 1200px" class="py-10">
    <h2 class="text-h4 font-weight-bold section-title mb-6">Out in the wild</h2>
    <v-row dense>
      <v-col v-for="(src, i) in media.gallery" :key="i" cols="6" md="3">
        <v-card rounded="xl" class="overflow-hidden lift" height="220">
          <v-img :src="src" cover height="220" class="photo">
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-surface-bright">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Latest from Forward + FDGD flyer -->
  <v-container style="max-width: 1200px" class="py-10">
    <v-row>
      <v-col cols="12" md="8">
        <div class="d-flex align-center justify-space-between mb-6">
          <h2 class="text-h4 font-weight-bold section-title">Latest transmissions</h2>
          <v-btn variant="text" color="primary" to="/transmissions" append-icon="mdi-arrow-right">Read all</v-btn>
        </div>
        <v-card
          v-for="post in latest"
          :key="post._path"
          :to="post._path"
          class="pa-6 mb-4 lift"
          rounded="xl"
        >
          <div class="text-overline text-secondary font-weight-bold">
            {{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
          </div>
          <div class="text-h6 font-weight-bold mb-2">{{ post.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ post.excerpt }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card rounded="xl" class="overflow-hidden lift h-100">
          <v-img :src="media.fdgdFlyer" cover class="h-100" min-height="260" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Partners strip -->
  <v-container style="max-width: 1200px" class="py-6">
    <div class="text-overline text-medium-emphasis text-center mb-4">Proud member & friends</div>
    <div class="d-flex flex-wrap justify-center align-center ga-8">
      <a v-for="p in partners" :key="p.name" :href="p.url" target="_blank" rel="noopener" :title="p.name">
        <v-img :src="p.logo" :alt="p.name" height="64" width="150" class="partner-logo" />
      </a>
    </div>
  </v-container>

  <!-- Support CTA -->
  <v-container style="max-width: 1200px" class="py-12">
    <v-card color="primary" variant="flat" class="pa-8 pa-md-12 text-center blob-bg" rounded="xl">
      <v-icon icon="mdi-heart" size="44" class="mb-3" />
      <h2 class="text-h4 text-md-h3 font-weight-bold mb-2">Keep community radio on the air</h2>
      <p class="text-body-1 mb-6 mx-auto" style="max-width: 48ch">
        {{ station.name }} is listener-supported and commercial-free. Your donation
        keeps local voices broadcasting across the mountains.
      </p>
      <v-btn size="x-large" color="white" variant="flat" to="/donate" prepend-icon="mdi-hand-heart">
        Support {{ station.callsign }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: 84vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  /* Default (dark) = dusk → night: sun has set, moon is up. */
  background: linear-gradient(180deg, #05080f 0%, #0a1826 46%, #0d2a20 100%);
  transition: background 0.9s ease;
}
/* Light = dawn: sun is rising. */
.v-theme--whrLight .hero {
  background: linear-gradient(180deg, #123a5c 0%, #2a6478 46%, #2f6f52 100%);
}

/* ---- Sun ---- default (dark): fully set behind the peaks, only a dusk glow. */
.hero__sun {
  position: absolute;
  z-index: 1;
  left: 46%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  bottom: -6%;
  background: radial-gradient(circle at 50% 45%, #ff8a4d 0%, #e8552b 45%, rgba(200, 60, 30, 0) 70%);
  box-shadow: 0 0 120px 40px rgba(255, 110, 55, 0.18);
  transition: bottom 0.9s ease, background 0.9s ease, box-shadow 0.9s ease;
}
/* Light: sun has risen well above the ridge, bright gold. */
.v-theme--whrLight .hero__sun {
  bottom: 34%;
  background: radial-gradient(circle at 50% 45%, #fffaf0 0%, #ffe491 32%, #ffc24d 58%, rgba(255, 194, 77, 0) 72%);
  box-shadow: 0 0 150px 54px rgba(255, 214, 120, 0.45);
}

/* ---- Moon ---- default (dark): risen, pale, off to one side. */
.hero__moon {
  position: absolute;
  z-index: 1;
  left: 74%;
  bottom: 60%;
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 36%, #f2f6ff 0%, #cfd8ec 52%, #9aa8c6 100%);
  box-shadow: 0 0 42px 8px rgba(200, 215, 255, 0.22);
  opacity: 1;
  transition: bottom 0.9s ease, opacity 0.7s ease;
}
/* subtle craters */
.hero__moon::before,
.hero__moon::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(120, 135, 165, 0.35);
}
.hero__moon::before { width: 17px; height: 17px; top: 30%; left: 26%; }
.hero__moon::after { width: 11px; height: 11px; top: 56%; left: 55%; }
/* Light: moon has set below the ridge. */
.v-theme--whrLight .hero__moon {
  bottom: -18%;
  opacity: 0;
}

/* ---- Mountain range layers ---- */
.hero__mtn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: min(52vh, 400px);
}
.hero__mtn--back { z-index: 2; }
.hero__mtn--front { z-index: 4; }

/* Tower centered, standing on the second (mid) ridge; front range covers its base. */
.hero__tower {
  position: absolute;
  z-index: 3;
  left: 50%;
  transform: translateX(-50%);
  bottom: min(30vh, 236px);
  width: 74px;
  height: 156px;
}
@media (max-width: 960px) {
  .hero__tower { bottom: min(27vh, 208px); }
}
.hero__tower .tower {
  position: relative;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.45));
}
.beacon {
  animation: beacon-pulse 2.4s ease-in-out infinite;
}
@keyframes beacon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
/* Concentric rings expanding outward in every direction from the tip. */
.rings {
  position: absolute;
  top: 2px;              /* antenna tip */
  left: 50%;
  width: 0;
  height: 0;
}
.ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  margin: -110px 0 0 -110px;
  border: 2px solid #ff8c42;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.05);
  animation: ring-out 3.6s ease-out infinite;
}
.ring:nth-child(2) { animation-delay: 0.9s; }
.ring:nth-child(3) { animation-delay: 1.8s; }
.ring:nth-child(4) { animation-delay: 2.7s; }
@keyframes ring-out {
  0% { opacity: 0.55; transform: scale(0.05); }
  70% { opacity: 0.12; }
  100% { opacity: 0; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ring { animation: none; opacity: 0.18; transform: scale(0.5); }
  .ring:nth-child(3), .ring:nth-child(4) { display: none; }
  .beacon { animation: none; }
}
.hero__content {
  width: 100%;
}
.hero__sticker {
  width: min(360px, 78%);
  height: auto;
  border-radius: 24px;
  transform: rotate(-4deg);
  box-shadow:
    0 0 0 6px rgba(255, 255, 255, 0.9),
    0 24px 60px -18px rgba(0, 0, 0, 0.7);
  animation: sticker-float 6s ease-in-out infinite;
}
@keyframes sticker-float {
  0%,
  100% {
    transform: rotate(-4deg) translateY(0);
  }
  50% {
    transform: rotate(-2deg) translateY(-12px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__sticker {
    animation: none;
  }
}
.hero__title {
  font-family: 'Anton', 'Archivo', system-ui, sans-serif;
  font-weight: 400;
  font-size: clamp(3rem, 9vw, 6rem);
  line-height: 0.9;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  color: #fff;
}
/* Deliberate round accent "period" after the headline. */
.hero__dot {
  display: inline-block;
  width: 0.14em;
  height: 0.14em;
  border-radius: 50%;
  background: rgb(var(--v-theme-secondary));
  margin-left: 0.06em;
  vertical-align: baseline;
}
.partner-logo {
  filter: grayscale(0.2);
  opacity: 0.9;
  transition: filter 0.3s, opacity 0.3s, transform 0.3s;
  border-radius: 8px;
}
.partner-logo:hover {
  filter: none;
  opacity: 1;
  transform: translateY(-2px);
}
</style>
