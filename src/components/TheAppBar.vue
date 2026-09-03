<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { navItems, station } from '../data/site'

const theme = useTheme()
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
</script>

<template>
  <v-app-bar flat height="72" class="border-b" color="surface">
    <v-container class="d-flex align-center py-0" style="max-width: 1200px">
      <!-- Brand -->
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-avatar color="primary" size="40" class="mr-3">
          <v-icon icon="mdi-radio-tower" size="24" color="white" />
        </v-avatar>
        <div class="d-none d-sm-block">
          <div class="text-body-1 font-weight-bold" style="line-height: 1.1">
            {{ station.name }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ station.callsign }} · 90.5 &amp; 102.9 FM
          </div>
        </div>
      </router-link>

      <v-spacer />

      <!-- Desktop nav -->
      <nav class="d-none d-md-flex align-center ga-1">
        <v-btn
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          variant="text"
          size="small"
          exact-active-class="text-primary"
        >
          {{ item.label }}
        </v-btn>
      </nav>

      <v-btn
        :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        class="ml-1"
        :aria-label="theme.global.current.value.dark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      />

      <v-btn
        color="primary"
        variant="flat"
        to="/listen"
        class="d-none d-sm-inline-flex ml-1"
        prepend-icon="mdi-play"
      >
        Listen
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
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :title="item.label"
        exact
        @click="drawer = false"
      />
    </v-list>
    <template #append>
      <div class="pa-3">
        <v-btn block color="primary" to="/listen" prepend-icon="mdi-play" @click="drawer = false">
          Listen Live
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
