<script setup lang="ts">
import { station } from '../data/site'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <PageHeader
    title="Broadcast Schedule"
    icon="mdi-calendar-clock"
    subtitle="This week on Way High Radio. All times are Mountain Time (America/Denver)."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-card rounded="xl" class="overflow-hidden">
      <div class="cal-wrap">
        <iframe
          :src="station.scheduleCalendarSrc"
          title="Way High Radio broadcast schedule"
          style="border: 0"
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          loading="lazy"
        />
      </div>
    </v-card>

    <p class="text-caption text-medium-emphasis mt-3">
      Schedule not loading? View it directly on
      <a :href="station.scheduleCalendarSrc" target="_blank" rel="noopener" class="text-primary">
        Google Calendar</a
      >.
    </p>
  </v-container>
</template>

<style scoped>
/* Keep the embedded calendar readable in dark mode (Google's embed is light). */
.cal-wrap {
  background: #fff;
}
</style>
