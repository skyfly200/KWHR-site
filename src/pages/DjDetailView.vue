<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { djs } from '../data/site'

const route = useRoute()
const dj = computed(() => djs.find((d) => d.slug === route.params.slug))
</script>

<template>
  <v-container style="max-width: 900px" class="py-10">
    <v-btn variant="text" to="/djs" prepend-icon="mdi-arrow-left" class="mb-4">All DJs</v-btn>

    <template v-if="dj">
      <div class="d-flex align-center ga-4 mb-6">
        <v-avatar color="secondary" size="88">
          <span class="text-h4 font-weight-bold">{{ dj.name.charAt(0) }}</span>
        </v-avatar>
        <div>
          <h1 class="text-h4 font-weight-bold">{{ dj.name }}</h1>
          <div class="d-flex flex-wrap ga-1 mt-2">
            <v-chip v-for="show in dj.shows" :key="show" size="small" variant="tonal" color="primary">
              {{ show }}
            </v-chip>
          </div>
        </div>
      </div>
      <v-card class="pa-6" rounded="xl">
        <p class="text-body-1">{{ dj.bio }}</p>
      </v-card>
    </template>

    <v-empty-state
      v-else
      icon="mdi-account-question"
      title="DJ not found"
      text="We couldn't find that DJ."
    >
      <template #actions>
        <v-btn color="primary" to="/djs">Back to DJs</v-btn>
      </template>
    </v-empty-state>
  </v-container>
</template>
