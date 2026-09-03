<script setup lang="ts">
import { usePlayerStore } from '../stores/player'
import { station, listenHelp } from '../data/site'
import PageHeader from '../components/PageHeader.vue'
import NowPlayingBars from '../components/NowPlayingBars.vue'

const player = usePlayerStore()
</script>

<template>
  <PageHeader
    title="Tune In"
    icon="mdi-headphones"
    subtitle="Stream Way High Radio anywhere. Press play and keep exploring — the audio stays with you as you browse the whole site."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-row>
      <v-col cols="12" md="7">
        <v-card class="pa-8 text-center" color="surface-bright" rounded="xl">
          <NowPlayingBars :active="player.isPlaying" />
          <div class="text-h5 font-weight-bold mt-4">{{ station.name }}</div>
          <div class="text-body-2 text-medium-emphasis mb-6">
            {{ player.isPlaying ? 'On air — live now' : player.isLoading ? 'Connecting…' : 'Click below to listen' }}
          </div>
          <v-btn
            :icon="player.isPlaying || player.isLoading ? 'mdi-pause' : 'mdi-play'"
            size="x-large"
            color="primary"
            :loading="player.isLoading"
            class="mb-4"
            :aria-label="player.isPlaying ? 'Pause' : 'Play'"
            @click="player.toggle()"
          />
          <v-alert
            v-if="player.error"
            type="warning"
            variant="tonal"
            density="compact"
            class="text-left mt-2"
          >
            {{ player.error }}
          </v-alert>
        </v-card>

        <!-- Stream troubleshooting (from the original site) -->
        <v-card class="pa-6 mt-4" rounded="xl">
          <div class="text-overline text-medium-emphasis mb-2">Stream troubleshooting</div>
          <div v-for="tip in listenHelp" :key="tip.title" class="mb-3">
            <div class="text-body-1 font-weight-bold">{{ tip.title }}</div>
            <div class="text-body-2 text-medium-emphasis">{{ tip.body }}</div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-6 h-100" rounded="xl">
          <div class="text-overline text-medium-emphasis mb-2">Ways to tune in</div>
          <v-list class="bg-transparent" lines="two">
            <v-list-item prepend-icon="mdi-antenna" title="Over the air">
              <template #subtitle>
                <span v-for="(f, i) in station.frequencies" :key="f.freq">
                  {{ f.freq }} ({{ f.city }}){{ i < station.frequencies.length - 1 ? ' · ' : '' }}
                </span>
              </template>
            </v-list-item>
            <v-list-item
              prepend-icon="mdi-web"
              title="Online"
              subtitle="Stream right here, on every page of the site."
            />
            <v-list-item
              prepend-icon="mdi-radio"
              title="Across the CCRN"
              subtitle="Simulcast on partner stations in the Boulder Valley."
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
