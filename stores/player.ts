import { defineStore } from 'pinia'
import { station } from '../data/site'

// A single, app-wide audio element. Because this store lives at the app root
// (mounted in App.vue, outside <router-view>), the stream keeps playing while
// the visitor browses every other page — no second tab, no interruption.
let audio: HTMLAudioElement | null = null

// If the stream doesn't actually start producing audio within this window we
// treat it as offline (a dead Icecast mount can "connect" but never play).
const CONNECT_TIMEOUT_MS = 12000
let watchdog: ReturnType<typeof setTimeout> | null = null

const OFFLINE_MSG =
  'We’re off the air right now — the live stream is offline. Please check back soon.'
const AUTOPLAY_MSG = 'Tap play again to start listening.'

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
    clearWatchdog() {
      if (watchdog) {
        clearTimeout(watchdog)
        watchdog = null
      }
    },

    // Called when the stream can't be started (offline / errored).
    fail(message: string) {
      this.clearWatchdog()
      const a = getAudio()
      a.pause()
      a.removeAttribute('src')
      a.load()
      this.isLoading = false
      this.isPlaying = false
      this.error = message
    },

    // Wire up media-element events once, on first use.
    bind() {
      if (this.bound) return
      const a = getAudio()
      a.volume = this.volume
      // Real audio is flowing — we're truly on the air.
      a.addEventListener('playing', () => {
        this.clearWatchdog()
        this.isLoading = false
        this.isPlaying = true
        this.error = null
      })
      // Buffering mid-playback: show connecting, but don't flag an error yet.
      a.addEventListener('waiting', () => {
        if (this.isPlaying || this.isLoading) this.isLoading = true
      })
      a.addEventListener('pause', () => (this.isPlaying = false))
      // The browser could not load/decode the source: the stream is down.
      a.addEventListener('error', () => this.fail(OFFLINE_MSG))
      // Server closed the connection / mount ended.
      a.addEventListener('ended', () => this.fail(OFFLINE_MSG))
      this.bound = true
    },

    play() {
      this.bind()
      const a = getAudio()
      // Reassign the source so a live stream always resumes at the live edge.
      a.src = station.streamUrl
      a.load()
      this.isLoading = true
      this.error = null

      // Watchdog: if we never reach "playing", the mount is offline.
      this.clearWatchdog()
      watchdog = setTimeout(() => {
        if (!this.isPlaying) this.fail(OFFLINE_MSG)
      }, CONNECT_TIMEOUT_MS)

      const p = a.play()
      if (p) {
        p.catch((err: DOMException) => {
          // Autoplay policy blocked it — a normal, recoverable case.
          if (err && err.name === 'NotAllowedError') {
            this.clearWatchdog()
            this.isLoading = false
            this.error = AUTOPLAY_MSG
          } else {
            // NotSupportedError / network abort → stream is unavailable.
            this.fail(OFFLINE_MSG)
          }
        })
      }
    },

    pause() {
      this.clearWatchdog()
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
