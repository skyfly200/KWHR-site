import { defineStore } from 'pinia'

// Small coordination store for site-wide UI flourishes.
export const useUiStore = defineStore('ui', {
  state: () => ({
    eclipse: false,
  }),
  actions: {
    // Fired by holding the theme toggle for 3s — plays the solar-eclipse
    // animation, then clears itself.
    triggerEclipse() {
      if (this.eclipse) return
      this.eclipse = true
      setTimeout(() => {
        this.eclipse = false
      }, 6000)
    },
  },
})
