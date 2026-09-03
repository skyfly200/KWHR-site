import { defineStore } from 'pinia'
import { station } from '../data/site'

// A single, app-wide audio element. Because this store lives at the app root
// (mounted in App.vue, outside <router-view>), the stream keeps playing while
// the visitor browses every other page — no second tab, no interruption.
let audio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio()
    audio.preload = 'none'
  }
  return audio
}

interface State {
  isPlaying: boolean
  isLoading: boolean
  volume: number
  muted: boolean
  error: string | null
  bound: boolean
}

export const usePlayerStore = defineStore('player', {
  state: (): State => ({
    isPlaying: false,
    isLoading: false,
    volume: 0.8,
    muted: false,
    error: null,
    bound: false,
  }),

  actions: {
    // Wire up media-element events once, on first use.
    bind() {
      if (this.bound) return
      const a = getAudio()
      a.volume = this.volume
      a.addEventListener('playing', () => {
        this.isLoading = false
        this.isPlaying = true
        this.error = null
      })
      a.addEventListener('waiting', () => (this.isLoading = true))
      a.addEventListener('pause', () => (this.isPlaying = false))
      a.addEventListener('error', () => {
        this.isLoading = false
        this.isPlaying = false
        this.error = 'Stream unavailable right now — please try again shortly.'
      })
      this.bound = true
    },

    play() {
      this.bind()
      const a = getAudio()
      // Reassign the source so a live stream always resumes at the live edge.
      if (!a.src) a.src = station.streamUrl
      this.isLoading = true
      this.error = null
      a.play().catch(() => {
        this.isLoading = false
        this.error = 'Press play once more to start the stream.'
      })
    },

    pause() {
      const a = getAudio()
      a.pause()
      // Drop the buffer so we don't fall behind the live broadcast.
      a.removeAttribute('src')
      a.load()
      this.isPlaying = false
      this.isLoading = false
    },

    toggle() {
      if (this.isPlaying || this.isLoading) this.pause()
      else this.play()
    },

    setVolume(v: number) {
      this.volume = v
      this.muted = v === 0
      getAudio().volume = v
    },

    toggleMute() {
      const a = getAudio()
      this.muted = !this.muted
      a.muted = this.muted
    },
  },
})
