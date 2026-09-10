// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  modules: ['vuetify-nuxt-module', '@nuxt/content', '@pinia/nuxt'],

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/app.css'],

  // Fully static site generation. Force the static preset so Netlify's build
  // image can't switch us to its SSR ('netlify') preset — that was dropping the
  // /_nuxt assets from the deploy (broken icons + blank client navigation).
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  content: {
    documentDriven: false,
    highlight: {
      theme: 'github-dark',
    },
  },

  vuetify: {
    moduleOptions: {
      /* treeshaking, ssr client hints handled by the module */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'whrDark',
        themes: {
          // "Summit" palette — cool slate ground, emerald + sky, warm sunset pop.
          whrDark: {
            dark: true,
            colors: {
              background: '#0b131b',
              surface: '#101d29',
              'surface-bright': '#17293a',
              primary: '#22c58a',
              secondary: '#38bdf8',
              accent: '#38bdf8',
              info: '#38bdf8',
              success: '#22c58a',
              warning: '#ff8c42',
              error: '#ef4444',
              'on-background': '#e6edf3',
              'on-surface': '#e6edf3',
            },
          },
          whrLight: {
            dark: false,
            colors: {
              background: '#f2f6fb',
              surface: '#ffffff',
              'surface-bright': '#ffffff',
              primary: '#0e9f6e',
              secondary: '#0284c7',
              accent: '#0284c7',
              info: '#0284c7',
              success: '#0e9f6e',
              warning: '#e26a1b',
              error: '#dc2626',
              'on-background': '#0b1a24',
              'on-surface': '#0b1a24',
            },
          },
        },
      },
      defaults: {
        // Full-Blast styling: bolder, squarer components (poster energy).
        VBtn: { rounded: 'md', class: 'text-none font-weight-bold' },
        VCard: { rounded: 'md' },
      },
    },
  },

  app: {
    head: {
      title: 'Way High Radio — KWHR 90.5 FM',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            'Way High Radio — KWHR 90.5 FM, Ward, Colorado. Volunteer-powered, commercial-free community radio from the mountains of Colorado. Listen live.',
        },
        { name: 'theme-color', content: '#0b131b' },
        { property: 'og:title', content: 'Way High Radio — KWHR' },
        {
          property: 'og:description',
          content:
            'Volunteer-powered, commercial-free community radio. 90.5 FM, Ward, Colorado.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
