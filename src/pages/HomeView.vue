<script setup lang="ts">
import { usePlayerStore } from '../stores/player'
import { station, djs, posts, media, partners } from '../data/site'
import { avatarColor, initials } from '../utils/avatar'
import NowPlayingBars from '../components/NowPlayingBars.vue'

const player = usePlayerStore()
const featuredDjs = djs.filter((d) => !d.alumni).slice(0, 6)
const latest = posts.slice(0, 2)

const features = [
  { icon: 'mdi-account-group', title: 'Volunteer-powered', text: 'Programmed and run by neighbors, not algorithms.', color: 'primary' },
  { icon: 'mdi-cancel', title: 'Commercial-free', text: 'No ads, ever. Listener-supported radio.', color: 'secondary' },
  { icon: 'mdi-tune-vertical', title: 'Free-form', text: 'Shows you will not hear anywhere else on the dial.', color: 'accent' },
]

</script>

<template>
  <!-- Hero: fully vector mountain scene — crisp at any size, no photo -->
  <section class="hero">
    <div class="hero__sun" />
    <!-- Layered mountain ranges for depth -->
    <svg class="hero__scene" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <!-- far range -->
      <path d="M0 420 L0 250 L240 150 L470 250 L680 120 L920 260 L1140 160 L1440 240 L1440 420 Z" fill="#123a2c" opacity="0.7" />
      <!-- mid range -->
      <path d="M0 420 L0 300 L200 210 L430 320 L640 200 L900 330 L1160 230 L1440 310 L1440 420 Z" fill="#0d2a20" />
      <!-- near range -->
      <path d="M0 420 L0 350 L260 280 L520 370 L760 270 L1020 380 L1280 300 L1440 360 L1440 420 Z" fill="#08160f" />
      <!-- broadcast tower -->
      <g stroke="#41cd91" stroke-width="3" fill="none" opacity="0.9">
        <path d="M760 270 L748 360 M760 270 L772 360 M752 320 L768 320 M750 340 L770 340" />
      </g>
      <circle cx="760" cy="262" r="5" fill="#ff8c42" />
      <!-- radio waves off the tower -->
      <g stroke="#ff8c42" fill="none" opacity="0.55">
        <path class="wave wave1" d="M744 262 a24 24 0 0 1 32 0" />
        <path class="wave wave2" d="M732 262 a40 40 0 0 1 56 0" />
        <path class="wave wave3" d="M720 262 a56 56 0 0 1 80 0" />
      </g>
    </svg>

    <v-container style="max-width: 1200px" class="hero__content py-16">
      <v-chip color="error" variant="flat" size="small" class="mb-4 font-weight-bold px-3">
        <NowPlayingBars :active="true" />
        <span class="ml-2">ON AIR · {{ station.callsign }}</span>
      </v-chip>
      <h1 class="hero__title mb-4">
        We’re taking radio <span class="grad-text">higher</span>.
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
        <v-btn
          size="x-large"
          color="primary"
          variant="flat"
          :prepend-icon="player.isPlaying ? 'mdi-pause' : 'mdi-play'"
          @click="player.toggle()"
        >
          {{ player.isPlaying ? 'Pause stream' : 'Listen live' }}
        </v-btn>
        <v-btn size="x-large" variant="outlined" color="white" to="/schedule" prepend-icon="mdi-calendar-clock">
          Schedule
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
          <h2 class="text-h4 font-weight-bold section-title">From the blog</h2>
          <v-btn variant="text" color="primary" to="/forward" append-icon="mdi-arrow-right">Read Forward</v-btn>
        </div>
        <v-card
          v-for="post in latest"
          :key="post.slug"
          :to="`/forward/${post.slug}`"
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
      <v-btn size="x-large" color="white" variant="flat" :href="station.donateUrl" prepend-icon="mdi-hand-heart">
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
  /* Deep dawn sky gradient — crisp at any size. */
  background: linear-gradient(180deg, #06131f 0%, #0a2130 45%, #0f3a2c 100%);
}
/* Soft rising sun glow behind the peaks. */
.hero__sun {
  position: absolute;
  z-index: -2;
  left: 50%;
  bottom: 8%;
  width: 520px;
  height: 520px;
  transform: translateX(-30%);
  background: radial-gradient(circle, rgba(255, 176, 102, 0.5) 0%, rgba(255, 140, 66, 0.18) 35%, transparent 68%);
  filter: blur(4px);
}
.hero__scene {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: min(52vh, 440px);
  z-index: -1;
}
.hero__content {
  width: 100%;
}
.hero__title {
  font-size: clamp(2.75rem, 8vw, 5.25rem);
  font-weight: 800;
  line-height: 0.98;
  color: #fff;
}
/* Radio waves pulsing off the tower. */
.wave {
  transform-origin: 760px 262px;
  animation: wave-pulse 3s ease-out infinite;
  opacity: 0;
}
.wave2 {
  animation-delay: 1s;
}
.wave3 {
  animation-delay: 2s;
}
@keyframes wave-pulse {
  0% {
    opacity: 0.7;
    transform: scale(0.6);
  }
  70% {
    opacity: 0.15;
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}
@media (prefers-reduced-motion: reduce) {
  .wave {
    animation: none;
    opacity: 0.4;
  }
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
