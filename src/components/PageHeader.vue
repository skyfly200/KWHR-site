<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; icon?: string }>()
</script>

<template>
  <v-container style="max-width: 1200px" class="pt-10 pb-4">
    <div class="d-flex align-center ga-3 mb-2">
      <v-avatar v-if="icon" color="primary" size="44" variant="tonal">
        <v-icon :icon="icon" />
      </v-avatar>
      <h1 class="text-h4 text-md-h3 font-weight-bold">{{ title }}</h1>
    </div>
    <p v-if="subtitle" class="text-body-1 text-medium-emphasis" style="max-width: 60ch">
      {{ subtitle }}
    </p>
  </v-container>
</template>
