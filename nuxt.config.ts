// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  modules: ['vuetify-nuxt-module', '@nuxt/content', '@pinia/nuxt'],

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/app.css'],

  // Fully static site generation.
  ssr: true,
  nitro: {
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
          whrDark: {
            dark: true,
            colors: {
              background: '#06131f',
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
          },
          whrLight: {
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
          },
        },
      },
      defaults: {
        VBtn: { rounded: 'xl', class: 'text-none font-weight-bold' },
        VCard: { rounded: 'lg' },
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
        { name: 'theme-color', content: '#0f5b41' },
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
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
