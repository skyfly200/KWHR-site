<script setup lang="ts">
import { computed } from 'vue'
import { djs } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const active = computed(() => djs.filter((d) => !d.alumni))
const alumni = computed(() => djs.filter((d) => d.alumni))
</script>

<template>
  <PageHeader
    title="Meet Our DJs"
    icon="mdi-account-music"
    subtitle="The volunteers behind the microphone. Every show is programmed by a neighbor who loves the music."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-row>
      <v-col v-for="dj in active" :key="dj.slug" cols="12" sm="6" md="4">
        <v-card :to="`/djs/${dj.slug}`" class="pa-6 h-100" hover rounded="xl">
          <v-avatar color="secondary" size="64" class="mb-4">
            <span class="text-h5 font-weight-bold">{{ dj.name.charAt(0) }}</span>
          </v-avatar>
          <div class="text-h6 font-weight-bold">{{ dj.name }}</div>
          <div v-if="dj.shows.length" class="d-flex flex-wrap ga-1 mt-2">
            <v-chip v-for="show in dj.shows" :key="show" size="x-small" variant="tonal" color="primary">
              {{ show }}
            </v-chip>
          </div>
          <p v-if="dj.bio" class="text-body-2 text-medium-emphasis mt-3 mb-0">{{ dj.bio }}</p>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="alumni.length">
      <h2 class="text-h5 font-weight-bold mt-12 mb-4">Alumni</h2>
      <v-row>
        <v-col v-for="dj in alumni" :key="dj.slug" cols="6" sm="4" md="3">
          <v-card :to="`/djs/${dj.slug}`" class="pa-4 h-100" hover rounded="xl" variant="tonal">
            <div class="text-body-1 font-weight-bold">{{ dj.name }}</div>
            <div v-if="dj.bio" class="text-caption text-medium-emphasis mt-1">{{ dj.bio }}</div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
