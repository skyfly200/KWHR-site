<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

useHead({ title: 'Off the dial — Way High Radio' })
</script>

<template>
  <v-app>
    <v-main>
      <v-container style="max-width: 700px" class="py-16 text-center">
        <v-icon icon="mdi-radio-off" size="72" color="primary" class="mb-4" />
        <h1 class="text-h3 font-weight-bold mb-2">Off the dial</h1>
        <p class="text-body-1 text-medium-emphasis mb-6">
          {{ error?.statusCode === 404
            ? "We couldn't tune in that page. Let's get you back to something good."
            : 'Something went sideways. Try again in a moment.' }}
        </p>
        <div class="d-flex ga-3 justify-center flex-wrap">
          <v-btn color="primary" to="/" prepend-icon="mdi-home" @click="clearError({ redirect: '/' })">
            Home
          </v-btn>
          <v-btn variant="outlined" to="/listen" prepend-icon="mdi-play" @click="clearError({ redirect: '/listen' })">
            Listen live
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
