<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { usePlayerStore } from '~/stores/player'
import { station } from '~/data/site'
import { nowNext, type NowNext } from '~/utils/schedule'
import NowPlayingBars from './NowPlayingBars.vue'

const player = usePlayerStore()

// Now / next show — computed on the client (Mountain Time) and refreshed.
const sched = ref<NowNext | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const update = () => (sched.value = nowNext())
  update()
  timer = setInterval(update, 60_000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
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

          <!-- Live indicator + current show -->
          <div class="flex-grow-1 overflow-hidden">
            <div class="d-flex align-center ga-2">
              <NowPlayingBars :active="player.isPlaying" />
              <span class="text-body-2 font-weight-bold text-truncate">
                {{ sched?.current.title ?? station.name }}
              </span>
              <v-chip
                v-if="player.isPlaying"
                size="x-small"
                color="error"
                variant="flat"
                class="font-weight-bold flex-shrink-0"
              >
                LIVE
              </v-chip>
            </div>
            <div
              class="text-caption text-truncate"
              :class="player.error ? 'text-error' : 'text-medium-emphasis'"
            >
              <template v-if="player.error">{{ player.error }}</template>
              <template v-else-if="player.isLoading">Connecting…</template>
              <template v-else-if="sched?.current.host">
                {{ sched.current.live ? 'Now playing' : 'On air' }} · {{ sched.current.host }}
              </template>
              <template v-else>Way High Radio — live</template>
            </div>
          </div>

          <!-- Up next (desktop only) -->
          <div v-if="sched?.next" class="upnext d-none d-md-block flex-shrink-0">
            <div class="text-overline text-medium-emphasis" style="line-height: 1">Up next</div>
            <div class="text-caption font-weight-bold text-truncate" style="max-width: 200px">
              {{ sched.next.title }}
            </div>
            <div class="text-caption text-medium-emphasis" style="line-height: 1">
              {{ sched.next.start }}
            </div>
          </div>

          <v-divider v-if="sched?.next" vertical class="d-none d-md-block mx-1" style="height: 34px" />

          <!-- Volume (desktop) -->
          <div class="d-none d-sm-flex align-center ga-1 flex-shrink-0" style="width: 150px">
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
        </div>
      </v-container>
    </v-sheet>
  </v-footer>
</template>
