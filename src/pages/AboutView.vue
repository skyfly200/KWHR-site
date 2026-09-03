<script setup lang="ts">
import { station, aboutHistory, media } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const stats = [
  { value: `Since ${station.founded}`, label: 'On the air' },
  { value: '100% volunteer', label: 'Nobody gets paid' },
  { value: 'Commercial-free', label: 'Listener-supported' },
]
</script>

<template>
  <PageHeader
    title="About Way High Radio"
    icon="mdi-information-outline"
    :image="media.heroWide"
    :subtitle="station.subtagline + ' ' + station.tagline"
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-row class="mb-2">
      <v-col v-for="s in stats" :key="s.label" cols="12" sm="4">
        <v-card variant="tonal" color="primary" class="pa-5 text-center h-100" rounded="xl">
          <div class="text-h6 font-weight-bold">{{ s.value }}</div>
          <div class="text-caption text-medium-emphasis">{{ s.label }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="pa-6 pa-md-8 mt-2" rounded="xl">
      <h2 class="text-h5 font-weight-bold mb-4">Everything you wanted to know</h2>
      <p v-for="(para, i) in aboutHistory" :key="i" class="text-body-1 mb-4">
        {{ para }}
      </p>
    </v-card>

    <v-card class="pa-6 mt-4 d-flex flex-column flex-sm-row align-sm-center ga-4" color="surface-bright" rounded="xl">
      <v-icon icon="mdi-radio-tower" color="primary" size="40" />
      <div class="flex-grow-1">
        <div class="text-body-1 font-weight-bold">{{ station.network.name }}</div>
        <div class="text-body-2 text-medium-emphasis">{{ station.network.blurb }}</div>
      </div>
      <v-btn :href="station.network.url" target="_blank" rel="noopener" variant="tonal" color="primary" append-icon="mdi-open-in-new">
        Learn more
      </v-btn>
    </v-card>
  </v-container>
</template>
