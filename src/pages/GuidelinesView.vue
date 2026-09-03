<script setup lang="ts">
import { guidelines } from '../data/site'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader
    title="Guidelines"
    icon="mdi-book-open-variant"
    subtitle="A set of guidelines drawn from lessons in this ongoing experiment in community radio."
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-expansion-panels variant="accordion" multiple>
      <v-expansion-panel
        v-for="g in guidelines"
        :key="g.title"
        :title="g.title"
        :text="g.body"
      />
    </v-expansion-panels>

    <v-alert type="info" variant="tonal" class="mt-6" density="comfortable">
      Interested in becoming a DJ? New members receive the full guidelines and an
      orientation on the equipment. Reach out from the
      <router-link to="/contact" class="text-primary">Contact</router-link> page.
    </v-alert>
  </v-container>
</template>
