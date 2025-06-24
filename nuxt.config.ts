// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  nitro: {
    preset: 'vercel'
  },

  app: {
    head: {
      title: 'Ecommerce demo - Meilisearch',
      meta: [
        { name: 'description', content: 'Ecommerce demo featuring fast and relevant onsite search powered by Meilisearch.' },
        { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION_ID }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      ],
      script: [
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TNSCGVBH');`
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      fathomSiteID: process.env.FATHOM_SITE_ID,
      meilisearch: {
        host: process.env.NUXT_PUBLIC_MEILISEARCH_HOST,
        searchApiKey: process.env.NUXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
        indexName: process.env.NUXT_PUBLIC_MEILISEARCH_INDEX_NAME,
        options: {
          primaryKey: 'id',
          keepZeroFacets: false,
          finitePagination: false
        }
      },
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
    'vue-final-modal/style.css',
    '~/assets/css/typography.css',
    '~/assets/css/shadow.css',
  ],

  modules: [
    // Handle interface imports for defineProps
    // Docs: https://github.com/wheatjs/vite-plugin-vue-type-imports
    'vite-plugin-vue-type-imports/nuxt',
    // Optimized images with progressive loading
    '@twicpics/components/nuxt3',
    '@nuxtjs/tailwindcss',
  ],

  twicpics: {
    domain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN
  },

  compatibilityDate: '2025-02-17'
})
