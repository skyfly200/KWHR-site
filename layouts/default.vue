<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { usePlayerStore } from '~/stores/player'
import TheAppBar from '~/components/TheAppBar.vue'
import TheFooter from '~/components/TheFooter.vue'
import ThePlayerBar from '~/components/ThePlayerBar.vue'

const theme = useTheme()
const player = usePlayerStore()

// First-load hint pointing to the always-on player bar.
const showHint = ref(false)

onMounted(() => {
  try {
    const saved = localStorage.getItem('whr-theme')
    if (saved === 'whrLight' || saved === 'whrDark') theme.global.name.value = saved
  } catch {
    /* ignore */
  }
  try {
    if (!localStorage.getItem('whr-play-hint')) {
      // Small delay so it lands after the page settles.
      setTimeout(() => (showHint.value = true), 900)
    }
  } catch {
    showHint.value = true
  }
})

function dismissHint() {
  showHint.value = false
  try {
    localStorage.setItem('whr-play-hint', '1')
  } catch {
    /* ignore */
  }
}

function playFromHint() {
  player.play()
  dismissHint()
}
</script>

<template>
  <v-app>
    <TheAppBar />

    <v-main>
      <!-- Page content swaps here; the player below never unmounts, so the
           stream keeps playing across every page. -->
      <slot />
      <TheFooter />
    </v-main>

    <!-- Persistent, app-wide stream player. Lives outside the routed content. -->
    <ThePlayerBar />

    <!-- First-visit hint: the stream plays from the bar at the bottom. -->
    <v-snackbar
      v-model="showHint"
      :timeout="9000"
      location="bottom"
      color="surface-bright"
      class="mb-16"
      rounded="xl"
      @update:model-value="(v: boolean) => { if (!v) dismissHint() }"
    >
      <div class="d-flex align-center ga-3">
        <v-icon icon="mdi-arrow-down-bold" color="primary" />
        <span class="text-body-2">
          <strong>Listen live anytime</strong> — press play in the bar below. It keeps
          streaming as you browse the site.
        </span>
      </div>
      <template #actions>
        <v-btn color="primary" variant="text" @click="playFromHint">Play</v-btn>
        <v-btn icon="mdi-close" variant="text" size="small" aria-label="Dismiss" @click="dismissHint" />
      </template>
    </v-snackbar>
  </v-app>
</template>
