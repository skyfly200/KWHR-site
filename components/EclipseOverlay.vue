<script setup lang="ts">
import { useUiStore } from '~/stores/ui'
const ui = useUiStore()
</script>

<template>
  <Transition name="eclipse-fade">
    <div v-if="ui.eclipse" class="eclipse" aria-hidden="true">
      <div class="sky" />
      <div class="stage">
        <!-- the sun -->
        <div class="sun" />
        <!-- corona flares, revealed at totality -->
        <div class="corona" />
        <!-- the moon slides across -->
        <div class="moon" />
      </div>
      <div class="caption">Total eclipse · KWHR</div>
    </div>
  </Transition>
</template>

<style scoped>
.eclipse {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  pointer-events: none;
  overflow: hidden;
}
/* Sky darkens toward totality, then lifts. */
.sky {
  position: absolute;
  inset: 0;
  background: #05070c;
  animation: sky-dim 6s ease-in-out forwards;
}
@keyframes sky-dim {
  0% { opacity: 0; }
  35% { opacity: 0.9; }
  62% { opacity: 0.96; }
  85% { opacity: 0.9; }
  100% { opacity: 0; }
}
.stage {
  position: relative;
  width: 260px;
  height: 260px;
}
.sun {
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 45%, #fff6e0 0%, #ffd479 35%, #ff9d3c 62%, rgba(255, 140, 60, 0) 74%);
  box-shadow: 0 0 90px 24px rgba(255, 170, 80, 0.55);
}
/* Corona: faint ring that shows while the moon covers the disc. */
.corona {
  position: absolute;
  inset: 26px;
  border-radius: 50%;
  box-shadow: 0 0 60px 14px rgba(255, 240, 210, 0.85), 0 0 120px 40px rgba(180, 210, 255, 0.35);
  opacity: 0;
  animation: corona 6s ease-in-out forwards;
}
@keyframes corona {
  0%, 40% { opacity: 0; }
  46%, 56% { opacity: 1; }
  66%, 100% { opacity: 0; }
}
/* Moon rises along the ecliptic (an arc) onto the stationary sun, covers it at
   totality, then continues down the far side. */
.moon {
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  background: #0a0d13;
  box-shadow: inset 8px -6px 14px rgba(255, 255, 255, 0.05);
  transform: translate(-155%, 115%);
  animation: moon-arc 6s ease-in-out forwards;
}
@keyframes moon-arc {
  0% { transform: translate(-155%, 115%); }
  22% { transform: translate(-78%, 30%); }
  46% { transform: translate(0%, 0%); }
  56% { transform: translate(0%, 0%); }
  78% { transform: translate(80%, 30%); }
  100% { transform: translate(155%, 115%); }
}
.caption {
  position: absolute;
  bottom: 16%;
  font: 700 12px/1 'Space Mono', 'Inter', monospace;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #cfe0ff;
  opacity: 0;
  animation: cap 6s ease-in-out forwards;
}
@keyframes cap {
  0%, 38% { opacity: 0; }
  50%, 60% { opacity: 0.85; }
  76%, 100% { opacity: 0; }
}

.eclipse-fade-enter-active,
.eclipse-fade-leave-active { transition: opacity 0.4s ease; }
.eclipse-fade-enter-from,
.eclipse-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .sky { animation: sky-dim-quiet 4s ease-in-out forwards; }
  .moon, .corona, .caption { animation-duration: 4s; }
}
@keyframes sky-dim-quiet {
  0% { opacity: 0; } 50% { opacity: 0.9; } 100% { opacity: 0; }
}
</style>
