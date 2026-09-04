<script setup lang="ts">
const route = useRoute()
const path = `/forward/${route.params.slug}`

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent(path).findOne(),
)

if (post.value) {
  useHead({ title: `${post.value.title} — Way High Radio` })
}

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
  <v-container style="max-width: 760px" class="py-10">
    <v-btn variant="text" to="/forward" prepend-icon="mdi-arrow-left" class="mb-4">Forward</v-btn>

    <template v-if="post">
      <div class="text-overline text-secondary font-weight-bold">{{ fmtDate(post.date) }}</div>
      <h1 class="text-h4 text-md-h3 font-weight-bold mb-2">{{ post.title }}</h1>
      <div class="text-caption text-medium-emphasis mb-6">by {{ post.author || 'Way High Radio' }}</div>

      <!-- Renders the markdown body with Vuetify-friendly prose styling. -->
      <article class="prose">
        <ContentRenderer :value="post" />
      </article>
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

<style scoped>
.prose :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.75rem 0 0.75rem;
}
.prose :deep(h3) {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem;
}
.prose :deep(p) {
  font-size: 1.05rem;
  line-height: 1.75;
  margin-bottom: 1.1rem;
}
.prose :deep(a) {
  color: rgb(var(--v-theme-primary));
}
.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 1.4rem;
  margin-bottom: 1.1rem;
}
.prose :deep(blockquote) {
  border-left: 4px solid rgb(var(--v-theme-secondary));
  padding-left: 1rem;
  color: rgba(var(--v-theme-on-surface), 0.75);
  font-style: italic;
}
.prose :deep(img) {
  border-radius: 12px;
}
</style>
