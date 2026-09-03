<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '../stores/player'
import { station } from '../data/site'
import NowPlayingBars from './NowPlayingBars.vue'

const player = usePlayerStore()

const statusText = computed(() => {
  if (player.error) return player.error
  if (player.isLoading) return 'Connecting…'
  if (player.isPlaying) return 'On air — live now'
  return 'Tap play to listen live'
})

const volIcon = computed(() => {
  if (player.muted || player.volume === 0) return 'mdi-volume-off'
  if (player.volume < 0.5) return 'mdi-volume-medium'
  return 'mdi-volume-high'
})
</script>

<template>
  <v-footer app class="pa-0" style="z-index: 1006">
    <v-sheet width="100%" color="surface-bright" class="border-t">
      <v-container class="py-2 py-sm-3" style="max-width: 1200px">
        <div class="d-flex align-center ga-3">
          <!-- Play / pause -->
          <v-btn
            :icon="player.isPlaying || player.isLoading ? 'mdi-pause' : 'mdi-play'"
            color="primary"
            size="large"
            :loading="player.isLoading"
            :aria-label="player.isPlaying ? 'Pause stream' : 'Play stream'"
            @click="player.toggle()"
          />

          <!-- Live indicator + status -->
          <div class="flex-grow-1 overflow-hidden">
            <div class="d-flex align-center ga-2">
              <NowPlayingBars :active="player.isPlaying" />
              <span class="text-body-2 font-weight-bold text-truncate">
                {{ station.name }}
              </span>
              <v-chip
                v-if="player.isPlaying"
                size="x-small"
                color="error"
                variant="flat"
                class="font-weight-bold"
              >
                LIVE
              </v-chip>
            </div>
            <div
              class="text-caption text-truncate"
              :class="player.error ? 'text-error' : 'text-medium-emphasis'"
            >
              {{ statusText }}
            </div>
          </div>

          <!-- Volume (desktop) -->
          <div class="d-none d-sm-flex align-center ga-1" style="width: 160px">
            <v-btn
              :icon="volIcon"
              variant="text"
              size="small"
              aria-label="Mute"
              @click="player.toggleMute()"
            />
            <v-slider
              :model-value="player.muted ? 0 : player.volume"
              :max="1"
              :step="0.01"
              hide-details
              density="compact"
              color="primary"
              track-size="3"
              thumb-size="12"
              aria-label="Volume"
              @update:model-value="player.setVolume($event)"
            />
          </div>

          <v-btn
            variant="tonal"
            color="primary"
            to="/listen"
            class="d-none d-md-inline-flex"
            append-icon="mdi-open-in-new"
          >
            Listen page
          </v-btn>
        </div>
      </v-container>
    </v-sheet>
  </v-footer>
</template>
