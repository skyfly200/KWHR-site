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

const tickerWords = [
  '📻 Pure Community Radio',
  '⛰️ Broadcasting from Ward, CO since 1997',
  '🎶 Radio for the people, by the people',
  '🔥 Longest-running pirate station in the Rockies',
  '💚 Listener-supported & commercial-free',
]
</script>

<template>
  <!-- Hero with real mountain photo -->
  <section class="hero">
    <div class="hero__bg" :style="{ backgroundImage: `url(${media.heroWide})` }" />
    <div class="hero__scrim" />
    <v-container style="max-width: 1200px" class="hero__content py-16">
      <v-chip color="error" variant="flat" size="small" class="mb-4 font-weight-bold px-3">
        <NowPlayingBars :active="true" />
        <span class="ml-2">ON AIR · {{ station.callsign }}</span>
      </v-chip>
      <h1 class="hero__title mb-3">
        <span class="grad-text">Way High</span> Radio
      </h1>
      <p class="text-h6 font-weight-medium mb-2" style="color: #f1f5f9">
        {{ station.tagline }} <span class="text-medium-emphasis">{{ station.subtagline }}</span>
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

  <!-- ON AIR ticker -->
  <div class="ticker py-2 text-body-2 font-weight-bold" style="background: rgb(var(--v-theme-secondary)); color: #1a1005">
    <span class="ticker__track">
      <span v-for="n in 2" :key="n">
        <span v-for="w in tickerWords" :key="w" class="mx-6">{{ w }}</span>
      </span>
    </span>
  </div>

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
  min-height: 78vh;
  display: flex;
  align-items: center;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}
.hero__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    100deg,
    rgba(6, 12, 22, 0.92) 0%,
    rgba(6, 12, 22, 0.72) 45%,
    rgba(6, 12, 22, 0.4) 100%
  );
}
.hero__content {
  width: 100%;
}
.hero__title {
  font-size: clamp(2.75rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  color: #fff;
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
