<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import TheAppBar from '~/components/TheAppBar.vue'
import TheFooter from '~/components/TheFooter.vue'
import ThePlayerBar from '~/components/ThePlayerBar.vue'

const theme = useTheme()

onMounted(() => {
  try {
    const saved = localStorage.getItem('whr-theme')
    if (saved === 'whrLight' || saved === 'whrDark') theme.global.name.value = saved
  } catch {
    /* ignore */
  }
})
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
  </v-app>
</template>
