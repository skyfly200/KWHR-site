<script setup lang="ts">
import { djs } from '../data/site'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader
    title="Our DJs"
    icon="mdi-account-music"
    subtitle="The volunteers behind the microphone. Every show is programmed by a neighbor who loves the music."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-row>
      <v-col v-for="dj in djs" :key="dj.slug" cols="12" sm="6" md="4">
        <v-card :to="`/djs/${dj.slug}`" class="pa-6 h-100" hover rounded="xl">
          <v-avatar color="secondary" size="64" class="mb-4">
            <span class="text-h5 font-weight-bold">{{ dj.name.charAt(0) }}</span>
          </v-avatar>
          <div class="text-h6 font-weight-bold">{{ dj.name }}</div>
          <div class="d-flex flex-wrap ga-1 mt-2">
            <v-chip v-for="show in dj.shows" :key="show" size="x-small" variant="tonal" color="primary">
              {{ show }}
            </v-chip>
          </div>
          <p class="text-body-2 text-medium-emphasis mt-3">{{ dj.bio }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
