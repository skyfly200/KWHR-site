import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Brand palette — pine green + sunrise orange, mountain community radio.
const whrDark = {
  dark: true,
  colors: {
    background: '#0b1120',
    surface: '#111827',
    'surface-bright': '#1e293b',
    primary: '#1cb277',
    secondary: '#ff8c42',
    accent: '#41cd91',
    info: '#38bdf8',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    'on-background': '#e2e8f0',
    'on-surface': '#e2e8f0',
  },
}

const whrLight = {
  dark: false,
  colors: {
    background: '#f7faf8',
    surface: '#ffffff',
    'surface-bright': '#ffffff',
    primary: '#0f9061',
    secondary: '#f56e2a',
    accent: '#0d7350',
    info: '#0284c7',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    'on-background': '#0f172a',
    'on-surface': '#0f172a',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'whrDark',
    themes: { whrDark, whrLight },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VBtn: { rounded: 'xl', class: 'text-none font-weight-bold' },
    VCard: { rounded: 'lg' },
  },
})
