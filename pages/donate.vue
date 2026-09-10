<script setup lang="ts">
import { station } from '~/data/site'
import PageHeader from '~/components/PageHeader.vue'

useHead({ title: 'Donate — Way High Radio' })

const ways = [
  {
    icon: 'mdi-hand-heart',
    title: 'Give online',
    body: 'Make a one-time or recurring donation. Every dollar keeps a volunteer, commercial-free station on the air.',
  },
  {
    icon: 'mdi-party-popper',
    title: 'Come to a benefit',
    body: 'Our "funraisers" — Blossom, Hallowhen?, the Mid-Winter Meltdown — are how we’ve stayed on the air for decades. Great music, food and drinks for a good cause.',
  },
  {
    icon: 'mdi-microphone',
    title: 'Volunteer',
    body: 'Time is support too. Become a DJ, help with events, or lend a technical hand — reach out from the Contact page.',
  },
  {
    icon: 'mdi-store',
    title: 'Sponsor as a business',
    body: 'Local businesses help power the station and the Peak-to-Peak community. Get in touch to talk about supporting us.',
  },
]
</script>

<template>
  <PageHeader
    title="Support Way High Radio"
    icon="mdi-heart"
    subtitle="We’re listener-supported and commercial-free. Nobody gets paid — and all revenue after expenses goes back into Town of Ward projects."
  />

  <v-container style="max-width: 1000px" class="pb-12">
    <!-- Primary CTA -->
    <v-card color="primary" variant="flat" class="pa-8 pa-md-10 text-center blob-bg mb-8" rounded="xl">
      <v-icon icon="mdi-radio-tower" size="44" class="mb-3" />
      <h2 class="text-h4 font-weight-bold mb-2">Keep community radio on the air</h2>
      <p class="text-body-1 mb-6 mx-auto" style="max-width: 52ch">
        Since 1997, Way High Radio has run entirely on volunteer, grassroots support and the
        generosity of neighbors. Your gift pays for transmitters, gear, and the roof over
        the studio — so local voices keep reaching the mountains.
      </p>
      <v-btn
        size="x-large"
        color="white"
        variant="flat"
        :href="station.donateUrl"
        target="_blank"
        rel="noopener"
        prepend-icon="mdi-hand-heart"
      >
        Donate online
      </v-btn>
      <!-- CONFIRM: point station.donateUrl in src data at the real donation link. -->
    </v-card>

    <h2 class="text-h5 font-weight-bold section-title mb-6">Ways to give</h2>
    <v-row>
      <v-col v-for="w in ways" :key="w.title" cols="12" sm="6">
        <v-card class="pa-6 h-100 lift" rounded="xl">
          <v-avatar color="secondary" variant="tonal" size="48" class="mb-3">
            <v-icon :icon="w.icon" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-1">{{ w.title }}</div>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ w.body }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mail a check -->
    <v-card class="pa-6 mt-6 d-flex flex-column flex-sm-row align-sm-center ga-4" color="surface-bright" rounded="xl">
      <v-icon icon="mdi-email-outline" color="primary" size="40" />
      <div class="flex-grow-1">
        <div class="text-body-1 font-weight-bold">Prefer to mail a check or ask a question?</div>
        <div class="text-body-2 text-medium-emphasis">
          Email us at {{ station.email }} or call {{ station.phone }} and we’ll get you sorted.
        </div>
      </div>
      <v-btn :href="station.social.email" variant="tonal" color="primary" prepend-icon="mdi-email">
        Email the station
      </v-btn>
    </v-card>

    <p class="text-caption text-medium-emphasis mt-4">
      Way High Radio is a volunteer, community-run project. Contributions support station
      operations and Town of Ward community projects.
    </p>
  </v-container>
</template>
