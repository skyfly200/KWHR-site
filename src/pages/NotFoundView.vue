<template>
  <v-container style="max-width: 700px" class="py-16 text-center">
    <v-icon icon="mdi-radio-off" size="72" color="primary" class="mb-4" />
    <h1 class="text-h3 font-weight-bold mb-2">Off the dial</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      We couldn't tune in that page. Let's get you back to something good.
    </p>
    <div class="d-flex ga-3 justify-center flex-wrap">
      <v-btn color="primary" to="/" prepend-icon="mdi-home">Home</v-btn>
      <v-btn variant="outlined" to="/listen" prepend-icon="mdi-play">Listen live</v-btn>
    </div>
  </v-container>
</template>
