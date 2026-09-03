<script setup lang="ts">
import { usePlayerStore } from '../stores/player'
import { station, djs, posts } from '../data/site'

const player = usePlayerStore()
const featuredDjs = djs.slice(0, 3)
const latest = posts.slice(0, 2)

const features = [
  { icon: 'mdi-account-group', title: 'Volunteer-powered', text: 'Programmed and run by neighbors, not algorithms.' },
  { icon: 'mdi-cancel', title: 'Commercial-free', text: 'No ads, ever. Listener-supported radio.' },
  { icon: 'mdi-tune-vertical', title: 'Free-form', text: 'Shows you will not hear anywhere else on the dial.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <v-container style="max-width: 1200px" class="py-16 py-md-16">
      <v-row align="center">
        <v-col cols="12" md="7">
          <v-chip color="primary" variant="flat" size="small" class="mb-4 font-weight-bold">
            <v-icon start icon="mdi-broadcast" /> {{ station.callsign }} · Live from the mountains
          </v-chip>
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
            {{ station.name }}
          </h1>
          <p class="text-h6 font-weight-regular text-medium-emphasis mb-2">
            {{ station.tagline }}
          </p>
          <p class="text-body-1 text-medium-emphasis mb-6" style="max-width: 52ch">
            {{ station.about }}
          </p>

          <div class="d-flex flex-wrap ga-3">
            <v-btn
              size="large"
              color="primary"
              variant="flat"
              :prepend-icon="player.isPlaying ? 'mdi-pause' : 'mdi-play'"
              @click="player.toggle()"
            >
              {{ player.isPlaying ? 'Pause stream' : 'Listen live' }}
            </v-btn>
            <v-btn size="large" variant="outlined" to="/schedule" prepend-icon="mdi-calendar-clock">
              See the schedule
            </v-btn>
          </div>

          <div class="d-flex flex-wrap ga-4 mt-8">
            <div v-for="f in station.frequencies" :key="f.freq" class="d-flex align-center">
              <v-icon icon="mdi-antenna" color="primary" class="mr-2" />
              <div>
                <div class="text-body-1 font-weight-bold">{{ f.freq }}</div>
                <div class="text-caption text-medium-emphasis">{{ f.city }}</div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="5" class="d-none d-md-block">
          <v-card class="pa-8 text-center" color="surface-bright" elevation="0" rounded="xl">
            <v-avatar color="primary" size="120" class="mb-4">
              <v-icon icon="mdi-radio-tower" size="64" color="white" />
            </v-avatar>
            <div class="text-h6 font-weight-bold">Streaming 24/7</div>
            <p class="text-body-2 text-medium-emphasis mt-2">
              Press play and keep browsing — the stream follows you across every page.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Features -->
  <v-container style="max-width: 1200px" class="py-8">
    <v-row>
      <v-col v-for="f in features" :key="f.title" cols="12" md="4">
        <v-card variant="tonal" class="pa-6 h-100" color="primary">
          <v-icon :icon="f.icon" size="32" class="mb-3" />
          <div class="text-h6 font-weight-bold mb-1">{{ f.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ f.text }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Featured DJs -->
  <v-container style="max-width: 1200px" class="py-8">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h4 font-weight-bold">Meet the DJs</h2>
      <v-btn variant="text" to="/djs" append-icon="mdi-arrow-right">All DJs</v-btn>
    </div>
    <v-row>
      <v-col v-for="dj in featuredDjs" :key="dj.slug" cols="12" sm="6" md="4">
        <v-card :to="`/djs/${dj.slug}`" class="pa-6 h-100" hover>
          <v-avatar color="secondary" size="56" class="mb-3">
            <span class="text-h6 font-weight-bold">{{ dj.name.charAt(0) }}</span>
          </v-avatar>
          <div class="text-h6 font-weight-bold">{{ dj.name }}</div>
          <div class="text-body-2 text-medium-emphasis mt-1">
            {{ dj.shows.length ? dj.shows.join(' · ') : dj.bio }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Latest from Forward -->
  <v-container style="max-width: 1200px" class="py-8">
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h4 font-weight-bold">From the blog</h2>
      <v-btn variant="text" to="/forward" append-icon="mdi-arrow-right">Read Forward</v-btn>
    </div>
    <v-row>
      <v-col v-for="post in latest" :key="post.slug" cols="12" md="6">
        <v-card :to="`/forward/${post.slug}`" class="pa-6 h-100" hover>
          <div class="text-overline text-medium-emphasis">
            {{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
          </div>
          <div class="text-h6 font-weight-bold mb-2">{{ post.title }}</div>
          <div class="text-body-2 text-medium-emphasis">{{ post.excerpt }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Support CTA -->
  <v-container style="max-width: 1200px" class="py-8">
    <v-card color="primary" variant="flat" class="pa-8 pa-md-12 text-center" rounded="xl">
      <v-icon icon="mdi-heart" size="40" class="mb-3" />
      <h2 class="text-h4 font-weight-bold mb-2">Keep community radio on the air</h2>
      <p class="text-body-1 mb-6 mx-auto" style="max-width: 48ch">
        {{ station.name }} is listener-supported and commercial-free. Your donation
        keeps local voices broadcasting across the mountains.
      </p>
      <v-btn size="large" color="white" variant="flat" :href="station.donateUrl" prepend-icon="mdi-hand-heart">
        Support {{ station.callsign }}
      </v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.hero {
  background:
    radial-gradient(1200px 400px at 15% -10%, rgba(var(--v-theme-primary), 0.18), transparent 60%),
    radial-gradient(900px 500px at 90% 0%, rgba(var(--v-theme-secondary), 0.14), transparent 55%);
}
</style>
