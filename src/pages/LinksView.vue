<script setup lang="ts">
import { links } from '../data/site'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader
    title="Links"
    icon="mdi-link-variant"
    subtitle="Friends of the station and corners of the community worth a visit."
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-alert type="info" variant="tonal" density="comfortable" class="mb-6">
      PLACEHOLDER links — replace with the real community links.
    </v-alert>
    <v-row>
      <v-col v-for="link in links" :key="link.label" cols="12" sm="6">
        <v-card
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="pa-5 d-flex align-center ga-3"
          hover
          rounded="xl"
        >
          <v-icon icon="mdi-open-in-new" color="primary" />
          <div>
            <div class="text-body-1 font-weight-bold">{{ link.label }}</div>
            <div v-if="link.note" class="text-caption text-medium-emphasis">{{ link.note }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
