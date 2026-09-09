<script setup lang="ts">
import { station, aboutHistory, media, callToAction, lookingBack, fccPolicy } from '~/data/site'
import PageHeader from '~/components/PageHeader.vue'

useHead({ title: 'About — Way High Radio' })

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
      <h2 class="text-h5 font-weight-bold mb-4 section-title">Everything you wanted to know</h2>
      <p v-for="(para, i) in aboutHistory" :key="i" class="text-body-1 mb-4">
        {{ para }}
      </p>
    </v-card>

    <!-- The Call to Action (2010) -->
    <v-card class="pa-6 pa-md-8 mt-4" rounded="xl">
      <h2 class="text-h5 font-weight-bold mb-4 section-title">{{ callToAction.title }}</h2>
      <p v-for="(para, i) in callToAction.paragraphs" :key="i" class="text-body-1 mb-4">
        {{ para }}
      </p>
    </v-card>

    <!-- Looking Back + Holly's reflection -->
    <v-card class="pa-6 pa-md-8 mt-4" rounded="xl">
      <h2 class="text-h5 font-weight-bold mb-4 section-title">{{ lookingBack.title }}</h2>
      <p v-for="(para, i) in lookingBack.paragraphs" :key="i" class="text-body-1 mb-4">
        {{ para }}
      </p>
      <v-sheet color="surface-bright" rounded="lg" class="pa-5 mt-2 border-s-lg" style="border-inline-start: 4px solid rgb(var(--v-theme-secondary))">
        <div class="text-overline text-secondary font-weight-bold mb-2">{{ lookingBack.reflection.by }}</div>
        <p v-for="(para, i) in lookingBack.reflection.paragraphs" :key="i" class="text-body-1 font-italic mb-3">
          {{ para }}
        </p>
      </v-sheet>
    </v-card>

    <!-- FCC Actions & Policy -->
    <v-card class="pa-6 pa-md-8 mt-4" rounded="xl">
      <h2 class="text-h5 font-weight-bold mb-4 section-title">{{ fccPolicy.title }}</h2>
      <p v-for="(para, i) in fccPolicy.paragraphs" :key="i" class="text-body-1 mb-4">
        {{ para }}
      </p>
      <div class="text-overline text-medium-emphasis mb-2">Get informed</div>
      <v-list class="bg-transparent pa-0" density="compact">
        <v-list-item
          v-for="link in fccPolicy.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="px-0"
          prepend-icon="mdi-open-in-new"
          :title="link.label"
        />
      </v-list>
    </v-card>

    <!-- CCRN -->
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
