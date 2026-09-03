<script setup lang="ts">
import { posts } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
</script>

<template>
  <PageHeader
    title="Forward"
    icon="mdi-newspaper-variant-outline"
    subtitle="News, stories and dispatches from Way High Radio and the community around it."
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-row>
      <v-col v-for="post in sorted" :key="post.slug" cols="12">
        <v-card :to="`/forward/${post.slug}`" class="pa-6" hover rounded="xl">
          <div class="text-overline text-medium-emphasis">
            {{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
          </div>
          <div class="text-h5 font-weight-bold mb-2">{{ post.title }}</div>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ post.excerpt }}</p>
          <v-btn variant="text" color="primary" class="mt-3 px-0" append-icon="mdi-arrow-right">
            Read more
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
