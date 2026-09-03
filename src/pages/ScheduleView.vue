<script setup lang="ts">
import { computed, ref } from 'vue'
import { schedule } from '../data/site'
import PageHeader from '../components/PageHeader.vue'

const days = Object.keys(schedule)
const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
const selected = ref(days.includes(todayName) ? todayName : days[0])

const slots = computed(() =>
  [...(schedule[selected.value] ?? [])].sort((a, b) => a.start.localeCompare(b.start)),
)

function fmt(t: string) {
  const [h, m] = t.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
</script>

<template>
  <PageHeader
    title="Schedule"
    icon="mdi-calendar-clock"
    subtitle="This week on Way High Radio. All times are Mountain Time."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-alert type="info" variant="tonal" density="comfortable" class="mb-6">
      PLACEHOLDER schedule — swap in the station's real weekly lineup in
      <code>src/data/site.ts</code>.
    </v-alert>

    <v-slide-group v-model="selected" show-arrows class="mb-6" mandatory selected-class="bg-primary">
      <v-slide-group-item
        v-for="day in days"
        :key="day"
        :value="day"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-btn
          class="ma-1"
          :class="selectedClass"
          :variant="isSelected ? 'flat' : 'outlined'"
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
        >
          {{ day }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>

    <v-card rounded="xl">
      <v-list lines="two">
        <template v-for="(slot, i) in slots" :key="slot.start + slot.title">
          <v-list-item>
            <template #prepend>
              <div class="text-body-2 font-weight-bold text-primary mr-4" style="width: 72px">
                {{ fmt(slot.start) }}
              </div>
            </template>
            <v-list-item-title class="font-weight-bold">{{ slot.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="slot.host">with {{ slot.host }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider v-if="i < slots.length - 1" />
        </template>
        <v-list-item v-if="!slots.length" title="No shows listed for this day yet." />
      </v-list>
    </v-card>
  </v-container>
</template>
