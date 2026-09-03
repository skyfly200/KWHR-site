<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'

// PLACEHOLDER — replace with the station's real DJ / community guidelines.
const sections = [
  {
    title: 'On-air conduct',
    body: 'Keep it FCC-clean. No indecent or profane content during broadcast hours. Respect your fellow DJs and the community.',
  },
  {
    title: 'Booking a show',
    body: 'New volunteers are welcome. Reach out via the Contact page to find an open slot and get oriented on the equipment.',
  },
  {
    title: 'Music & content',
    body: 'Free-form is encouraged — bring what you love. Please credit artists and keep a log of what you play.',
  },
  {
    title: 'Equipment care',
    body: 'Leave the studio the way you found it. Report any technical issues so the next DJ has a smooth start.',
  },
]
</script>

<template>
  <PageHeader
    title="Guidelines"
    icon="mdi-book-open-variant"
    subtitle="A few ground rules that keep Way High Radio welcoming, legal, and fun for everyone."
  />

  <v-container style="max-width: 900px" class="pb-12">
    <v-alert type="info" variant="tonal" density="comfortable" class="mb-6">
      PLACEHOLDER content — replace with the station's official guidelines.
    </v-alert>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="s in sections" :key="s.title" :title="s.title" :text="s.body" />
    </v-expansion-panels>
  </v-container>
</template>
