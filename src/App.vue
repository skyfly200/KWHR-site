<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import TheAppBar from './components/TheAppBar.vue'
import TheFooter from './components/TheFooter.vue'
import ThePlayerBar from './components/ThePlayerBar.vue'

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
      <!-- Only this region swaps on navigation. The player below never
           unmounts, so the stream keeps playing across every page. -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <TheFooter />
    </v-main>

    <!-- Persistent, app-wide stream player. Lives outside <router-view>. -->
    <ThePlayerBar />
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
