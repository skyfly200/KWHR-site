<script setup lang="ts">
defineProps<{ active: boolean }>()
const bars = [0, 0.18, 0.36, 0.12]
</script>

<template>
  <span class="eq" aria-hidden="true">
    <span
      v-for="(delay, i) in bars"
      :key="i"
      class="eq-bar"
      :style="{
        animationDelay: `${delay}s`,
        animationPlayState: active ? 'running' : 'paused',
        transform: active ? undefined : 'scaleY(0.3)',
      }"
    />
  </span>
</template>

<style scoped>
.eq {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;
}
.eq-bar {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: rgb(var(--v-theme-primary));
  transform-origin: bottom;
  animation: eq 0.9s ease-in-out infinite;
}
@keyframes eq {
  0%,
  100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
}
</style>
