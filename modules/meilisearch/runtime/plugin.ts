import InstantSearch from 'vue-instantsearch/vue3/es'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export default defineNuxtPlugin((nuxtApp) => {
  const { host, searchApiKey } = useRuntimeConfig().meilisearch

  const meilisearchClient = instantMeiliSearch(
    host,
    searchApiKey
  )

  nuxtApp.provide('meilisearch', meilisearchClient)

  nuxtApp.vueApp.use(InstantSearch)
})
