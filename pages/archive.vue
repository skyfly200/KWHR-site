<script setup lang="ts">
import { archives } from '~/data/site'
import PageHeader from '~/components/PageHeader.vue'

useHead({ title: 'Archive — Way High Radio' })
</script>

<template>
  <PageHeader
    title="Way High Archives"
    icon="mdi-archive-music"
    subtitle="Recordings of shows, interviews and events — hosted on the Internet Archive. Click any recording to listen."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-row>
      <v-col v-for="rec in archives" :key="rec.url" cols="12" sm="6" md="4">
        <v-card
          :href="rec.url"
          target="_blank"
          rel="noopener"
          class="pa-5 h-100 d-flex align-center ga-4 lift"
          rounded="xl"
        >
          <v-avatar color="primary" variant="tonal" size="48">
            <v-icon :icon="rec.icon" />
          </v-avatar>
          <div class="flex-grow-1">
            <div class="text-body-1 font-weight-bold" style="line-height: 1.25">{{ rec.title }}</div>
            <div class="text-caption text-medium-emphasis">
              <v-icon icon="mdi-play-circle-outline" size="14" /> Listen on archive.org
            </div>
          </div>
          <v-icon icon="mdi-open-in-new" size="18" class="text-medium-emphasis" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
