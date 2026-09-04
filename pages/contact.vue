<script setup lang="ts">
useHead({ title: 'Contact — Way High Radio' })
import { ref } from 'vue'
import { station } from '~/data/site'
import PageHeader from '~/components/PageHeader.vue'

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

function submit() {
  // PLACEHOLDER — wire to a real backend / form service (Formspree, Netlify, etc.).
  // For now we open the visitor's mail client with the composed message.
  const body = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`)
  window.location.href = `${station.social.email}?subject=Website%20message&body=${body}`
  sent.value = true
}
</script>

<template>
  <PageHeader
    title="Contact Us"
    icon="mdi-email-outline"
    subtitle="Questions, show ideas, or want to volunteer? We'd love to hear from you."
  />

  <v-container style="max-width: 1200px" class="pb-12">
    <v-row>
      <v-col cols="12" md="7">
        <v-card class="pa-6" rounded="xl">
          <v-form @submit.prevent="submit">
            <v-text-field v-model="name" label="Your name" variant="outlined" class="mb-2" required />
            <v-text-field v-model="email" label="Email" type="email" variant="outlined" class="mb-2" required />
            <v-textarea v-model="message" label="Message" variant="outlined" rows="5" class="mb-2" required />
            <v-btn type="submit" color="primary" size="large" prepend-icon="mdi-send">Send message</v-btn>
            <v-alert v-if="sent" type="success" variant="tonal" class="mt-4" density="comfortable">
              Thanks! Your email client should have opened with your message.
            </v-alert>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-6 h-100" color="surface-bright" rounded="xl">
          <div class="text-overline text-medium-emphasis mb-2">Reach the station</div>
          <v-list class="bg-transparent">
            <v-list-item :href="`tel:${station.phone}`" prepend-icon="mdi-phone" :title="station.phone" subtitle="Give us a call" />
            <v-list-item :href="station.social.email" prepend-icon="mdi-email" :title="station.email" subtitle="Email" />
            <v-list-item prepend-icon="mdi-map-marker" :title="station.location" subtitle="Studio" />
            <v-list-item
              v-if="station.social.facebook"
              :href="station.social.facebook"
              target="_blank"
              rel="noopener"
              prepend-icon="mdi-facebook"
              title="Way High Radio"
              subtitle="Facebook"
            />
          </v-list>

          <v-divider class="my-4" />
          <div class="text-overline text-medium-emphasis mb-2">Submit content</div>
          <p class="text-body-2 text-medium-emphasis mb-3">
            You can now upload content directly to the Colorado Community Radio Network.
          </p>
          <v-btn
            :href="station.network.url"
            target="_blank"
            rel="noopener"
            variant="tonal"
            color="primary"
            append-icon="mdi-open-in-new"
          >
            Submit content
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
