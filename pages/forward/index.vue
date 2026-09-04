<script setup lang="ts">
import PageHeader from '~/components/PageHeader.vue'

useHead({ title: 'Forward — Way High Radio' })

// Pull all blog posts (newest first) from the markdown content.
const { data: posts } = await useAsyncData('forward-list', () =>
  queryContent('/forward').sort({ date: -1 }).find(),
)

function fmtDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <PageHeader
    title="Forward"
    icon="mdi-newspaper-variant-outline"
    subtitle="News, stories and dispatches from Way High Radio and the community around it."
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-row>
      <v-col v-for="post in posts" :key="post._path" cols="12">
        <v-card :to="post._path" class="pa-6 lift" rounded="xl">
          <div class="text-overline text-secondary font-weight-bold">
            {{ fmtDate(post.date) }}
          </div>
          <div class="text-h5 font-weight-bold mb-2">{{ post.title }}</div>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ post.excerpt }}</p>
          <v-btn variant="text" color="primary" class="mt-3 px-0" append-icon="mdi-arrow-right">
            Read more
          </v-btn>
        </v-card>
      </v-col>
      <v-col v-if="!posts || !posts.length" cols="12">
        <v-card class="pa-6" rounded="xl">
          <p class="text-body-1 text-medium-emphasis mb-0">
            No posts yet — check back soon.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
