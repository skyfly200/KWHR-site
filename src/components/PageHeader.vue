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
  background:
    radial-gradient(800px 300px at 85% -20%, rgba(28, 178, 119, 0.3), transparent 60%),
    linear-gradient(160deg, #0d2a20 0%, #0a1524 60%, #060c16 100%);
}
/* Low-res header photo used only as blurred texture (no pixelation). */
.ph__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-size: cover;
  background-position: center;
  filter: blur(14px) saturate(1.1);
  opacity: 0.3;
  transform: scale(1.1);
}
.ph__scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    100deg,
    rgba(6, 12, 22, 0.8),
    rgba(6, 12, 22, 0.45)
  );
}
.ph__content {
  width: 100%;
}
</style>
