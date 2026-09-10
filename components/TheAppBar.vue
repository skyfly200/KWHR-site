<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'
import { navItems, station, media } from '~/data/site'
import { useUiStore } from '~/stores/ui'

const theme = useTheme()
const ui = useUiStore()
const drawer = ref(false)

function toggleTheme() {
  const next = theme.global.current.value.dark ? 'whrLight' : 'whrDark'
  theme.global.name.value = next
  try {
    localStorage.setItem('whr-theme', next)
  } catch {
    /* ignore */
  }
}

/* Easter egg: hold the theme toggle for 3s to trigger a solar eclipse.
   A quick tap toggles the theme as usual. */
const HOLD_MS = 3000
let holdTimer: ReturnType<typeof setTimeout> | null = null
let held = false
const charging = ref(false)

function holdStart() {
  held = false
  charging.value = true
  holdTimer = setTimeout(() => {
    held = true
    charging.value = false
    ui.triggerEclipse()
  }, HOLD_MS)
}
function holdEnd() {
  charging.value = false
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  if (!held) toggleTheme()
  held = false
}
function holdCancel() {
  charging.value = false
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
  held = false
}
onBeforeUnmount(holdCancel)
</script>

<template>
  <v-app-bar flat height="72" class="border-b" color="surface">
    <v-container class="d-flex align-center py-0" style="max-width: 1200px">
      <!-- Brand -->
      <NuxtLink to="/" class="d-flex align-center text-decoration-none">
        <img :src="media.sticker" alt="Way High Radio" class="brand-logo mr-3" />
        <div class="d-none d-sm-block">
          <div class="text-body-1 font-weight-bold" style="line-height: 1.1">
            {{ station.name }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ station.callsign }} · {{ station.frequencies[0].freq }} · Ward, CO
          </div>
        </div>
      </NuxtLink>

      <v-spacer />

      <!-- Desktop nav -->
      <nav class="d-none d-md-flex align-center ga-1">
        <template v-for="item in navItems" :key="item.label">
          <!-- Dropdown group -->
          <v-menu v-if="item.children" open-on-hover location="bottom start">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="text" size="small" append-icon="mdi-chevron-down">
                {{ item.label }}
              </v-btn>
            </template>
            <v-list density="compact" nav>
              <v-list-item
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                :title="child.label"
                exact-active-class="text-primary"
              />
            </v-list>
          </v-menu>
          <!-- Plain link -->
          <v-btn
            v-else
            :to="item.to"
            variant="text"
            size="small"
            exact-active-class="text-primary"
          >
            {{ item.label }}
          </v-btn>
        </template>
      </nav>

      <!-- Theme toggle (hold 3s for the eclipse) -->
      <v-btn
        :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        class="ml-1 theme-btn"
        :class="{ 'theme-btn--charging': charging }"
        :aria-label="theme.global.current.value.dark ? 'Switch to light mode (hold for a surprise)' : 'Switch to dark mode (hold for a surprise)'"
        @pointerdown="holdStart"
        @pointerup="holdEnd"
        @pointerleave="holdCancel"
        @pointercancel="holdCancel"
      />

      <v-btn
        color="secondary"
        variant="flat"
        to="/donate"
        class="d-none d-sm-inline-flex ml-1"
        prepend-icon="mdi-heart"
      >
        Donate
      </v-btn>

      <!-- Mobile menu button -->
      <v-app-bar-nav-icon
        class="d-md-none ml-1"
        aria-label="Open navigation"
        @click="drawer = true"
      />
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list nav>
      <template v-for="item in navItems" :key="item.label">
        <v-list-item v-if="!item.children" :to="item.to" :title="item.label" exact @click="drawer = false" />
        <template v-else>
          <v-list-subheader>{{ item.label }}</v-list-subheader>
          <v-list-item
            v-for="child in item.children"
            :key="child.to"
            :to="child.to"
            :title="child.label"
            class="ps-6"
            exact
            @click="drawer = false"
          />
        </template>
      </template>
    </v-list>
    <template #append>
      <div class="pa-3">
        <v-btn block color="secondary" to="/donate" prepend-icon="mdi-heart" @click="drawer = false">
          Donate
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.brand-logo {
  height: 44px;
  width: auto;
  max-width: 120px;
  border-radius: 8px;
  object-fit: contain;
  display: block;
}
/* Subtle "charging" cue while holding the theme toggle. */
.theme-btn--charging {
  animation: charge 3s linear forwards;
}
@keyframes charge {
  from { box-shadow: 0 0 0 0 rgba(var(--v-theme-secondary), 0.0); }
  to { box-shadow: 0 0 0 8px rgba(var(--v-theme-secondary), 0.35); }
}
@media (prefers-reduced-motion: reduce) {
  .theme-btn--charging { animation: none; }
}
</style>
