// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['primevue']
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    '~/assets/css/typography.css',
    '~/assets/css/spacing.css',
    '~/assets/css/shadow.css'
  ],
  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms'
    ]
  },
  modules: [
    // Handle interface imports for defineProps
    // Docs: https://github.com/wheatjs/vite-plugin-vue-type-imports
    'vite-plugin-vue-type-imports/nuxt',
    // Optimized images with progressive loading
    '@twicpics/components/nuxt3',
    // Meilisearch
    ['./modules/meilisearch', {
      host: process.env.MEILISEARCH_HOST,
      searchApiKey: process.env.MEILISEARCH_SEARCH_API_KEY,
      options: {
        primaryKey: 'id',
        keepZeroFacets: true,
        finitePagination: true
      }
    }]
  ],
  twicpics: {
    domain: process.env.TWICPICS_DOMAIN
  }
})
