<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../data/site'

const route = useRoute()
const post = computed(() => posts.find((p) => p.slug === route.params.slug))
</script>

<template>
  <v-container style="max-width: 760px" class="py-10">
    <v-btn variant="text" to="/forward" prepend-icon="mdi-arrow-left" class="mb-4">Forward</v-btn>

    <template v-if="post">
      <div class="text-overline text-medium-emphasis">
        {{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
      </div>
      <h1 class="text-h4 font-weight-bold mb-4">{{ post.title }}</h1>
      <p class="text-body-1 mb-4">{{ post.excerpt }}</p>
      <v-alert type="info" variant="tonal" density="comfortable">
        PLACEHOLDER — add the full post body here (from the station's Forward blog).
      </v-alert>
    </template>

    <v-empty-state
      v-else
      icon="mdi-file-question-outline"
      title="Post not found"
      text="We couldn't find that story."
    >
      <template #actions>
        <v-btn color="primary" to="/forward">Back to Forward</v-btn>
      </template>
    </v-empty-state>
  </v-container>
</template>
