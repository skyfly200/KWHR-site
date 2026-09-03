<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; icon?: string; image?: string }>()
</script>

<template>
  <!-- Image variant: photo band with gradient scrim -->
  <section v-if="image" class="ph">
    <div class="ph__bg" :style="{ backgroundImage: `url(${image})` }" />
    <div class="ph__scrim" />
    <v-container style="max-width: 1200px" class="ph__content py-12">
      <div class="d-flex align-center ga-3 mb-2">
        <v-avatar v-if="icon" color="primary" size="44">
          <v-icon :icon="icon" color="white" />
        </v-avatar>
        <h1 class="text-h4 text-md-h3 font-weight-bold" style="color: #fff">{{ title }}</h1>
      </div>
      <p v-if="subtitle" class="text-body-1" style="max-width: 60ch; color: #e2e8f0">
        {{ subtitle }}
      </p>
    </v-container>
  </section>

  <!-- Plain variant with accent underline -->
  <v-container v-else style="max-width: 1200px" class="pt-10 pb-4">
    <div class="d-flex align-center ga-3 mb-2">
      <v-avatar v-if="icon" color="primary" size="44" variant="tonal">
        <v-icon :icon="icon" />
      </v-avatar>
      <h1 class="text-h4 text-md-h3 font-weight-bold section-title">{{ title }}</h1>
    </div>
    <p v-if="subtitle" class="text-body-1 text-medium-emphasis mt-3" style="max-width: 60ch">
      {{ subtitle }}
    </p>
  </v-container>
</template>

<style scoped>
.ph {
  position: relative;
  isolation: isolate;
}
.ph__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-size: cover;
  background-position: center;
}
.ph__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    100deg,
    rgba(6, 12, 22, 0.9),
    rgba(6, 12, 22, 0.6)
  );
}
.ph__content {
  width: 100%;
}
</style>
