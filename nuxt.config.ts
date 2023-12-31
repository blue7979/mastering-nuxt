const vsharp = require('vite-plugin-vsharp');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    public: {
      stripeKey: '',
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-security',
  ],
  supabase: {
    redirect: false,
  },
  nitro: {
    prerender: {
      // 이것만 html형태로 배포한다.
      routes: ['/landing'],
    },
  },
  vite: {
    plugins: [vsharp()],
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: false,
    },
  },
});
