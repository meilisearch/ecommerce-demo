// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      fathomSiteID: process.env.FATHOM_SITE_ID
    }
  },
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms'
    ]
  },
  css: [
    '~/assets/css/typography.css',
    '~/assets/css/spacing.css',
    '~/assets/css/shadow.css'
  ],
  modules: [
    // Handle interface imports for defineProps
    // Docs: https://github.com/wheatjs/vite-plugin-vue-type-imports
    'vite-plugin-vue-type-imports/nuxt',
    // Optimized images with progressive loading
    '@twicpics/components/nuxt3'
  ],
  twicpics: {
    domain: process.env.TWICPICS_DOMAIN
  }
})
