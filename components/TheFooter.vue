<script setup lang="ts">
import { navItems, station } from '~/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16">
    <v-divider />
    <v-container class="py-10" style="max-width: 1200px">
      <v-row>
        <v-col cols="12" md="5">
          <div class="d-flex align-center mb-3">
            <v-avatar color="primary" size="36" class="mr-3">
              <v-icon icon="mdi-radio-tower" color="white" />
            </v-avatar>
            <span class="text-h6 font-weight-bold">{{ station.name }}</span>
          </div>
          <p class="text-body-2 text-medium-emphasis" style="max-width: 42ch">
            {{ station.about }}
          </p>
          <div class="d-flex ga-2 mt-4">
            <v-btn
              v-if="station.social.facebook"
              :href="station.social.facebook"
              target="_blank"
              rel="noopener"
              icon="mdi-facebook"
              variant="text"
              aria-label="Facebook"
            />
            <v-btn
              :href="station.social.email"
              icon="mdi-email-outline"
              variant="text"
              aria-label="Email"
            />
          </div>
        </v-col>

        <v-col cols="6" md="3">
          <div class="text-overline text-medium-emphasis mb-2">Explore</div>
          <div class="d-flex flex-column ga-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-body-2 text-decoration-none footer-link"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </v-col>

        <v-col cols="6" md="4">
          <div class="text-overline text-medium-emphasis mb-2">On the dial</div>
          <div v-for="f in station.frequencies" :key="f.freq" class="text-body-2 mb-1">
            <v-icon icon="mdi-antenna" size="16" class="mr-1 text-primary" />
            <strong>{{ f.freq }}</strong> — {{ f.city }}
          </div>
          <v-btn color="secondary" variant="flat" class="mt-3" :href="station.donateUrl" prepend-icon="mdi-heart">
            Support the station
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-6" />
      <div class="d-flex flex-wrap justify-space-between text-caption text-medium-emphasis ga-2">
        <span>© {{ year }} {{ station.name }} ({{ station.callsign }}). Commercial-free & listener-supported.</span>
        <span>Built with Vue &amp; Vuetify.</span>
      </div>
    </v-container>
  </footer>
</template>

<style scoped>
.footer-link {
  color: rgba(var(--v-theme-on-surface), 0.75);
  transition: color 0.15s ease;
}
.footer-link:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
