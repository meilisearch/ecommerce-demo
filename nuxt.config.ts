// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ecommerce demo - Meilisearch',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'Demo ecommerce featuring fast and relevant onsite search powered by Meilisearch.' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      fathomSiteID: process.env.FATHOM_SITE_ID
    }
  },
  build: {
    transpile: [
      'vue-instantsearch'
    ]
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
